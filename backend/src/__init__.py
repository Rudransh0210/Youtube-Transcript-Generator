from flask import Flask
from flask_cors import CORS
from .routes.transcript import transcript_bp

def create_app():
    """Initialize and configure the Flask application."""
    app = Flask(__name__)
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(transcript_bp)
    
    return app