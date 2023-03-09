import React, { useState } from 'react';
import { Button, Container, Modal, Form } from 'react-bootstrap';

const axios = require('axios');

const Upload = (props) => {
  const { userId } = props;

  const [restaurant, setRestaurant] = useState(null);
  const [review, setReview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const backendUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080'

  const uploadWithPic = () => {
    // TODO: change to some hash instead of the original file name
    axios.post(backendUrl + '/upload/' + selectedFile.name, selectedFile, {
      headers: {
        'Content-Type': selectedFile.type
      }
    }).then(response => {
      console.log(response);
      const url = response.data;
      axios.post(backendUrl + '/post', {
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
    axios.post(backendUrl + '/post', {
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

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    // <div>
    //   <h2>Upload Image</h2>
    //   <h4>UserId</h4>
    //   <input type="text" onChange={e => setUserId(e.target.value)} />
    //   <h4>Restaurant</h4>
    //   <input type="text" onChange={e => setRestaurant(e.target.value)} />
    //   <h4>Review</h4>
    //   <input type="text" onChange={e => setReview(e.target.value)} />
    //   <br/>
    //   <input type="file" onChange={handleFileInput} />
    //   <button onClick={handleUpload}>Upload</button>
    // </div>
    
    <Container>
      <Button className='upload-button' variant="primary" onClick={handleShow}>
        Upload your review
      </Button>

       <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpload}>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>

          </Form>
        </Modal.Body>
      </Modal>


    </Container>

  );
};

export default Upload;