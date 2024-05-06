import bcrypt
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required, JWTManager

from routes.langchain import langchain
from routes.auth import auth

UPLOAD_FOLDER = '/tmp/'



app = Flask(__name__)
CORS(app)

app.register_blueprint(langchain, url_prefix='/langchain')
app.register_blueprint(auth, url_prefix='/auth')

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# JWT Initialization
jwt = JWTManager(app)

#La SECRET_KEY deberia ir en un .env
app.config['SECRET_KEY'] = 'my_strong_secret_key'
app.config["JWT_SECRET_KEY"] = 'my_jwt_secret_key'
app.config['JWT_TOKEN_LOCATION'] = ['headers']

app.register_blueprint(langchain, url_prefix='/langchain')
app.register_blueprint(auth, url_prefix='/auth')

@app.route("/", methods=['GET'])
def index():
    data = {"message": "Hello World!!"}
    return jsonify(data), 400



@app.route("/am-i-authenticated", methods=['GET'])
@jwt_required()
def index_authenticated():
    return {"message": "This endpoint is private"}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
