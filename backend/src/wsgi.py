from app import create_app

if __name__ == "__main__":
    app = create_app()

    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
