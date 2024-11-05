import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import Input, { addInput } from "./firestore";  
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../config/firebase-config';
import { auth } from '../config/firebase-config';


const imageToFolder = async (upload, setStatusMessage) => {
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
      setStatusMessage("Image uploaded successfully!");
    } else {
      console.log("error response: ", responseMess);
      setStatusMessage("Backend function called, image upload failed");
    }
  } catch (error) {
    setStatusMessage("Couldn't contact backend to process image");
  }
};


const imageToModel = async (upload, setStatusMessage) => {
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

    const responseMess = await response.text();

    if (response.ok) {
      console.log("response ok message: ", responseMess);
      setStatusMessage("Image uploaded successfully!");
    } else {
      console.log("error response: ", responseMess);
      setStatusMessage("Backend function called, image upload failed");
    }
  } catch (error) {
    setStatusMessage("Couldn't contact backend to process image");
  }
};



const Image = () => {
  
  const [selectedImage, setSelectedImage] = useState(null);

  const [statusMessage, setStatusMessage] = useState("");
  const [inputs, setInputs] = useState([]); 

  const fetchPost = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const querySnapshot = await getDocs(collection(db, `users/${uid}/inputs`));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setInputs(newData);
      console.log("Fetched inputs:", newData);
    }
  };
 

  const compressInput = async (file) => {
    if (file.size > 1024 * 1024) { 
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
        return file; 

      }
    }
    return file; 
  };

  const uploadImageButton = async () => {
    if (selectedImage) {
      const compressedImage = await compressInput(selectedImage); 

      imageToFolder(compressedImage, setStatusMessage); 
      imageToModel(compressedImage, setStatusMessage);
      await addInput("workds ", setInputs, fetchPost);

    } else {
      setStatusMessage("Please select an image before submitting.");
    }
  };
  useEffect(() => {
    fetchPost(); 
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
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />

      <input
        type="file"
        name="myImage"
        accept="image/*"
        onChange={(event) => {
          const imageUploaded = event.target.files[0];
          console.log(imageUploaded);

          if (imageUploaded) {
            setSelectedImage(imageUploaded);
            setStatusMessage(""); 
          }
        }}
      />

      <br /> <br />

      <button onClick={uploadImageButton}>Submit</button>
      <br /> <br />
      
      {statusMessage && <p>{statusMessage}</p>}
      <div className="todo-content">
      <h1 className="header">
                    History
                </h1>
                    {
                        inputs?.map((input,i)=>(
                            <p key={i}>
                                {input.input}
                            </p>
                        ))
                    }
                </div>
    </div>
  );
};


export default Image;
