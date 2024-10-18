import React, { useState } from "react";
import '../styles/ResnStyle.css';

const imageToFolder = async (upload, setStatusMessage) => {
  const data = new FormData();
  data.append("skin_image", upload);

  try {
    const response = await fetch('http://52.87.60.145:3000/healthCheck', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
      },
    });

    const responseMess = await response.text();

    if (response.ok) {
      console.log("response ok message: ", responseMess);
      setStatusMessage("Image uploaded successfully!");
    } else {
      console.log("error response: ", responseMess);
      setStatusMessage("Backend function called, image upload failed.");
    }
  } catch (error) {
    setStatusMessage("Couldn't contact backend to process image.");
    console.error(error);
  }
};

const Image = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const uploadImageButton = () => {
    if (selectedImage) {
      imageToFolder(selectedImage, setStatusMessage);
    } else {
      setStatusMessage("Please select an image before submitting.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Image</h2>

      {selectedImage && (
        <div>
          <img
            className="uploaded-image"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded Preview"
          />
          <br /> <br />
          <button className="remove-button" onClick={() => setSelectedImage(null)}>
            Remove
          </button>
        </div>
      )}

      <br />

      <label className="upload-label" htmlFor="file-upload">Choose Image</label>
      <input
        id="file-upload"
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
      <button className="submit-button" onClick={uploadImageButton}>Submit</button>

      <br /> <br />
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default Image;
