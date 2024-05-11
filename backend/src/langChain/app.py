from langchain_community.vectorstores import Chroma
from db.chromadb.chromadb import connect_db, add_to_collection, list_all_collections

from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

from langChain.model.google_generativeai import GoogleGenerativeAI
from langChain.data_processing.processing import processing
from langChain.prompts.prompt import prompt


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

    @staticmethod
    def response(query: str, collection_name: str) -> str:
        try:

            vectorstore = LangChain.get_chroma_client(collection_name)
            retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

            llm = GoogleGenerativeAI.get_llm()

            combine_docs_chain = create_stuff_documents_chain(llm, prompt)
            retrieval_chain = create_retrieval_chain(
                retriever, combine_docs_chain)

            query = {"input": query}

            response = retrieval_chain.invoke(query)

            return response["answer"]
        except Exception as e:
            raise e
