from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required, JWTManager


def create_app():
    app = Flask(__name__)
    
    @app.route("/am-i-authenticated", methods=['GET'])
    @jwt_required()
    def index_authenticated():
        return {"message": "This endpoint is private"}


    def register_blueprints(app):
        from routes.auth import auth
        from routes.chats import chats
        
        app.register_blueprint(auth, url_prefix='/auth')
        app.register_blueprint(chats, url_prefix='/chats')


    def config_app(app):
        # La SECRET_KEY deberia ir en un .env
        app.config['JWT_TOKEN_LOCATION'] = ['cookies']
        app.config['JWT_COOKIE_CSRF_PROTECT'] = False
        app.config['SECRET_KEY'] = 'my_strong_secret_key'
        app.config["JWT_SECRET_KEY"] = 'my_jwt_secret_key'
        app.config['JWT_COOKIE_CSRF_PROTECT'] = False
        app.config['UPLOAD_FOLDER'] = '/tmp/'


    CORS(app, resources={r"/*": {"origins": '*'}},
         allow_headers='*', supports_credentials=True)

    # JWT Initialization
    jwt = JWTManager(app)

    register_blueprints(app)
    config_app(app)
    
    return app

def append_index(app):
    @app.route("/", methods=['GET'])
    def index():
        data = {"message": "Hello from api!!"}
        return jsonify(data), 200
        
if __name__ == '__main__':
    app = create_app()
    append_index(app)

    app.run(host='0.0.0.0', port=5000, debug=True)
