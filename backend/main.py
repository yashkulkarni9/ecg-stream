from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from .stream import get_waveform
import asyncio
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/waveform")
def read_waveform():
    return get_waveform()

# Loading real ECG data once
df = get_waveform()

# Realtime ECG waveform stream
async def waveform_generator():
    i = 0
    while True:
        point = df.iloc[i]
        data = {
            "timestamp": str(point['timestamp']), 
            "signal_value": round(float(point['signal_value']), 2)
        }
        yield f"data:{json.dumps(data)}\n\n"
        await asyncio.sleep(0.1)
        i = (i + 1) % len(df)  

@app.get("/waveform-stream")
async def waveform_stream():
    return StreamingResponse(waveform_generator(), media_type="text/event-stream")
