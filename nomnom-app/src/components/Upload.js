import './Upload.css';
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import axios from 'axios';

const Upload = (props) => {
  const { username } = props;

  const [restaurant, setRestaurant] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
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
        userId: username,
        restaurant,
        review,
        rating,
        url
      }).then(response => {
        console.log(response);
      })
    });
  }

  const uploadWithoutPic = () => {
    axios.post(backendUrl + '/post', {
      userId: username,
      restaurant,
      review,
      rating
    }).then(response => {
      console.log(response);
    });
  }

  const handleUpload = (e) => {
    e.preventDefault();
    if (!username || !restaurant || !review) return;
    selectedFile ? uploadWithPic() : uploadWithoutPic();
    setRestaurant(null);
    setReview(null);
    setRating(null);
    setSelectedFile(null);
    handleClose();
  };

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='upload-container'>
      <Button className='upload-button' variant='outline-secondary' onClick={handleShow}>
        Upload your review
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload your review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpload}>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control as="textarea" rows={1} onChange={e => setRestaurant(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Review</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={e => setReview(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Rating (out of 5)</Form.Label>
              <Form.Control as="textarea" rows={1} onChange={e => setRating(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileInput} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Upload review
            </Button>

          </Form>
        </Modal.Body>
      </Modal>


    </div>
  );
};

export default Upload;