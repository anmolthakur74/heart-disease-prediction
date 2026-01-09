# Heart Disease Risk Assessment

A clinical decision-support dashboard that predicts heart disease risk using a **Random Forest classifier** trained on cardiovascular health indicators. The tool provides both a classification (High/Low risk) and a model confidence score.

---

## Live Demo

[https://heart-risk-assessment.netlify.app/](https://heart-risk-assessment.netlify.app/)

---

## Features

- Accepts essential clinical inputs for heart disease assessment.  
- Provides a risk classification: **High Risk** or **Low Risk**.  
- Displays model confidence, indicating the reliability of the prediction.  
- Intuitive, responsive interface for seamless user interaction.  
- Supports numeric inputs with controlled ranges and categorical selections for accurate data entry.

---

## Categorical Feature Reference

| Feature                     | Description |
|-----------------------------|-------------|
| Sex                         | 0 = Female, 1 = Male |
| Fasting Blood Sugar (FBS)   | Yes (>120 mg/dL) or No (≤120 mg/dL) |
| Exercise-Induced Angina     | 1 = Yes, 0 = No |
| Number of Major Vessels (CA)| 0–3 major vessels colored by fluoroscopy |
| Thalassemia Status (Thal)   | 1 = Normal, 2 = Fixed Defect, 3 = Reversible Defect |

---

## Technology Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** FastAPI
- **Machine Learning:** Scikit-learn (Random Forest)
- **Deployment:** Netlify (frontend), Render (backend)
- **Data Processing:** Pandas, NumPy

---

## Machine Learning Experiments

- Explored **11 machine learning algorithms**, including:
  - Random Forest, Decision Tree, Logistic Regression, SVM, KNN, LightGBM, CNN, MLP, LSTM, XGBoost, Naive Bayes.
- Applied **Genetic Algorithm (GA) feature selection** and compared results with models without GA.
- Evaluated models using multiple train-test splits (70:30, 75:25, 80:20) and **5-fold cross-validation** for reliable performance.
- **Random Forest** achieved the **highest accuracy** using **8 key features**, and was selected for deployment due to ensemble stability and robustness.
- **Decision Tree** reached **similar accuracy using the same 8 features**, but Random Forest was preferred for better generalization.
- **LightGBM** reached **similar accuracy**, but required **11 features**, making it less efficient for deployment.

## Installation

```bash
git clone https://github.com/anmolthakur74/heart-risk-assessment.git
cd heart-risk-assessment
```

**Backend Setup**

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend:app --reload
```

**Frontend Setup**

```bash
cd frontend
npm install
npm start
```

## Disclaimer

This tool is intended for academic and research purposes only. It is not a substitute for professional medical diagnosis or treatment. Always consult a healthcare professional for clinical decisions.

## Author

**Anmol Thakur**
