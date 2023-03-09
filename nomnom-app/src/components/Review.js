import './Review.css';

import { Card, Col, Row, Image } from 'react-bootstrap';

function Review(props) {
  const { userId, restaurant, review, url } = props;

  return (
    <Card className='post-container'>
      <Card.Body>

        <Card.Title className='post-username'>{userId}</Card.Title>
        <Card.Subtitle className='post-restaurant'>{restaurant}</Card.Subtitle>

        
        <Card.Text className='post-review'>{review}</Card.Text>
        <Card.Img className='post-image' src={url ? url[0] : url}/>
      </Card.Body>
    </Card>
  );

}

export default Review;