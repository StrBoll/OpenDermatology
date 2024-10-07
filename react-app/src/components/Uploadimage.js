import React, { useState } from "react";

const Image = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
     
      <h1>Upload and Display Image</h1>
      <h3>using React Hooks</h3>

    
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
       
        onChange={(event) => {
          console.log(event.target.files[0]); 
          setSelectedImage(event.target.files[0]); 
        }}
      />
    </div>
  );
};

export default Image;