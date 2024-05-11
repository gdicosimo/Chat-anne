from flask import Blueprint, request, jsonify, redirect, url_for
from werkzeug.exceptions import NotFound

from controllers.langchain_controller import get_index, list_collections, create_or_add_to_collection, answer

langchain = Blueprint('langchain', __name__)


@langchain.route('/', methods=['GET'])
def index():
    return get_index()


@langchain.route('/list', methods=['GET'])
def list():
    return list_collections(request)


@langchain.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    return create_or_add_to_collection(request)


@langchain.route('/query', methods=['POST'])
def query():
    return answer(request)


@langchain.errorhandler(404)
def not_found_error(error):
    return redirect(url_for('.index'))
