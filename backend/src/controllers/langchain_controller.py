from flask import jsonify, request  
from db.chromadb.chroma import insert_db, search_db, list_all_collections
   
def get_index():
    data = {"message": "Hello desde Langchain!!"}
    return jsonify(data), 200

def makeID(request):
    # curl -X POST -H "Content-Type: application/json" -d '{"pdf": "my_pdf" }' http://localhost:5000/langchain/upload-pdf
    uploaded_file = request.json.get('pdf')
    if not uploaded_file:
        return jsonify({'error': 'No se proporcionó ningún archivo PDF'}), 400
    
    inserting = insert_db(uploaded_file)
    return search_db(uploaded_file), 200  

def answer(request):
    # curl -X POST -H "Content-Type: application/json" -d '{"query": "works?" }' http://localhost:5000/langchain/query
    query_data = request.json
    if not query_data:
        return jsonify({'error': 'No se proporcionaron datos de consulta'}), 400
    
    
    
    return {'Success' : "yes"}, 200 
