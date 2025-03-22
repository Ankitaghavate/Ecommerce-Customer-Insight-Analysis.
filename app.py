from flask import Flask, render_template, request, jsonify
import numpy as np
import pickle

# Load trained model
model = pickle.load(open('model.pkl', 'rb'))

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # Serve frontend

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = [
            float(data['Avg_Session_Length']),
            float(data['Time_on_App']),
            float(data['Time_on_Website']),
            float(data['Length_of_Membership']),
           
        ]

        input_data = np.array(features).reshape(1, -1)
        prediction = model.predict(input_data)

        return jsonify({"prediction": prediction.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
