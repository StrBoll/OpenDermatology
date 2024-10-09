import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import LoginPage from './pages/login';
import Image from "./components/Uploadimage";


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

function App() {
return (
  <Router>
  <div className="App">
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    <Image></Image>
  </div>
  </Router>
);
}

export default App;
