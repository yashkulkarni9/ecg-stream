import pandas as pd

def read_parquet(filepath):
    df = pd.read_parquet(filepath)
    return df.iloc[:100].to_dict(orient="records") 