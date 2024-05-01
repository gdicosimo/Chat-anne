from flask import jsonify, request
from db.mongodb.mongo import search_db, insert_db

# Constants
MODEL = 'users'

def getAllUsers():
    # curl -X GET http://localhost:5000/auth/all -H "Accept: application/json"
    try:
        elements = search_db(MODEL)
        return jsonify(elements), 200
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500
        
def createUser(request):
    # curl -X POST -H "Content-Type: application/json" -d '{"username": "401024", "psw": 123 }' http://localhost:5000/auth/
    try:
        username = request.get('username')
        if not username:
            return jsonify({'status': 'error', 'message': 'El campo "username" es obligatorio'}), 400

        existing_user = search_db(MODEL, {'username': username})
        if existing_user:
            return jsonify({'status': 'error', 'message': f'El usuario "{username}" ya existe'}), 400

        new_user = insert_db(MODEL, request)
        return jsonify({'message': '¡Nuevo usuario creado!', 'data': new_user}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500
