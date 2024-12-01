import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import Input, { addInput } from "./firestore";  
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/firebase-config';
import { auth } from '../config/firebase-config';
import './uploadimage.css';

const imageToFolder = async (upload) => {
  const data = new FormData();
  data.append("skin_image", upload);

  try {
    const response = await fetch('http://52.87.60.145:3000/uploadImage', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    const responseMess = await response.text();

    if (response.ok) {
      console.log("response ok message: ", responseMess);
      return responseMess;
    } else {
      console.log("error response: ", responseMess);
      return responseMess;
    }
  } catch (error) {
    return "Couldn't contact backend to process image";
  }
};

const imageToModel = async (upload) => {
  const data = new FormData();
  data.append("skin_image", upload);

  try {
    const response = await fetch('http://52.87.60.145:5000/toModel', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    const responseMess = await response.json(); // Parse JSON response

    if (response.ok) {
      console.log("response ok message: ", responseMess);
      return responseMess; // Return the parsed JSON object
    } else {
      console.log("error response: ", responseMess);
      return responseMess;
    }
  } catch (error) {
    return { error: "Couldn't contact backend to process image" };
  }
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const Image = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [statusMessage, setStatusMessage] = useState("");
  const [inputs, setInputs] = useState([]); 

  const fetchPost = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const querySnapshot = await getDocs(collection(db, `users/${uid}/inputs`));
      const newData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          timestamp: data.timestamp ? data.timestamp.toDate().toLocaleString() : "No timestamp",
        };
      });
      setInputs(newData);
      console.log("Fetched inputs:", newData);
    }
  };

  const compressInput = async (file) => {
    if (file.size > 1024 * 1024) { // If file size > 1MB
      const requirements = {
        maxSizeMB: 1, 
        maxWidthOrHeight: 1920, 
        useWebWorker: true,
      };

      try {
        const compressedImage = await imageCompression(file, requirements);
        return compressedImage;
      } catch (error) {
        console.log("Image above 1MB, unable to compress in good quality, ", error);
        return file; // Return original file if compression fails
      }
    }
    return file; // Return original file if no compression needed
  };

  const uploadImageButton = async () => {
    if (selectedImage) {
      const compressedImage = await compressInput(selectedImage); 

      const folderResponse = await imageToFolder(compressedImage);
      const modelResponse = await imageToModel(compressedImage);
      const base64Image = await fileToBase64(compressedImage);
      await addInput(base64Image, setInputs, fetchPost);

      // Process modelResponse
      let modelResponseMessage = '';

      if (modelResponse.error) {
        modelResponseMessage = modelResponse.error;
      } else if (modelResponse["Top 3 Predictions"]) {
        const predictions = modelResponse["Top 3 Predictions"];
        modelResponseMessage = 'Top 3 Predictions:\n';
        for (const [disease, probability] of Object.entries(predictions)) {
          modelResponseMessage += `${disease}: ${(probability * 100).toFixed(2)}%\n`;
        }
      } else {
        modelResponseMessage = 'Unexpected response from model.';
      }

      setStatusMessage(`Folder Response: ${folderResponse}\n\nModel Response:\n${modelResponseMessage}`);
    } else {
      setStatusMessage("Please select an image before submitting.");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); 
    fetchPost(); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Upload Image</h1>

      {selectedImage && (
        <div>
          <img
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
          />
          <br /> <br />
          <button className="logout-button" onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />

      <div className="file-input-wrapper">
        <label className="upload-label">
          Choose File
          <input
            type="file"
            name="myImage"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(event) => {
              const imageUploaded = event.target.files[0];
              console.log(imageUploaded);

              if (imageUploaded) {
                setSelectedImage(imageUploaded);
                setStatusMessage(""); 
              }
            }}
          />
        </label>
        <span className="file-name">
          {selectedImage ? selectedImage.name : "No file chosen"}
        </span>
      </div>

      <br /> <br />

      <button className="submit-button" onClick={uploadImageButton}>Submit</button>

      <br /> <br />

      {/* Display status message */}
      {statusMessage && <pre>{statusMessage}</pre>}

      <h1>History</h1>
      <div className="todo-content">
        <h1 className="header"></h1>
        {inputs?.map((input, i) => (
          <div key={i}>
            <img src={input.input} width="250px" alt="Uploaded" />
            <p>{input.timestamp}</p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Image;