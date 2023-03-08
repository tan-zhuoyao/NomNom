import React, { useState } from 'react';
const axios = require('axios');

const Upload = () => {
  const [userId, setUserId] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [review, setReview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadWithPic = () => {
    // TODO: change to some hash instead of the original file name
    axios.post('http://localhost:8080/upload/' + selectedFile.name, selectedFile, {
      headers: {
        'Content-Type': selectedFile.type
      }
    }).then(response => {
      console.log(response);
      const url = response.data;
      axios.post('http://localhost:8080/post', {
        userId,
        restaurant,
        review,
        url
      }).then(response => {
        console.log(response);
      })
    });
  }

  const uploadWithoutPic = () => {
    axios.post('http://localhost:8080/post', {
      userId,
      restaurant,
      review
    }).then(response => {
      console.log(response);
    });
  }

  const handleUpload = () => {
    if (!userId || !restaurant || !review) return;
    selectedFile ? uploadWithPic() : uploadWithoutPic();
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <h4>UserId</h4>
      <input type="text" onChange={e => setUserId(e.target.value)} />
      <h4>Restaurant</h4>
      <input type="text" onChange={e => setRestaurant(e.target.value)} />
      <h4>Review</h4>
      <input type="text" onChange={e => setReview(e.target.value)} />
      <br/>
      <input type="file" onChange={handleFileInput} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
