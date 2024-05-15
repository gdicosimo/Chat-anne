from datetime import datetime

import os
import re

from bson import ObjectId
from flask_jwt_extended import jsonify, get_jwt_identity, current_app

from db.mongodb.mongo import search_db, insert_db, update_one_db

from controllers.langchain_controller import Langchain

MODEL_USER = 'users'
MODEL_CHAT = 'chats'
OWNER = get_jwt_identity()  # Chequear esto

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


def create_chat(id_chat):
    try:

        id_chat = insert_db(MODEL_CHAT, {
            'owner': OWNER,
            'created_at': datetime.now(),
            'name': chat
        })

        chat = __generate_chat_name(id_chat)
        Langchain.create_chat(chat)

        return jsonify({"id_chat ": str(id_chat)}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


def rename_chat(old_value, new_value):
    try:
        # aca langchain en realidad no deberia hacer nada dado que ahora nos manejamos con el id

        update_one_db  # deberias chequear que no haya repetidos ?

        return jsonify({'message': f'El chat {old_value} se cambio a {new_value} correctamente!'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


def remove_chat(chat_name):
    try:

        update_one_db  # eliminar el pdf del chat

        chat = __generate_chat_name(chat_name)
        Langchain.delete_chat_if_exists(chat)

        return jsonify({'message': f'El chat {chat_name} se eliminó correctamente!'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


def append_pdf(chat_id, pdf_file):
    try:
        temp_pdf_path = None

        pdf_name = pdf_file.filename[:-4]  # quito la extension .pdf

        update_one_db  # Aca deberias agregar el nombre del pdf

        temp_pdf_path = __save_pdf_to_temp(pdf_file)

        chat = __generate_chat_name(chat_id)
        Langchain.append_pdf_if_exists(chat, temp_pdf_path, pdf_name)

        return jsonify({'message': f'El pdf {pdf_name.title()} se agregó al chat {chat_id} correctamente!'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500
    finally:
        if temp_pdf_path is not None:
            __delete_temp_file(temp_pdf_path)


def pop_pdf(id_chat, pdf_name):
    try:
        update_one_db  # Aca eliminar el nombre del pdf

        chat = __generate_chat_name(id_chat)
        Langchain.pop_pdf_if_exists(chat, pdf_name)

        return jsonify({'message': f'El pdf {pdf_name} se eliminó del chat {id_chat} correctamente!'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


def answer_and_save_message(id_chat, query):
    try:

        chat = search_db(MODEL_CHAT, {
            '_id': ObjectId(id_chat),
            'owner': OWNER
        })

        if len(chat) == 0:
            return jsonify({'message': 'No se encontro un chat con el id y el usuario logeado'}), 200

        chat = __generate_chat_name(id_chat)
        response = Langchain.response(query, chat)

        new_message = {
            'query': query,
            'answer': response,
            'created_at': datetime.now()
        }

        chat = update_one_db(MODEL_CHAT, {'_id': ObjectId(id_chat)},
                             {'$push': {'messages': new_message}})

        # Aca creo que deberiamos mandar la respuest
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


# Devuelve solo los id y nombres de los chats
def get_chats():
    try:
        list = search_db(MODEL_CHAT, {'owner': OWNER}, {
                         '_id': 1, 'name': 1})
        return jsonify({'chats': list}), 200
    except Exception as e:
        return jsonify({'err': str(e)}), 400


# This controller is only for testing
def list_chats():
    try:
        collections = Langchain.list_chats()
        return jsonify(collections), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500
