# transcribe.py
import sys
import whisper
import json

model = whisper.load_model("tiny")  # load once at startup

def transcribe(audio_path):
    result = model.transcribe(audio_path)
    return result["text"]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No audio path provided"}))
        sys.exit(1)

    audio_path = sys.argv[1]

    try:
        text = transcribe(audio_path)
        print(json.dumps({"text": text}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
