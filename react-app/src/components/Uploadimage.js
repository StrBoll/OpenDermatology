import React, { useState } from "react";




const imageToFolder = async (upload) => {
  const data = new FormData();
  data.append("skin_image", upload);

  try {
    const response = await fetch('http://localhost:18080/uploadImage', {
      method: 'POST',
      body: data
    });

    if (response.ok){
      console.log("Image upload good")
    }

  } catch (error) {
    console.error("Issue with image function: ", error);
  }
};

const Image = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
     
      <h1>Submit images of your skin condition</h1>
      <h3>Displays image back to user</h3>

    
      {selectedImage && (
        <div>
         
          <img
            alt="not found"
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

          console.log(event.target.files[0]); 

          if (imageUploaded){
            setSelectedImage(imageUploaded);
            imageToFolder(imageUploaded);
          }
          
        }}
      />
    </div>
  );
};

export default Image;