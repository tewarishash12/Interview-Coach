# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import whisper
import base64
import tempfile
import os

app = FastAPI()

model = whisper.load_model("tiny")  # load once at startup

class TranscriptionRequest(BaseModel):
    audio_base64: str

class TranscriptionResponse(BaseModel):
    text: str

@app.post("/transcribe", response_model=TranscriptionResponse)
def transcribe_audio(data: TranscriptionRequest):
    try:
        # Decode base64 and save to temp file
        audio_data = base64.b64decode(data.audio_base64)
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio:
            temp_audio.write(audio_data)
            temp_path = temp_audio.name

        # Transcribe
        result = model.transcribe(temp_path)

        # Clean up
        os.remove(temp_path)

        return {"text": result["text"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
