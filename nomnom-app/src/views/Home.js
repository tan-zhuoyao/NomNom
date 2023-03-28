import './Home.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

import Review from '../components/Review';
import Upload from '../components/Upload';

function Home() {
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    // fetch the current user's username using the Auth object
    Auth.currentUserInfo()
      .then(user => {
        setUsername(user.username);
      })
      .catch(err => console.log(err));
  }, []);

  // const userId = "poopbloop" //change later
  const backendUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080'
  
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    if (username === "") return;
    fetch(backendUrl + '/data/' + username)
      .then(response => {
        return response.json()})
      .then(data => {
        setReviews(data)});
    // eslint-disable-next-line
  }, [username]);

  const reviewList = reviews.map((r) => 
    // <Container className='post-container'>
      <Review key={r.post_id} username={r.user_id} restaurant={r.restaurant} review={r.review} url={r.url}/>
    // </Container>
  )

  return (

    <Container className='feed-container'>
      <Upload username={username}/>
      {reviewList}
    </Container>

  );
}

export default Home;