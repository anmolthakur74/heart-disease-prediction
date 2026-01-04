# Heart Disease Prediction Dashboard

This project is a full-stack **heart disease prediction system** that combines machine learning experiments with an interactive web dashboard.  

I applied **11 different machine learning algorithms**, both **with and without Genetic Algorithm (GA) for feature selection**, to analyze and identify the best-performing model. Among all experiments, the **Random Forest model achieved the highest accuracy** and has been deployed for real-time predictions.

---

## Key Highlights

- **Machine Learning Experiments**:  
  - 11 algorithms tested, including Random Forest, Logistic Regression, SVM, KNN, Decision Tree, CNN, MLP etc.  
  - Feature selection applied using **Genetic Algorithm (GA)** and compared against models without GA.  
  - Evaluated using multiple train-test splits for reliable performance.

- **Deployed Model**:  
  - **Random Forest** was selected as the production-ready model due to its superior accuracy.  
  - Model and selected features are saved as `.pkl` files and served via **FastAPI**.

- **Frontend Dashboard**:  
  - Interactive **React app** for inputting patient data and viewing predictions.  
  - Connects to the FastAPI backend for real-time inference.

- **Backend**:  
  - Built with **FastAPI** and serves the deployed Random Forest model.  
  - Handles prediction requests, ensuring input data uses the same features as the trained model.

---

## How to Run

### Backend

```bash

cd backend
pip install fastapi uvicorn pandas joblib scikit-learn
python -m uvicorn backend:app --reload

cd frontend
npm install
npm start
```

**Author**
Anmol Thakur
