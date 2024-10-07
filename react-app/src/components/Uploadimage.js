import React, { useState } from "react";

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
          console.log(event.target.files[0]); 
          setSelectedImage(event.target.files[0]); 
        }}
      />
    </div>
  );
};

export default Image;