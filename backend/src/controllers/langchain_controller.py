import os
import re
from functools import wraps

from flask import jsonify, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity

from langChain.app import LangChain

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


def __get_and_validate_params(*params):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            missing_params = [
                param for param in params if not request.json.get(param)]
            if missing_params:
                return jsonify({'error': f'No se proporcionaron los siguientes parámetros: {", ".join(missing_params)}'}), 400
            return func(*args, **kwargs)
        return wrapper
    return decorator


def __generate_chat_name(chat_suffix):
    username = get_jwt_identity()
    chat_suffix = __transform_chat_name(chat_suffix, len(username))

    potential_name = f"{username}._{chat_suffix}"

    return potential_name


def get_index():
    data = {"message": "Hello desde Langchain!!"}
    return jsonify(data), 200


@jwt_required()
@__get_and_validate_params('chat')
def create_chat(request):
    # curl -X POST -H "Content-Type: application/json" -d '{"chat": "chat_name"}' -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/langchain/create_chat
    try:
        chat_name = request.json.get('chat')

        chat = __generate_chat_name(chat_name)

        LangChain.create_chat(chat)

        return jsonify({'message': f'Se creo el chat {chat_name} exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


@jwt_required()
@__get_and_validate_params('old_value', 'new_value')
def rename_chat(request):
    # curl -X PUT -H "Content-Type: application/json" -d '{"old_value": "chat_name", "new_value": "my_new_chat"}' -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/langchain/rename-chat
    try:
        old_value = request.json.get('old_value', None)
        new_value = request.json.get('new_value', None)

        chat = __generate_chat_name(old_value)
        new_name = __generate_chat_name(new_value)

        LangChain.rename_chat_if_exists(chat, new_name)

        return jsonify({'message': f'El chat {old_value} se cambio a {new_value} correctamente!'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


@jwt_required()
@__get_and_validate_params('chat')
def remove_chat(request):
    # curl -X DELETE -H "Content-Type: application/json" -d '{"chat": "chat_name"}' -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/langchain/remove-chat
    try:
        chat_name = request.json.get('chat')

        chat = __generate_chat_name(chat_name)

        LangChain.delete_chat_if_exists(chat)

        return jsonify({'message': f'El chat {chat_name} se eliminó correctamente!'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


@jwt_required()
def append_pdf(request):
    # curl -X PUT -F "pdf=@/path/to/your/file.pdf" -F "chat=chat_name" -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/langchain/append-pdf
    try:
        temp_pdf_path = None
        chat_name = request.form.get('chat')
        pdf_file = request.files.get('pdf')

        if pdf_file is None:
            return jsonify({'error': 'No se proporcionó ningún archivo PDF'}), 400

        if chat_name is None:
            return jsonify({'error': 'El nombre del chat no fue proporcionado'}), 400

        chat = __generate_chat_name(chat_name)

        pdf_name = pdf_file.filename[:-4]  # quito la extension .pdf
        temp_pdf_path = __save_pdf_to_temp(pdf_file)

        LangChain.append_pdf_if_exists(chat, temp_pdf_path, pdf_name)

        return jsonify({'message': f'El pdf {pdf_name.title()} se agregó al chat {chat_name} correctamente!'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500
    finally:
        if temp_pdf_path is not None:
            __delete_temp_file(temp_pdf_path)


@jwt_required()
@__get_and_validate_params('chat', 'pdf')
def pop_pdf(request):
    # curl -X PUT -H "Content-Type: application/json" -d '{"pdf": "pdf_name", "chat": "chat_name"}' -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/langchain/pop-pdf
    try:
        chat_name = request.json.get('chat')
        pdf_name = request.json.get('pdf')

        chat = __generate_chat_name(chat_name)

        LangChain.pop_pdf_if_exists(chat, pdf_name)

        return jsonify({'message': f'El pdf {pdf_name} se eliminó del chat {chat_name} correctamente!'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


@jwt_required()
@__get_and_validate_params('chat', 'query')
def answer(request):
    # curl -X GET -H "Content-Type: application/json" -d '{"query": "your_query", "chat": "chat_name"}' -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/langchain/query
    try:
        chat_name = request.json.get('chat')
        query = request.json.get('query')

        chat = __generate_chat_name(chat_name)

        response = LangChain.response(query, chat)

        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500


def list_chats():
    # This controller is only for testing
    try:
        collections = LangChain.list_chats()
        return jsonify(collections), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500
