import React, { useState } from "react";



const imageToFolder = async (upload, setStatusMessage) => {
  const data = new FormData();
  data.append("skin_image", upload);

  try {
    const response = await fetch('http://localhost:18080/uploadImage', {
      method: 'POST',
      body: data


    });

    if (response.ok) {


      setStatusMessage("Image uploaded successfully!");      
    } else {


      setStatusMessage("Backend function called, image upload failed");
    }

  } catch (error) {
    setStatusMessage("Couldn't contact backend to process image");
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
    <div>

      
      {selectedImage && (
        <div>
          <img
            
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}

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
    </div>
  );
};

export default Image;
