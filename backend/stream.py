import os
import pandas as pd

def get_waveform(lead: str = "lead1"):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    filename = "parquet file path from data/waveforms directory"
    file_path = os.path.join(base_dir, "data", "waveforms", filename)

    df = pd.read_parquet(file_path)
    return df.head(50)  
