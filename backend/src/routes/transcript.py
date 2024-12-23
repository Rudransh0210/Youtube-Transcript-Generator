from flask import Blueprint, request, jsonify
from ..utils.youtube import extract_video_id, get_video_transcript

transcript_bp = Blueprint('transcript', __name__)

@transcript_bp.route('/get_transcript', methods=['POST'])
def get_transcript():
    """Handle transcript generation requests."""
    data = request.get_json()
    url = data.get('url', '')
    
    video_id = extract_video_id(url)
    if not video_id:
        return jsonify({'error': 'Invalid YouTube URL'}), 400

    transcript_text, error = get_video_transcript(video_id)
    if error:
        return jsonify({'error': error}), 403 if 'disabled' in error.lower() else 500
        
    return jsonify({'transcript': transcript_text})