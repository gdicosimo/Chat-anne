from functools import wraps

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from werkzeug.exceptions import NotFound


from controllers.chats_controller import (
    get_chats, create_chat, rename_chat as rename_chat_controller,
    answer_and_save_message, remove_chat, append_pdf, pop_pdf,
    get_messages_from_chat
)

chats = Blueprint('chats', __name__)


def __get_and_validate_params(*params):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            data = request.get_json()
            missing_params = [param for param in params if param not in data]
            if missing_params:
                return jsonify({'error': f'No se proporcionaron los siguientes parámetros: {", ".join(missing_params)}'}), 400
            return func(*args, **kwargs)
        return wrapper
    return decorator


@chats.route('/', methods=['POST'])
@jwt_required()
@__get_and_validate_params('id_chat')
def create_chat_route():
    chat = request.json.get('id_chat')
    return create_chat(chat)


@chats.route('/rename-chat', methods=['PUT'])
@jwt_required()
@__get_and_validate_params('id_chat', 'new_value')
def rename_chat_route():
    id_chat = request.json.get('id_chat')
    new_value = request.json.get('new_value')
    return rename_chat_controller(id_chat, new_value)


@chats.route('/remove-chat', methods=['DELETE'])
@jwt_required()
# @__get_and_validate_params('id_chat')
def remove_chat_route():
    chat_name = request.json.get('id_chat')
    return remove_chat(chat_name)


@chats.route('/append-pdf', methods=['PUT'])
@jwt_required()
def append_pdf_route():
    chat_id = request.form.get('id_chat')
    pdf_files = request.files.getlist('pdf_files')

    if not pdf_files or len(pdf_files) == 0:
        return jsonify({'error': 'No se proporcionaron PDFs.'}), 400
    if not chat_id:
        return jsonify({'error': 'El id del chat no fue proporcionado.'}), 400

    return append_pdf(chat_id, pdf_files)


@chats.route('/pop-pdf', methods=['PUT'])
@jwt_required()
@__get_and_validate_params('id_chat', 'pdf_name')
def pop_pdf_route():
    id_chat = request.json.get('id_chat')
    pdf_name = request.json.get('pdf_name')
    return pop_pdf(id_chat, pdf_name)


@chats.route('/message', methods=['POST'])
@jwt_required()
@__get_and_validate_params('id_chat', 'query')
def message_route():
    id_chat = request.json.get('id_chat')
    query = request.json.get('query')
    return answer_and_save_message(id_chat, query)


@chats.route('/', methods=['GET'])
@jwt_required()
def get_chats_route():
    return get_chats()


@chats.route('/messages', methods=['GET'])
@jwt_required()
# @__get_and_validate_params('id_chat')
def get_all_messages_from_chat_route():
    id_chat = request.args.get('id_chat')
    return get_messages_from_chat(id_chat)


@chats.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not Found'}), 404
