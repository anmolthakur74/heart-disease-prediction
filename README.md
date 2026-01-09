# Heart Disease Risk Assessment

A clinical decision-support dashboard that predicts heart disease risk using a **Random Forest classifier** trained on cardiovascular health indicators. The tool provides both a classification (High/Low risk) and a model confidence score.

---

## Live Demo

[https://heart-risk-assessment.netlify.app/](https://heart-risk-assessment.netlify.app/)

---

## Features

- Input patient clinical features including:
  - Age (years)
  - Sex
  - Resting Blood Pressure (mm Hg)
  - Fasting Blood Sugar
  - Exercise-Induced Angina
  - ST Depression (Exercise vs Rest, mm)
  - Number of Major Vessels (0–3)
  - Thalassemia Status
- Predicts **High Risk** or **Low Risk** heart disease.
- Displays model confidence (how many decision trees voted for the prediction).
- User-friendly interface with numeric step limits and dropdowns for categorical features.

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
  - Random Forest, Decision Tree, Logistic Regression, SVM, KNN, LightGBM, CNN, MLP, etc.
- Applied **Genetic Algorithm (GA) feature selection** and compared with models without GA.
- Evaluated using multiple train-test splits (70:30, 75:25, 80:20) and **5-fold cross-validation** for reliable performance.
- **Random Forest** achieved the highest accuracy using **8 key features**, and was selected for deployment.
- Decision Tree and LightGBM reached similar performance but required more features.


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
