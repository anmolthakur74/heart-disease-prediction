from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# ---------------------------
# Load artifacts
# ---------------------------
rf_model = joblib.load("rf_heart_model.pkl")
scaler = joblib.load("scaler_selected.pkl")
selected_features = joblib.load("features.pkl")
encoders = joblib.load("encoders.pkl")

numeric_features = ["age", "trestbps", "oldpeak"]

# ---------------------------
# FastAPI app
# ---------------------------
app = FastAPI(title="Heart Disease Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
