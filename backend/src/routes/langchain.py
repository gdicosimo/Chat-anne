from flask import Blueprint, request, jsonify
from werkzeug.exceptions import NotFound

from controllers.langchain_controller import get_index, create_chat, rename_chat, answer, remove_chat, append_pdf, pop_pdf, list_chats

langchain = Blueprint('langchain', __name__)


@langchain.route('/', methods=['GET'])
def index():
    return get_index()


@langchain.route('/create-chat', methods=['POST'])
def create_chat_route():
    return create_chat(request)


@langchain.route('/rename-chat', methods=['PUT'])
def rename_chat_route():
    return rename_chat(request)


@langchain.route('/remove-chat', methods=['DELETE'])
def remove_chat_route():
    return remove_chat(request)


@langchain.route('/append-pdf', methods=['PUT'])
def append_pdf_route():
    return append_pdf(request)


@langchain.route('/pop-pdf', methods=['PUT'])
def pop_pdf_route():
    return pop_pdf(request)


@langchain.route('/query', methods=['GET'])
def query_route():
    return answer(request)


@langchain.route('/list', methods=['GET'])
def list_chats_route():
    return list_chats()


@langchain.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not Found'}), 404
