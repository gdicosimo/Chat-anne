from langchain_community.vectorstores.chroma import Chroma
from db.chromadb.chromadb import connect_db, add_to_collection, list_all_collections


from langchain.chains import create_history_aware_retriever
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

from langChain.model.google_generativeai import GoogleGenerativeAI
from langChain.data_processing.processing import processing

from langChain.prompts.prompt import qa_prompt, contextualize_q_prompt
from langChain.memory.memory import ChatHistory
from langchain_core.runnables.history import RunnableWithMessageHistory


class LangChain:

    @staticmethod
    def get_chroma_client(collection_name: str) -> Chroma:
        embedding_function = GoogleGenerativeAI.get_embedding_function()
        return Chroma(
            client=connect_db(),
            collection_name=collection_name,
            embedding_function=embedding_function
        )

    @staticmethod
    def create_or_add(pdf_file: object, collection_name: str):
        try:
            docs = processing(pdf_file)
            add_to_collection(collection_name, docs)
        except Exception as e:
            raise e

    @staticmethod
    def delete_if_exists(collection_name: str):
        try:
            client = connect_db()
            client.delete_collection(collection_name)
        except Exception as e:
            raise e

    # This function is only for testing
    @staticmethod
    def list_collections():
        try:
            client = connect_db()
            return [collection.name for collection in client.list_collections()]
        except Exception as e:
            raise e

    @staticmethod
    def response(query: str, collection_name: str) -> str:
        try:
            vectorstore = LangChain.get_chroma_client(collection_name)

            retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

            llm = GoogleGenerativeAI.get_llm()

            history_aware_retriever = create_history_aware_retriever(
                llm, retriever, contextualize_q_prompt
            )

            combine_docs_chain = create_stuff_documents_chain(
                llm, qa_prompt)

            rag_chain = create_retrieval_chain(
                history_aware_retriever, combine_docs_chain)

            query = {"input": query}

            conversational_rag_chain = RunnableWithMessageHistory(
                rag_chain,
                ChatHistory.get_session_history,
                input_messages_key="input",
                history_messages_key="chat_history",
                output_messages_key="answer",
            )

            response = conversational_rag_chain.invoke(query, config={  # Invalid argument provided to Gemini: 400 Developer instruction is not enabled for models/gemini-pro
                "configurable": {"session_id": collection_name}
            })

            return response["answer"]
        except Exception as e:
            raise e
