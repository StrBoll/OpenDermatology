from flask import Flask, request, jsonify
from flask_cors import CORS
import onnxruntime as ort
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

model = ort.InferenceSession("CNN.onnx")
leison_names = ['Benign Keratosis', 
                'Melanocytic Nevi',
                'Dermatofibroma',
                'Melanoma',
                'Vasuclar',
                'Basal Cell Carcinoma',
            'Actinic Keratoses']


def preprocess(image, target_size=(224, 224)):
    
    image = image.resize(target_size)

    image_array = np.array(image).astype('float32') / 255.0

    mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
    # Naturalizing the image before feeding it 
    std = np.array([0.229, 0.224, 0.225], dtype=np.float32)

    image_array = (image_array - mean) / std

    return np.expand_dims(image_array, axis=0)





def predict(image_array):
    # Feeding it 
    input_name = model.get_inputs()[0].name
    output_name = model.get_outputs()[0].name

    return model.run([output_name], {input_name: image_array})






@app.route("/toModel", methods=["POST", "GET"])




def to_model():
    if 'skin_image' not in request.files:
        return jsonify({"to_model issue"}), 400
    # name has to match what the the funtion named it in frontend POST request

    try:
        image = Image.open(request.files['skin_image'].stream).convert("RGB")

        preprocessed_image = preprocess(image)

        results = predict(preprocessed_image)
        probabilities = results[0].flatten()
        predictions = {leison_names[i]: float(prob) for i, prob in enumerate(probabilities)}
        top_3_predictions = dict(sorted(predictions.items(), key=lambda item: item[1], reverse=True)[:3])

        return jsonify({"Top 3 Predictions": top_3_predictions}), 200 

    except Exception as e:
        return jsonify({f"Couldn't process image: {str(e)}"}), 500



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
