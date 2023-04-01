import './Review.css';

import { Card } from 'react-bootstrap';

function Review(props) {
  const { userId, restaurant, review, rating, time, url } = props;
  const date = new Date(time);
  const dateFormat = date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();

  const ratingComponent = (rating) => {
    let array = [];
    for (let i = 0 ; i < rating; i++) {
      array.push(<img key={i} id='star' alt="" src="star.png"></img>)
    }
    return array;
  }
  return (
    <Card className='post-container'>
      <Card.Body>
        <Card.Subtitle id='post-date'>{dateFormat}</Card.Subtitle>
        <Card.Title id='post-restaurant'>{restaurant}</Card.Title>
        <Card.Subtitle id='post-username'>{userId}</Card.Subtitle>
        <div>
          <div className='vertical-center' id='rating'>Rating: </div>
          {ratingComponent(rating)}
        </div>
        <Card.Text id='post-review'>{review}</Card.Text>
        {url && <Card.Img id='post-image' src={url}/>}
      </Card.Body>
    </Card>
  );

}

export default Review;