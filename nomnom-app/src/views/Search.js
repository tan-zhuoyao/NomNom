import './Search.css';
import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Review from '../components/Review';

function Search() {
  const backendUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080'

  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState();
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    fetch(backendUrl + '/restaurant/' + restaurant)
      .then(response => {
        // console.log(response)
        return response.json()
      })
      .then(data => {
        //console.log(data)
        setReviews(data)
      });
  }, [restaurant]);

  const reviewList = reviews.map((r) =>
    <Review key={r.post_id} userId={r.user_id} restaurant={r.restaurant} review={r.review} url={r.url} />
  )

  const handleSearch = (e) => {
    e.preventDefault();
    setRestaurant(search);
  }

  return (
    <Container className='feed-container'>
      <Form onSubmit={handleSearch}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Restaurant</Form.Label>
          <Form.Control as="textarea" rows={1} onChange={e => setSearch(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      {reviewList}
    </Container>
  );
}

export default Search;