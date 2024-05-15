from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.chats_controller import create_simple_chat
from controllers.chats_controller import save_message

from controllers.chats_controller import getChats

chats = Blueprint('chats', __name__)



@chats.route('/', methods=['POST'])
@jwt_required()
def create_chat():
    current_user = get_jwt_identity()
    return create_simple_chat(current_user,request.json['name']), 200


@chats.route('/message', methods=['POST'])
@jwt_required()
def send_message():
    try:
        print("send message")
        current_user = get_jwt_identity()
        return save_message(request.json['id_chat'], request.json['message'], current_user)
    except Exception as e:
        return {'error': str(e)}, 400


@chats.route('/', methods=['GET'])
@jwt_required()
def getMyChats():
    current_user = get_jwt_identity()
    return getChats(current_user)
