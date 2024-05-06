import bcrypt
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required, JWTManager

from routes.langchain import langchain
from routes.auth import auth

api = Flask(__name__)
CORS(api)

# JWT Initialization
jwt = JWTManager(api)

#La SECRET_KEY deberia ir en un .env
api.config['SECRET_KEY'] = 'my_strong_secret_key'
api.config["JWT_SECRET_KEY"] = 'my_jwt_secret_key'
api.config['JWT_TOKEN_LOCATION'] = ['headers']

api.register_blueprint(langchain, url_prefix='/langchain')
api.register_blueprint(auth, url_prefix='/auth')


@api.route("/", methods=['GET'])
def index():
    data = {"message": "Hello World!!"}
    return jsonify(data), 400


@api.route("/am-i-authenticated", methods=['GET'])
@jwt_required()
def index_authenticated():
    return {"message": "This endpoint is private"}


if __name__ == '__main__':
    api.run(host='0.0.0.0', port=5000, debug=True)
