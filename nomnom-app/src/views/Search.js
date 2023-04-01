import './Search.css';
import { useState, useEffect, useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import Review from '../components/Review';
import { ThreeCircles } from 'react-loader-spinner';

function Search() {
  const backendUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080'

  const [reviews, setReviews] = useState(null);
  const [search, setSearch] = useState();
  const [restaurant, setRestaurant] = useState();
  const [loading, setLoading] = useState(false);

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setLoading(true);
    fetch(backendUrl + '/restaurant/' + restaurant)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setReviews(data)
        setLoading(false);
      });
      // eslint-disable-next-line
  }, [restaurant]);

  const reviewList = reviews 
    ? (reviews.length > 0 
      ? reviews.map((r) =>
    <Review key={r.post_id} userId={r.user_id} restaurant={r.restaurant} review={r.review} rating={r.rating} time={r.time} url={r.url} />)
      : <h2 style={{"color": "#59381D"}}>No results found.</h2>)
    : <></>

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
      {loading && <ThreeCircles
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
      {!loading && reviewList}
    </Container>
  );
}

export default Search;