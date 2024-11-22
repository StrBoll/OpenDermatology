// src/pages/history.js
import React from 'react';
import Input from '../components/firestore';

const HistoryPage = () => {
  return (
    <div className="history-page-container">
      <h2>User History</h2>
      <Input showHistory={true} /> {/* Pass showHistory as true to display history */}
    </div>
  );
};

export default HistoryPage;
