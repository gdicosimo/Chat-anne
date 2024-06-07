import uuid
import re
from operator import itemgetter

from langchain_community.vectorstores import Chroma
from db.chromadb.chromadb import connect_db, create, rename, delete, exists, exists_pdf_in, pop_pdf_in, is_empty, list

from langchain.docstore.document import Document
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain.memory import ConversationBufferMemory
from langchain_core.output_parsers import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough

from rag.model.google_generativeai import GoogleGenerativeAI
from rag.model.open_ai import OpenAI

from rag.data_processing.processing import processing
from rag.prompts.prompt import prompt_simple, prompt_decomposition, decomposition_prompt, prompt_rag_fusion

MATCH_QUESTIONS = re.compile(r'^\s*(1\.|2\.|3\.)')


class Langchain:

    @staticmethod
    def __get_chroma_client(collection_name: str) -> Chroma:
        embedding_function = GoogleGenerativeAI.get_embedding_function()
        return Chroma(
            client=connect_db(),
            collection_name=collection_name,
            embedding_function=embedding_function
        )

    @staticmethod
    def create_chat(chat: str):
        try:
            create(chat)
        except Exception as e:
            raise e

    @staticmethod
    def delete_chat_if_exists(chat: str):
        try:
            delete(chat)
        except Exception as e:
            raise e

    @staticmethod
    def append_pdf_if_exists(chat: str, pdf: object, pdf_name: str):
        try:
            chat_client = Langchain.__get_chroma_client(chat)

            docs = processing(pdf)

            if exists_pdf_in(chat, pdf_name):
                raise ValueError(
                    f"Ya se agrego '{pdf_name}' al chat '{chat}'."
                )

            new_docs = []
            ids_docs = []
            for doc in docs:
                new_doc = Document(
                    page_content=doc.page_content,
                    metadata={
                        'page': doc.metadata.get('page'),
                        'pdf': pdf_name
                    }
                )
                new_docs.append(new_doc)
                ids_docs.append(str(uuid.uuid1()))

            chat_client.add_documents(
                documents=new_docs,
                ids=ids_docs
            )

        except Exception as e:
            raise e

    @ staticmethod
    def pop_pdf_if_exists(chat: str, pdf: str):
        try:
            pop_pdf_in(chat, pdf)
        except Exception as e:
            raise e

    @staticmethod
    def response(query: str, chat: str, history_chat) -> str:
        try:

            if is_empty(chat):
                raise ValueError(
                    f"El chat '{chat}' no contiene pdfs."
                )

            vectorstore = Langchain.__get_chroma_client(chat)

            retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

            memory = ConversationBufferMemory(
                memory_key="chat_history", return_messages=True)

            if history_chat and 'messages' in history_chat[0]:
                for entry in history_chat[0]['messages']:
                    query = entry.get('query', '')
                    answer = entry.get('answer', '')
                    if query and answer:
                        memory.save_context(
                            {"input": query}, {"output": answer})

            llm = GoogleGenerativeAI.get_llm()

            question = {"question": query, "chat_history": memory}

            return Langchain.__simple_query(question, llm, retriever)

            # return Langchain.__decomposition_query(question, llm, retriever)

           # return Langchain.__rag_fusion(question, llm, retriever)

        except Exception as e:
            raise e

    @staticmethod
    def __generate_queries_chain(prompt, llm):
        def filter_and_strip_questions(output):
            questions = output.split("\n")
            return [line.strip() for line in questions if MATCH_QUESTIONS.match(line)]

        return (
            prompt
            | llm
            | StrOutputParser()
            | filter_and_strip_questions
        )

    @staticmethod
    def __generate_queries(question, llm, prompt):
        generate_queries_decomposition = Langchain.__generate_queries_chain(
            prompt, llm)

        questions = generate_queries_decomposition.invoke(
            {"question": question})
        return questions

    @staticmethod
    def __format_qa_pair(question, answer):
        return f"Question: {question}\nAnswer: {answer}".strip()

    @staticmethod
    def __decomposition_query(question, llm, retriever):
        # Tarda bastante en contestar

        try:

            questions = Langchain.__generate_queries(
                question, llm, prompt_decomposition)
            q_a_pairs = ""

            for q in questions:

                rag_chain = (
                    {"context": itemgetter("question") | retriever,
                     "question": itemgetter("question"),
                     "q_a_pairs": itemgetter("q_a_pairs"),
                     "chat_history": itemgetter("chat_history")
                     }
                    | decomposition_prompt
                    | llm
                    | StrOutputParser()
                )

                answer = rag_chain.invoke(
                    {"question": q, "q_a_pairs": q_a_pairs, "chat_history": question})
                q_a_pair = Langchain.__format_qa_pair(q, answer)
                q_a_pairs += f"\n---\n{q_a_pair}"

            return answer

        except Exception as e:
            raise RuntimeError(f"Error in decomposition query: {e}")

    @staticmethod
    def __rag_fusion(question, llm, retriever):
        def reciprocal_rank_fusion(results, k=10):
            from langchain.load import dumps, loads

            fused_scores = {}

            for docs in results:
                for rank, doc in enumerate(docs):
                    doc_str = dumps(doc)
                    if doc_str not in fused_scores:
                        fused_scores[doc_str] = 0
                    previous_score = fused_scores[doc_str]
                    fused_scores[doc_str] += 1 / (rank + k)

            reranked_results = [
                (loads(doc), score)
                for doc, score in sorted(fused_scores.items(), key=lambda x: x[1], reverse=True)
            ]

            return reranked_results

        retrieval_chain_rag_fusion = Langchain.__generate_queries_chain(
            prompt_rag_fusion, llm) | retriever.map() | reciprocal_rank_fusion

        final_rag_chain = ({
            "context": retrieval_chain_rag_fusion,
            "question": itemgetter("question"), "chat_history": itemgetter("chat_history")
        }
            | prompt_simple
            | llm
            | StrOutputParser()
        )

        answer = final_rag_chain.invoke(question)

        return answer

    @staticmethod
    def __simple_query(question, llm, retriever):
        rag_chain = ({
            "context": itemgetter("question") | retriever,
            "question": itemgetter("question"),
            "chat_history": itemgetter("chat_history")
        }
            | prompt_simple
            | llm
            | StrOutputParser()
        )

        answer = rag_chain.invoke(question)

        return answer

    @ staticmethod
    def list_chats():
        try:
            return list()
        except Exception as e:
            raise e
