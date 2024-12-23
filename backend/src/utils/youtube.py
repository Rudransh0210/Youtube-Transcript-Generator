from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled

def extract_video_id(url: str) -> str | None:
    """Extract YouTube video ID from various URL formats."""
    if "v=" in url:
        return url.split("v=")[1].split("&")[0]
    elif "youtu.be/" in url:
        return url.split("youtu.be/")[1]
    return None

def get_video_transcript(video_id: str) -> tuple[str | None, str | None]:
    """
    Fetch transcript for a YouTube video.
    Returns a tuple of (transcript_text, error_message).
    """
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return "\n".join([entry['text'] for entry in transcript]), None
    except TranscriptsDisabled:
        return None, "Transcripts are disabled for this video."
    except Exception as e:
        return None, str(e)