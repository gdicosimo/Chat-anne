from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
    data = {"message": "Hello World!!"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
