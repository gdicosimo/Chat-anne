import base64
import datetime
from datetime import timedelta

import bcrypt
from flask import jsonify, request, Blueprint, make_response
from db.mongodb.mongo import search_db, insert_db
from flask_jwt_extended import create_access_token

# Constants
MODEL_USER = 'users'
salt = bcrypt.gensalt(rounds=15)

main = Blueprint('auth_blueprint', __name__)


def getAllUsers():
    try:
        elements = search_db(MODEL_USER)
        return jsonify(elements), 200
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500


def registerUser(username, pwd):
    try:
        if search_db(MODEL_USER, {'username': username}):
            return jsonify({'error': 'El email ya existe'}), 400
        hashed_password_bytes = bcrypt.hashpw(pwd.encode(), salt)
        hashed_password_str = hashed_password_bytes.decode('utf-8')
        id_user = insert_db(
            MODEL_USER, {"username": username, "pwd": hashed_password_str})
        return {'message': username + ' registrado correctamente'}, 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 400


def login(username, pwd):
    try:

        list = search_db(MODEL_USER, {'username': username})
        user = list[0]
        hashed_password_bytes = user['pwd'].encode('utf-8')

        if user and bcrypt.checkpw(pwd.encode(), hashed_password_bytes):
            access_token = create_access_token(
                identity=user['username'], expires_delta=timedelta(hours=5))
            response = make_response({"message": "login Success"})
            response.set_cookie('access_token_cookie', access_token, samesite='None', secure=True)
            return response
        else:
            return jsonify({'message': 'Login Failed'}), 401
    except Exception as e:
        return jsonify({'message': 'Login Failed Excepcion'}), 401
