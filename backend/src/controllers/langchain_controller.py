import os
from flask import jsonify, request, current_app

from langChain.app import LangChain


def get_index():
    data = {"message": "Hello from Langchain!!"}
    return jsonify(data), 200


def create_or_add_to_collection(request):
    # curl -X POST -F "pdf=@/home/user/Downloads/Modulo_3.pdf" -F "collection=gonza" http://localhost:5000/langchain/upload-pdf

    try:
        if 'pdf' not in request.files:
            return jsonify({'error': 'No se proporciono ningun archivo PDF'}), 400

        pdf_file = request.files['pdf']
        collection = request.form.get('collection')

        if not pdf_file.filename.endswith('.pdf'):
            return jsonify({'error': 'El archivo proporcionado no es un PDF valido'}), 400

        temp_pdf_path = os.path.join(
            current_app.config['UPLOAD_FOLDER'], pdf_file.filename)
        pdf_file.save(temp_pdf_path)

        LangChain.create_or_add(temp_pdf_path, collection)

        return jsonify({'message': f'El archivo {pdf_file.filename} se agrego a la coleccion exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500
    finally:
        if os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)


def list_collections(request):
    # This controller is only for testing
    collections = LangChain.list_collections()
    return jsonify(collections), 200


def answer(request):
    # curl -X POST -H "Content-Type: application/json" -d '{"query": "Que es una derivada?", "collection" : "gonza"}' http://localhost:5000/langchain/query
    try:
        data = request.json

        query = data.get('query')
        collection = data.get('collection')
        if not query or not collection:
            return jsonify({'error': 'Los datos de consulta son obligatorios y deben incluir "query" y "collection"'}), 400

        response = LangChain.response(query, collection)

        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500
