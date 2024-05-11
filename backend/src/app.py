from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required, JWTManager

from routes.langchain import langchain
from routes.auth import auth

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    data = {"message": "Hello World!!"}
    return jsonify(data), 200

@app.route("/am-i-authenticated", methods=['GET'])
@jwt_required()
def index_authenticated():
    return {"message": "This endpoint is private"}

def register_blueprints(app):
    app.register_blueprint(langchain, url_prefix='/langchain')
    app.register_blueprint(auth, url_prefix='/auth')

def config_app(app):
    #La SECRET_KEY deberia ir en un .env
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['SECRET_KEY'] = 'my_strong_secret_key'
    app.config["JWT_SECRET_KEY"] = 'my_jwt_secret_key'
    app.config['UPLOAD_FOLDER'] = '/tmp/'

if __name__ == '__main__':
    CORS(app, resources={r"/*": {"origins": '*'}}, allow_headers='*',supports_credentials=True)
    # JWT Initialization
    jwt = JWTManager(app)
    
    register_blueprints(app)
    config_app(app)

    app.run(host='0.0.0.0', port=5000, debug=True)
