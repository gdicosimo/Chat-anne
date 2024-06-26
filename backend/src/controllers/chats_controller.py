import os
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime

from bson import ObjectId
from flask import jsonify, current_app
from flask_jwt_extended import get_jwt_identity

from db.mongodb.mongo import search_db, insert_db, update_one_db, delete_one_db

from rag.app import Langchain


MODEL_USER = 'users'
MODEL_CHAT = 'chats'

REMOVE_INVALID_CHARACTERS = re.compile(r'[^a-zA-Z0-9\-_\.]')
REMOVE_START_END_NON_ALPHANUM = re.compile(r'^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$')
REMOVE_CONSECUTIVE_PERIODS = re.compile(r'\.{2,}')


def __save_pdf_to_temp(pdf_file):
    if not pdf_file.filename.endswith('.pdf'):
        raise ValueError('El archivo proporcionado no es un PDF valido')
    temp_pdf_path = os.path.join(
        current_app.config['UPLOAD_FOLDER'], pdf_file.filename)
    pdf_file.save(temp_pdf_path)
    return temp_pdf_path


def __delete_temp_file(file_path):
    if os.path.exists(file_path):
        os.remove(file_path)


def __replace_underscore_and_convert_to_lowercase(chat_name):
    return chat_name.replace(' ', '_').lower()


def __transform_chat_name(chat_name, user_length):
    final_length = len(chat_name) + user_length

    chat_name = __replace_underscore_and_convert_to_lowercase(chat_name)

    if final_length > 63:
        chat_name = chat_name[:63 - user_length]

    chat_name = REMOVE_INVALID_CHARACTERS.sub('', chat_name)

    chat_name = REMOVE_START_END_NON_ALPHANUM.sub('', chat_name)

    chat_name = REMOVE_CONSECUTIVE_PERIODS.sub('.', chat_name)

    return chat_name


def __generate_chat_name(id_chat):
    return __transform_chat_name(id_chat)


def create_chat(chat_name):
    try:
        # chat = __generate_chat_name(id_chat)

        id_chat = insert_db(MODEL_CHAT, {
            'owner': get_jwt_identity(),
            'created_at': datetime.now(),
            'name': str(chat_name)
        })

        Langchain.create_chat(str(id_chat))

        return jsonify({"id_chat ": str(id_chat)}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


def rename_chat(id_chat, new_value):
    try:
        if not search_db(MODEL_CHAT, {'_id': ObjectId(id_chat)}):
            return jsonify({'message': 'El chat no existe'}), 400

        isUpdated = update_one_db(MODEL_CHAT, {'_id': ObjectId(id_chat)}, {
                                  '$set': {'name': new_value}})

        return jsonify({'message': f'El chat {id_chat} se cambio a {new_value} correctamente!'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


def remove_chat(chat_name):
    try:
        isRemoved = delete_one_db(MODEL_CHAT, {'_id': ObjectId(chat_name)})
        print(isRemoved)
        Langchain.delete_chat_if_exists(chat_name)

        return jsonify({'message': f'El chat {chat_name} se eliminó correctamente!'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


def __process_pdf(chat_id, pdf_file):
    try:
        temp_pdf_path = None
        pdf_name = pdf_file.filename[:-4]  # quito la extension .pdf

        chat = search_db(MODEL_CHAT, {
            '_id': ObjectId(chat_id),
            'owner': get_jwt_identity()
        })

        if len(chat) == 0:
            return {'message': 'No se encontro un chat con el id y el usuario logeado'}, 400

        pdfs_chat = chat[0].get('pdfs', [])

        if pdf_name in pdfs_chat:
            return jsonify({'message': 'El PDF ya se encuentra añadido al chat'}), 400

        chat = update_one_db(MODEL_CHAT, {'_id': ObjectId(chat_id)},
                             {'$push': {'pdfs': pdf_name}})

        temp_pdf_path = __save_pdf_to_temp(pdf_file)

        Langchain.append_pdf_if_exists(
            chat_id, temp_pdf_path, pdf_name)

        return {'message': f'El pdf {pdf_name.title()} se agregó al chat {chat_id} correctamente!'}
    except Exception as e:
        return {'error': f'Error en el servidor: {str(e)}'}, 500
    finally:
        if temp_pdf_path is not None:
            __delete_temp_file(temp_pdf_path)


def append_pdf(chat_id, pdf_files):
    results = []
    for pdf_file in pdf_files:
        result = __process_pdf(chat_id, pdf_file)
        results.append(result)
    return results


def pop_pdf(id_chat, pdf_name):
    try:

        update_one_db(MODEL_CHAT, {'_id': ObjectId(id_chat)}, {
                      '$pull': {'pdfs': pdf_name}})

        Langchain.pop_pdf_if_exists(id_chat, pdf_name)

        return jsonify({'message': f'El pdf {pdf_name} se eliminó del chat {id_chat} correctamente!'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


def answer_and_save_message(id_chat, query):
    try:

        chat = search_db(MODEL_CHAT, {
            '_id': ObjectId(id_chat),
            'owner': get_jwt_identity()
        })

        print(chat)

        if len(chat) == 0:
            return jsonify({'message': 'No se encontro un chat con el id y el usuario logeado'}), 400

        # chat = __generate_chat_name(id_chat)
        response = Langchain.response(query, id_chat, chat)

        new_message = {
            'query': query,
            'answer': response,
            'created_at': datetime.now()
        }

        chat = update_one_db(MODEL_CHAT, {'_id': ObjectId(id_chat)},
                             {'$push': {'messages': new_message}},
                             )

        # Aca creo que deberiamos mandar la respuest
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


# Devuelve solo los id y nombres de los chats
def get_chats():
    try:
        list = search_db(MODEL_CHAT, {'owner': get_jwt_identity()}, {
            '_id': 1, 'name': 1})
        return jsonify({'chats': list}), 200
    except Exception as e:
        return jsonify({'err': str(e)}), 400


def get_messages_from_chat(id_chat):
    try:
        chat = search_db(MODEL_CHAT, {
            '_id': ObjectId(id_chat),
            'owner': get_jwt_identity()
        })
        if len(chat) == 0:
            return jsonify({'message': 'No se encontro un chat con el id y el usuario logeado'}), 400

        return jsonify({'chat': chat[0]}), 200
    except Exception as e:
        return jsonify({'err': str(e)}), 400
