from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(__file__)  # backend folder

rf_model = joblib.load(os.path.join(BASE_DIR, "rf_heart_model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "scaler_selected.pkl"))
selected_features = joblib.load(os.path.join(BASE_DIR, "features.pkl"))
encoders = joblib.load(os.path.join(BASE_DIR, "encoders.pkl"))

numeric_features = ["age", "trestbps", "oldpeak"]

# ---------------------------
# FastAPI app
# ---------------------------
app = FastAPI(title="Heart Disease Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Input schema
# ---------------------------
class Patient(BaseModel):
    age: float
    sex: int
    trestbps: float
    fbs: int
    exang: int
    oldpeak: float
    ca: int
    thal: int

# ---------------------------
# Prediction endpoint
# ---------------------------
@app.post("/predict")
def predict(patient: Patient):
    data = patient.dict()

    # Create DataFrame in correct feature order
    input_df = pd.DataFrame([data])[selected_features]

    # Encode categorical features (safe, reusable)
    for col, encoder in encoders.items():
        if col in input_df.columns:
            input_df[col] = encoder.transform(input_df[col])

    # Scale numeric features
    input_df[numeric_features] = scaler.transform(
        input_df[numeric_features]
    )

    prediction = rf_model.predict(input_df)[0]
    probability = rf_model.predict_proba(input_df)[0][1]

    return {
        "prediction": int(prediction),
        "probability": float(probability)
    }


