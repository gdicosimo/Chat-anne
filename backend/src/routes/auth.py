from flask import Blueprint, request, jsonify, redirect, url_for

from controllers.auth_controller import registerUser, login

auth = Blueprint('auth', __name__)


@auth.route('/', methods=['GET'])
def index():
    data = {"message": "Hello desde auth"}
    return jsonify(data), 400


"""


@auth.route('/all', methods=['GET'])
def get_all_users():
    return getAllUsers()
"""


@auth.route('/register', methods=['POST'])
def register():

    return registerUser(request.json['username'], request.json['pwd'])


@auth.route('/login', methods=['POST'])
def loginUser():
    return login(request.json['username'], request.json['pwd'])


@auth.app_errorhandler(404)
def not_found_error(error):
    return redirect(url_for('.index'))
