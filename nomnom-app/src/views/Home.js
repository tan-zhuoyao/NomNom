import './Home.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Review from '../components/Review';
import Upload from '../components/Upload';

function Home() {
  const userId = "poopbloop" //change later
  const backendUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080'
  
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetch(backendUrl + '/data/' + userId)
      .then(response => {
        // console.log(response)
        return response.json()})
      .then(data => {
        //console.log(data)
        setReviews(data)});
  }, [backendUrl]);

  const reviewList = reviews.map((r) => 
    // <Container className='post-container'>
      <Review key={r.post_id} userId={r.user_id} restaurant={r.restaurant} review={r.review} url={r.url}/>
    // </Container>
  )

  return (

    <Container className='feed-container'>
      <Upload userId={userId}/>
      {reviewList}
    </Container>

  );
}

export default Home;