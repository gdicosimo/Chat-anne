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
from rag.prompts.prompt import prompt, prompt_decomposition, decomposition_prompt, prompt_rag_fusion

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

            question = {"input": query, "chat_history": memory}
            response_decomposition = Langchain.__decomposition_query(
                question, llm, retriever)

            return response_decomposition
        except Exception as e:
            raise e

    @staticmethod
    def __format_qa_pair(question, answer):
        return f"Question: {question}\nAnswer: {answer}".strip()

    @staticmethod
    def __decomposition_query(question, llm, retriever):
        # Tarda bastante en contestar
        try:
            generate_queries_decomposition = (
                prompt_decomposition
                | llm
                | StrOutputParser()
                | (lambda x: x.split("\n"))
            )

            questions = generate_queries_decomposition.invoke(
                {"question": question})
            q_a_pairs = ""

            questions = [
                line.strip() for line in questions if MATCH_QUESTIONS.match(line)]

            for q in questions:

                rag_chain = (
                    {"context": itemgetter("question") | retriever,
                     "question": itemgetter("question"),
                     "q_a_pairs": itemgetter("q_a_pairs")}
                    | decomposition_prompt
                    | llm
                    | StrOutputParser()
                )

                answer = rag_chain.invoke(
                    {"question": q, "q_a_pairs": q_a_pairs})
                q_a_pair = Langchain.__format_qa_pair(q, answer)
                q_a_pairs += f"\n---\n{q_a_pair}"

            return answer

        except Exception as e:
            raise RuntimeError(f"Error in decomposition query: {e}")

    # This function is only for testing

    @ staticmethod
    def list_chats():
        try:
            return list()
        except Exception as e:
            raise e
