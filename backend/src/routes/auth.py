from flask import Blueprint, request, jsonify, redirect, url_for
from werkzeug.exceptions import NotFound

from controllers.auth_controller import getAllUsers, createUser

auth = Blueprint('auth', __name__)

@auth.route('/', methods=['GET'])
def index():
    data = {"message": "Hello desde auth"}
    return jsonify(data), 400

@auth.route('/all', methods=['GET'])
def get_all_users():
    return getAllUsers()

@auth.route('/', methods=['POST'])
def create_user():
    return createUser(request.json)

@auth.app_errorhandler(404)
def not_found_error(error):
    return redirect(url_for('.index'))

