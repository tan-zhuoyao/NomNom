import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CardRecommendations from "../components/CardRecommendations";

const recommendationsImages = [
  "https://www.capitaland.com/content/dam/capitaland-tenants/imported/en/-/media/cma-malls/websites/storefront_560/t/timhowan_560i.jpg.transform/cap-midres/image.jpg",
  "https://theprovidore.com/wp-content/uploads/2019/09/MG_1.jpg",
  "https://scontent.fsin10-1.fna.fbcdn.net/v/t1.6435-9/125040102_1079848082474285_4838640065639297853_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=frtcNjIBljQAX9G3YaC&_nc_ht=scontent.fsin10-1.fna&oh=00_AfASTuV76iEDNQDnHIpctxlW9RiHhDA9pSf2cJzTQfa0jw&oe=644CF740",
  "https://hawkerpedia.ewr1.vultrobjects.com/article/20230118/t4FIc1Ty7a4s_Kebabs%20Faktory%20%281%29.JPG",
  "https://i0.wp.com/ordinarypatrons.com/wp-content/uploads/2020/05/Megumi-Japanese-Restaurant-8.jpg?fit=644%2C483&ssl=1",
];

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    const list = await axios
      .get("https://recommenderpredictions.s3.amazonaws.com/predictions.csv")
      .then((response) => response.data)
      .then((v) => v.split("\n")[10].split(","))
      .catch((err) => console.log(err));
    setRecommendations(list);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <Container className="feed-container">
      <div>
        <h3>Recommended Restaurants</h3>
      </div>
      <div>
        <h6>Based on your food ratings, here is a specially-curated list of recommended restaurants just for you.</h6>
      </div>
      {recommendations.length > 0 && (
        <div>
          {recommendations.map((restaurantName, index) => (
            <CardRecommendations
              key={index}
              restaurantName={restaurantName}
              imageUrl={recommendationsImages[index]}
            />
          ))}
        </div>
      )}
    </Container>
  );
}

export default Recommendations;