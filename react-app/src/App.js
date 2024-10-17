import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import LoginPage from './pages/login';
import LoginForm from "./components/loginForm";
import Image from "./components/Uploadimage";
import Openderm from "./pages/openderm";


function App() {
return (
  <Router>
  <div className="App">
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/openderm" element={<Openderm/>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>

  </div>
  </Router>
);
}

export default App;
