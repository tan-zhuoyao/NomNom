import { Card } from "react-bootstrap";

function CardRecommendations(props) {
  const { restaurantName, imageUrl } = props;
  return (
    <Card className="post-container">
      <Card.Body>
        <Card.Title id="post-restaurant">{restaurantName}</Card.Title>
        <Card.Img id="post-image" src={imageUrl} />
      </Card.Body>
    </Card>
  );
}

export default CardRecommendations;