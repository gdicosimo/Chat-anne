import chromadb
import uuid

from langChain.model.google_generativeai import GoogleGenerativeAI

# Constants
DB_HOST = 'chromadb'


def connect_db():
    try:
        client = chromadb.HttpClient(host=DB_HOST, port=8000)
        return client
    except Exception as e:
        raise e


def get_or_create_collection(collection_name):
    try:
        client = connect_db()
        google_ef = GoogleGenerativeAI().get_chroma_embedding_function()
        collection = client.get_or_create_collection(
            name=collection_name, embedding_function=google_ef)
        return collection
    except Exception as e:
        raise e


def add_to_collection(collection_name, docs):
    try:
        collection = get_or_create_collection(collection_name)
        for doc in docs:
            collection.add(
                ids=[str(uuid.uuid1())], metadatas=doc.metadata, documents=doc.page_content
            )
    except Exception as e:
        raise e


def list_all_collections():
    try:
        client = connect_db()
        return client.list_collections()
    except Exception as e:
        raise e