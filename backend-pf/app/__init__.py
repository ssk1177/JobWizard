from flask import Flask
from flask_cors import CORS


def create_app():

    app = Flask(__name__)

    CORS(app, origins=["https://backend-js-b12a3f3854fe.herokuapp.com"])

    # Register the Blueprint with the app
    with app.app_context():
        # Import the routes module at the end to avoid circular imports
        from .routes import routes
        app.register_blueprint(routes)

    return app
