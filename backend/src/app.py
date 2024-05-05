from flask import Flask, jsonify
from flask_cors import CORS

from routes.langchain import langchain
from routes.auth import auth

UPLOAD_FOLDER = '/tmp/'

app = Flask(__name__)
CORS(app)

app.register_blueprint(langchain, url_prefix='/langchain')
app.register_blueprint(auth, url_prefix='/auth')

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/", methods=['GET'])
def index():
    data = {"message": "Hello World!!"}
    return jsonify(data), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
