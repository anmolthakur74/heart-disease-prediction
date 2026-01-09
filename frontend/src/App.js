import { useState } from "react";
import axios from "axios";

function App() {
  // Initial form state
  const [formData, setFormData] = useState({
    age: 50,       // Numeric
    sex: 1,        // Categorical
    trestbps: 120, // Numeric
    fbs: 0,        // Categorical
    exang: 0,      // Categorical
    oldpeak: 1.0,  // Numeric
    ca: 0,         // Categorical
    thal: 1,       // Categorical
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Labels for frontend display
  const featureLabels = {
    age: "Age (years)",
    sex: "Sex",
    trestbps: "Resting Blood Pressure (mm Hg)",
    fbs: "Fasting Blood Sugar",
    exang: "Exercise-Induced Angina",
    oldpeak: "ST Depression (mm)",
    ca: "Number of Major Vessels",
    thal: "Thalassemia Status",
  };

  // Categorical options for form inputs
  const categoricalOptions = {
    sex: [
      { value: 1, label: "Male" },
      { value: 0, label: "Female" },
    ],
    fbs: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
    exang: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
    ca: [
      { value: 0, label: "0" },
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
    ],
    thal: [
      { value: 1, label: "Normal" },
      { value: 2, label: "Fixed Defect" },
      { value: 3, label: "Reversible Defect" },
    ],
  };

  // Categorical variable legend for users (shown above the form)
  const categoricalLegend = {
  sex: "0 = Female, 1 = Male",
  fbs: "0 = No (≤120 mg/dL), 1 = Yes (>120 mg/dL)",
  exang: "0 = No, 1 = Yes",
  ca: "0–3 = Number of major vessels colored by fluoroscopy",
  thal: "1 = Normal, 2 = Fixed Defect, 3 = Reversible Defect",
};

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  // Prediction API call
  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(
  "https://heart-disease-prediction-00vd.onrender.com/predict",
  formData,
  { headers: { "Content-Type": "application/json" } }
);

      setResult(response.data);
    } catch (err) {
      setError("Prediction service is unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Convert probability to "trees voted"
  const treeConfidence = result ? Math.round(result.probability * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-slate-800">
            Heart Disease Risk Assessment
          </h1>
          <p className="text-slate-600 mt-2 max-w-3xl">
            Clinical decision-support dashboard powered by a Random Forest
            model trained on cardiovascular health indicators.
          </p>
        </header>

        {/* Categorical Legend */}
        <section className="bg-white rounded-xl shadow-md border p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Categorical Feature Reference
          </h2>
          <div className="space-y-2 text-slate-700 text-sm">
            {Object.entries(categoricalLegend).map(([key, desc]) => (
              <div key={key}>
                <strong>{featureLabels[key]}:</strong> {desc}
              </div>
            ))}
          </div>
        </section>

        {/* Patient Input Section */}
        <section className="bg-white rounded-xl shadow-md border p-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-6">
            Patient Clinical Inputs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  {featureLabels[key]}
                </label>

                {categoricalOptions[key] ? (
                  <select
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {categoricalOptions[key].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
  type="number"
  name={key}
  value={value}
  onChange={handleChange}
  min={key === "age" ? 20 : key === "trestbps" ? 80 : key === "oldpeak" ? 0.0 : undefined}
  max={key === "age" ? 100 : key === "trestbps" ? 250 : key === "oldpeak" ? 6.0 : undefined}
  step={key === "oldpeak" ? 0.1 : 1}
  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
/>

                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={handlePredict}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Analyzing Patient Data..." : "Run Risk Assessment"}
            </button>
          </div>

          {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
        </section>

        {/* Result Section */}
        {result && (
          <section className="mt-10 bg-white rounded-xl shadow-md border p-8">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Prediction Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-slate-700 text-lg">
                  <strong>Risk Classification:</strong>{" "}
                  <span
                    className={
                      result.prediction === 1
                        ? "text-red-600 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {result.prediction === 1 ? "High Risk" : "Low Risk"}
                  </span>
                </p>

                <p className="mt-3 text-slate-700">
                  <strong>Model Confidence:</strong> {treeConfidence} out of 100
                  trees voted {result.prediction === 1 ? "High Risk" : "Low Risk"}.
                </p>

                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  This confidence score reflects how many decision trees in the
                  Random Forest ensemble agreed on the predicted class. It is a
                  measure of model agreement, not a direct medical probability.
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-slate-600 mb-2">
                  Interpretation Guidance
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Higher agreement among trees indicates stronger model
                  confidence. Always combine this with professional medical
                  evaluation before making clinical decisions.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Model Overview */}
        <section className="mt-10 bg-white rounded-xl shadow-md border p-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">
            Model Overview
          </h2>
          <p className="text-slate-600 leading-relaxed">
            This dashboard uses a Random Forest classifier trained on selected
            clinical features including age, gender, resting blood pressure,
            fasting blood sugar, exercise-induced angina, ST depression, number
            of major vessels, and thalassemia. The model combines votes from 100
            decision trees to provide both a classification (High/Low risk) and
            a confidence score.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-sm text-slate-500 max-w-4xl">
          <p>
            This tool is intended for academic and research purposes only. It is
            not a substitute for professional medical diagnosis or treatment.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
