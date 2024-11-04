import React, { useState } from 'react';
import styles from './FileUpload.module.css';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    // Handle file upload logic
    console.log('File to be uploaded:', selectedFile);
  };

  return (
    <div className={styles.container}>
      <div className={styles.uploadContainer}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className={styles.fileInput} 
        />
        <button onClick={handleUpload} className={styles.uploadButton}>
          Upload
        </button>
        {selectedFile && (
          <p className={styles.selectedFile}>Selected file: {selectedFile.name}</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
