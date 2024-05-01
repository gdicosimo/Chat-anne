from flask import Blueprint, request, jsonify, redirect, url_for
from werkzeug.exceptions import NotFound

from controllers.langchain_controller import get_index, makeID, answer

langchain = Blueprint('langchain', __name__)

@langchain.route('/', methods=['GET'])
def index():
    return get_index()

@langchain.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    return makeID(request)

@langchain.route('/query', methods=['POST'])
def query():
    return answer(request)

@langchain.errorhandler(404)
def not_found_error(error):
    return redirect(url_for('.index'))

