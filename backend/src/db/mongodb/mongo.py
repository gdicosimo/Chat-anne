from pymongo import MongoClient, ReturnDocument
from src.db.mongodb.schema import SCHEMA

# Constants
DB_NAME = 'chatanne'
DB_HOST = 'mongodb'
DB_URL = f'mongodb://{DB_HOST}:27017/{DB_NAME}?authSource=admin'

# Connect to MongoDB
def connect_db():
    try:
        client = MongoClient(DB_URL)
        return client[DB_NAME]
    except Exception as e:
        raise e

# Connect to MongoDB model
def connect_model(db, model):
    return db[model]

# Search documents in collection
def search_db(model, query={},showColumns={}):
    try:
        db = connect_db()
        collection = connect_model(db, model)
        cursor = collection.find(query,showColumns)
        
        # Convert cursor to list of dictionaries
        result = []
        for doc in cursor:
            # Convert ObjectId to string
            doc['_id'] = str(doc['_id'])
            result.append(doc)
            
        return result
    except Exception as e:
        raise e


def delete_one_db(model, query={}):
    try:
        db = connect_db()
        collection = connect_model(db, model)
        result = collection.delete_one(query)
        return result
    except Exception as e:
        raise e


def update_one_db(model,filter={},query={}):
    try:
        db = connect_db()
        collection = connect_model(db, model)
        result = collection.update_one(filter,query)
        return result
    except Exception as e:
        raise e



# Insert document into collection
def insert_db(model, data={}):
    try:
        db = connect_db()
        collection = connect_model(db, model)
        validate_data(data, model)
        result = collection.insert_one(data)
        return result.inserted_id
    except Exception as e:
        raise e

# Validate data against schema
def validate_data(data, model):
    try:
        schema = SCHEMA[model]
        for field, value in data.items():
            if field not in schema:
                raise ValueError(f"Field '{field}' not in schema for model '{model}'")
            if not isinstance(value, schema[field]):
                raise TypeError(f"Invalid type for field '{field}' in model '{model}'. Expected '{schema[field]}', got '{type(value)}'")
    except KeyError:
        raise ValueError(f"Model '{model}' not found in schema")
