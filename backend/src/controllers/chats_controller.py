from datetime import datetime

from bson import ObjectId
from db.mongodb.mongo import search_db, insert_db

from db.mongodb.mongo import update_one_db

MODEL_USER = 'users'
MODEL_CHAT = 'chats'


def create_simple_chat(username,name):
    id_chat = insert_db(MODEL_CHAT, {
        'owner': username,
        'created_at': datetime.now(),
        'name': name
    })
    return {"id_chat ": str(id_chat)}


def save_message(id_chat, message, username):
    try:
        chat = search_db(MODEL_CHAT, {
            '_id': ObjectId(id_chat),
            'owner': username
        })
        if len(chat) == 0:
            return {'message': 'no se encontro un chat con el id y el usuario logeado'}

        new_message = {
            'from': username,
            'message': message,
            'created_at': datetime.now()
        }

        chat = update_one_db(MODEL_CHAT, {'_id': ObjectId(id_chat)},
                             {'$push': {'messages': new_message}})

        return {"chat": str(chat)}, 200
    except Exception as e:
        return {"err": str(e)}, 400


#Devuelve solo los id y nombres de los chats
def getChats(username):
    try:
        list = search_db(MODEL_CHAT, {'owner': username},{'_id': 1, 'name': 1})
        return {'chats': list}, 200

    except Exception as e:
        return {'err': str(e)}, 400
