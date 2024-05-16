import chromadb
from chromadb.config import Settings


# Constants
DB_HOST = 'chromadb'
PORT = 8000
CLIENT = None


def connect_db():
    try:
        global CLIENT
        if CLIENT is None:
            CLIENT = chromadb.HttpClient(
                host=DB_HOST, port=PORT, settings=Settings(allow_reset=True))
        CLIENT.heartbeat()
        return CLIENT
    except Exception as e:
        raise e


def create(collection_name):
    try:
        client = connect_db()
        client.create_collection(name=collection_name)
    except Exception as e:
        raise e


def rename(collection_name, new_collection_name):
    try:
        collection = get_collection(collection_name)
        collection.modify(name=new_collection_name)
    except Exception as e:
        raise e


def delete(collection_name):
    try:
        client = connect_db()
        client.delete_collection(name=collection_name)
    except Exception as e:
        raise e


def get_collection(collection_name):
    try:
        client = connect_db()
        return client.get_collection(name=collection_name)
    except Exception as e:
        raise e


def exists(collection_name):
    try:
        return collection_name in list()
    except Exception as e:
        raise e


def exists_pdf_in(collection_name, pdf):
    try:
        collection = get_collection(collection_name)
        documents = collection.get(where={"pdf": pdf})
        return len(documents['documents']) > 0
    except Exception as e:
        raise e


def pop_pdf_in(collection_name, pdf):
    try:
        collection = get_collection(collection_name)
        collection.delete(where={"pdf": pdf})
    except Exception as e:
        raise e


def is_empty(collection_name):
    try:
        collection = get_collection(collection_name)
        return collection.count() == 0
    except Exception as e:
        raise e


def list():
    try:
        client = connect_db()
        return [collection.name for collection in client.list_collections()]
    except Exception as e:
        raise e
