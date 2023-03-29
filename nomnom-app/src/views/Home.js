import './Home.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { ThreeCircles } from 'react-loader-spinner';
import { Auth } from 'aws-amplify';

import Review from '../components/Review';
import Upload from '../components/Upload';

function Home() {
  const backendUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080'
  
  const [reviews, setReviews] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // fetch the current user's username using the Auth object
    Auth.currentUserInfo()
      .then(user => {
        setUsername(user.username);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetch(backendUrl + '/all')
      .then(response => {
        return response.json()})
      .then(data => {
        setReviews(data)
        console.log(data)});
    // eslint-disable-next-line
  }, []);

  const reviewList = reviews ? reviews.map((r) => 
      <Review key={r.post_id} userId={r.user_id} restaurant={r.restaurant} review={r.review} rating={r.rating} time={r.time} url={r.url}/>)
      : <></>

  return (
    <Container className='feed-container'>
      <Upload username={username}/>
      {reviews ? reviewList : <ThreeCircles
        height="100"
        width="100"
        color="#59381D"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />}
    </Container>
  );
}

export default Home;