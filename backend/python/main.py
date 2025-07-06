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
        print("Decoding audio...")
        audio_data = base64.b64decode(data.audio_base64)
        
        print("Saving to temp file...")
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio:
            temp_audio.write(audio_data)
            temp_path = temp_audio.name

        print(f"Saved to: {temp_path}, starting transcription...")
        result = model.transcribe(temp_path)

        print("Transcription complete. Cleaning up.")
        os.remove(temp_path)
        return {"text": result["text"]}
    
    except Exception as e:
        print("Transcription failed:", str(e))
        raise HTTPException(status_code=500, detail=f"Transcription error: {str(e)}")
