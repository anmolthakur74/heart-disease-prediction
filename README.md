# Heart Disease Prediction Dashboard

This project is a full-stack **heart disease prediction system** that combines machine learning experiments with an interactive web dashboard.  

I explored **11 different machine learning algorithms**, including both **classical machine learning (ML)** and **deep learning (DL) models**, to identify the most accurate model for predicting heart disease. Each algorithm was tested **with and without Genetic Algorithm (GA) feature selection**, across multiple train-test splits (70:30, 75:25, 80:20) and using **k-fold cross-validation** to ensure reliable evaluation.  

Among all models, the **Random Forest model consistently achieved the highest accuracy** and was selected for deployment. Interestingly, **Decision Tree and LightGBM** also reached similar performance levels. However, there was a difference in feature usage:

- **Random Forest and Decision Tree** achieved top accuracy using **8 out of 13 features**.  
- **LightGBM** used **11 features** to reach comparable accuracy.  

This analysis demonstrates that the **Random Forest model is both accurate and efficient**, requiring fewer features for prediction while maintaining high performance. 

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

## Author
Anmol Thakur
