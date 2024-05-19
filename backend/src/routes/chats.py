from functools import wraps

from flask import Blueprint, request, jsonify
from werkzeug.exceptions import NotFound

from controllers.chats_controller import get_chats, create_chat, rename_chat, answer_and_save_message, remove_chat, append_pdf, pop_pdf, list_chats, get_messages_from_chat

from flask_jwt_extended import jwt_required

chats = Blueprint('chats', __name__)


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


@__get_and_validate_params('id_chat')
# curl -X POST -H "Content-Type: application/json" -d '{"id_chat": "chat_name"}' -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/chats/
@chats.route('/', methods=['POST'])
@jwt_required()
def create_chat_route():
    chat = request.json.get('id_chat')
    return create_chat(chat)


@__get_and_validate_params('old_value', 'new_value')
# curl -X POST -H "Content-Type: application/json" -d '{"old_value": "id_chat", "new_value": "new_id_chat"}' -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/chats/
@chats.route('/rename-chat', methods=['PUT'])
@jwt_required()
def rename_chat():
    old_value = request.json.get('old_value')
    new_value = request.json.get('new_value')
    return rename_chat(old_value, new_value)


@__get_and_validate_params('id_chat')
# curl -X DELETE -H "Content-Type: application/json" -d '{"chat": "chat_name"}' -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/chats/remove-chat
@chats.route('/remove-chat', methods=['DELETE'])
@jwt_required()
def remove_chat_route():
    chat_name = request.json.get('id_chat')
    return remove_chat(chat_name)


# curl -X PUT -F "pdf=@/path/to/your/file.pdf" -F "chat=chat_name" -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/chats/append-pdf
@chats.route('/append-pdf', methods=['PUT'])
@jwt_required()
def append_pdf_route():

    chat_id = request.form.get('id_chat')
    pdf_file = request.files.get('pdf')

    if pdf_file is None:
        return jsonify({'error': 'No se proporcionó ningún archivo PDF'}), 400

    if chat_id is None:
        return jsonify({'error': 'El nombre del chat no fue proporcionado'}), 400

    return append_pdf(chat_id, pdf_file)


@__get_and_validate_params('id_chat', 'pdf_name')
# curl -X PUT -H "Content-Type: application/json" -d '{"id_chat": "chat_name", "pdf_name": "pdf_name"}' -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/chats/pop-pdf
@chats.route('/pop-pdf', methods=['PUT'])
@jwt_required()
def pop_pdf_route():
    id_chat = request.json.get('id_chat')
    pdf_name = request.json.get('pdf_name')
    return pop_pdf(id_chat, pdf_name)


@__get_and_validate_params('id_chat', 'query')
# curl -X POST -H "Content-Type: application/json" -d '{"id_chat": "chat_name", "pdf_name": "pdf_name"}' -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/chats/pop-pdf
@chats.route('/message', methods=['POST'])
@jwt_required()
def message_route():
    id_chat = request.json.get('id_chat')
    query = request.json.get('query')
    return answer_and_save_message(id_chat, query)


@__get_and_validate_params()
# curl -X GET -H "Content-Type: application/json" -d  -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/chats/
@chats.route('/', methods=['GET'])
@jwt_required()
def get_chats_route():
    return get_chats()


@chats.route('/messages', methods=['GET'])
@jwt_required()
def get_all_messages_from_chat_route():
    id_chat = request.args.get('id')
    return get_messages_from_chat(id_chat)


# curl -X GET -H "Content-Type: application/json" -d  -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:5000/chats/list
@chats.route('/list', methods=['GET'])
def list_chats_route():
    return list_chats()


@chats.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not Found'}), 404
