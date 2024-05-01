from flask import Flask, jsonify
from flask_cors import CORS

from routes.langchain import langchain
from routes.auth import auth

api = Flask(__name__)
CORS(api)

api.register_blueprint(langchain, url_prefix='/langchain')
api.register_blueprint(auth, url_prefix='/auth')

@api.route("/", methods=['GET'])
def index():
    data = {"message": "Hello World!!"}
    return jsonify(data), 400

if __name__ == '__main__':
    api.run(host='0.0.0.0', port=5000, debug=True)
