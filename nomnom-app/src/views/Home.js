import './Home.css';
import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import Sidebar from '../components/Sidebar';
import Review from '../components/Review';

function Home() {
  const userId = "poopbloop" //change later
  const backendUrl = process.env.REACT_APP_SERVER_URL
  
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(backendUrl + '/data/' + userId)
      .then(response => {
        // console.log(response)
        return response.json()})
      .then(data => {
        //console.log(data)
        setReviews(data)});
  }, []);

  const reviewList = reviews.map((r) => 
    // <Container className='post-container'>
      <Review key={r.post_id} userId={r.user_id} restaurant={r.restaurant} review={r.review} url={r.url}/>
    // </Container>
  )

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <Container className='feed-container'>
            {reviewList}
          </Container>
        </Col>
      </Row>
    </Container>

  );
}

export default Home;