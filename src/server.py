from flask import Flask
from flask_cors import CORS
from PIL import Image
import onnxruntime as ort
import numpy as np
import io
import requests

app = Flask(__name__)
CORS(app)

model = ort.InferenceSession("best.onnx")


@app.route("/toModel", methods=["GET", "POST"])

def preprocessing():
    if 'file' not in requests.files:
        return jsonify({"error": "No file in request"}), 400

    file = request.files['file']
    response = requests.post('http://52.87.60.145:3000/pre-process-only')



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)