import React, { useState } from 'react';
const axios = require('axios');

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    console.log(selectedFile)
    // TODO: change to some hash instead of the original file name
    axios.post('http://localhost:8080/upload/' + selectedFile.name, selectedFile, {
      headers: {
        'Content-Type': selectedFile.type
      }
    }).then(response => console.log(response));
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileInput} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
