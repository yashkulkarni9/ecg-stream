# 🫀 ECG Streamer - Real-Time Waveform Viewer

ECG Streamer is a full-stack application designed to **stream real-time ECG waveforms** from compressed Parquet files and then view 15–20 heartbeats rendered dynamically on a web interface. Built for hospital use cases, remote diagnostics, and telemetry data research, this tool allows practitioners and developers to navigate patient ECG signals, select leads, and inspect waveform segments in a seamless, web-based interface.

---

## 📌 What Problem Does It Solve?

Hospitals and research teams often store **massive ECG datasets** in Parquet format for efficient batch analytics. But visualizing that data **in real-time** is a challenge. Most tools are built for batch analysis or lack live-streaming capabilities.

This app bridges that gap:
- Converts compressed, partitioned Parquet files into time-windowed waveform slices.
- Streams that data over HTTP to a frontend that renders it live.
- Supports **lead selection** from the UI.

You don’t need a custom ETL pipeline or waveform renderer — just load the app, select the lead, and start visualizing.

---

## 🎯 Use Cases

- **Hospital Monitoring Dashboards**  
  Clinicians can inspect stored ECG segments in real-time during rounds or analysis.

- **Remote Diagnostics**  
  Cardiologists or technicians working offsite can access waveforms securely.

- **ML/AI Workflow Inspection**  
  Validate training or inference data used for heartbeat classification models.

- **Academic Demonstrations**  
  Interactive tool for teaching ECG interpretation to students or during workshops.

---

## 🛠️ Tech Stack

| Layer        | Tech Used                                     |
|--------------|-----------------------------------------------|
| Frontend     | React 19, Recharts, Styled Components         |
| Backend      | FastAPI (Python 3.11+)                        |
| Data Format  | Partitioned Parquet files with ECG data       |
| Transport    | REST API via Axios (can extend to WebSockets) |
| Styling      | `styled-components`, vanilla CSS              |
| Visualization| Recharts-based line plot                      |

---

## 🗂️ Data Format & Structure

Parquet files are stored with this structure:

Each file contains:
| timestamp (ms) | voltage (mV) |
|----------------|--------------|
| 0              | 0.16         |
| 2              | 0.18         |
| ...            | ...          |

---

## ⚙️ Features

- 🔁 Streams ~15–20 heartbeats at a time (adjustable window).
- 🎚️ Lead selection UI (e.g. Lead I, II, III).
- 📄 Reads Parquet directly using `pyarrow` on backend.
- 🌐 Stateless API that supports multiple viewers.

---

## 🏗️ Implementation Overview

### 1. **Frontend (`/frontend`)**
- Built with **React + Tailwind CSS**.
- Fetches waveform data every few seconds via `/api/ecg` endpoint.
- Uses a **canvas-based waveform renderer** to keep performance high.
- User selects **lead**, and waveform updates.

### 2. **Backend (`/backend`)**
- Built with **FastAPI**.
- Reads requested `.parquet` files using **pyarrow**.
- Filters a small window (e.g., 15 seconds of samples).
- Returns as JSON: `[{ timestamp: ..., voltage: ... }, ...]`.

### 3. **Data Folder**
- This is the root folder the backend reads from.

---

## Streaming Logic
- Backend reads a small slice from the Parquet file using pandas.read_parquet(..., columns=[...], skiprows=N, nrows=M)
- Sends the chunk to frontend over HTTP as JSON
- Frontend polls or requests next chunk every few seconds
- ECG waveform updates in-place using Recharts

---

## Future Improvements
- Replace polling with WebSocket-based live streaming.
- Add zoom and pan controls on waveform.
- Integrate real ECG analysis overlays (e.g. detect R peaks).
- Patient session recording and annotation.

---
