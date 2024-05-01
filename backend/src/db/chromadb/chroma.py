import chromadb

# Constants
DB_HOST = 'chromadb'  

# Connect to chromadb
def connect_db():
    try:
        client = chromadb.HttpClient(host=DB_HOST, port=8000)
        print('Conexión exitosa a chromadb')
        return client
    except Exception as e:
        raise e

def list_all_collections():
    try:
        client = connect_db()
        return client.list_collections()
    except Exception as e:
        raise e

def make_collection(collection_name):
    try:
        client = connect_db()
        collection = client.get_or_create_collection(collection_name)
        return collection
    except Exception as e:
        raise e



def insert_db(collection_name, data={}):
    try:
        collection = make_collection(collection_name)
        collection.add(
            documents=["This is document1", "This is document2"],
            metadatas=[{"source": "notion"}, {"source": "google-docs"}],
            ids=["doc1", "doc2"], 
        )
        return "Success"
    except Exception as e:
        raise e


def search_db(id_collection, query={}):
    try:
        client = connect_db()
        collection = client.get_collection(collection_name)
        return collection.get()
    except Exception as e:
        raise e

