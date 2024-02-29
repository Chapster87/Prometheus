import { Pressable } from "react-native";
import { Link } from 'expo-router';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function VODCard({ mediaID, streamType, name, image }) {

  const isSeries = (streamType === 'series');
  const mediaType = isSeries ? 'series' : 'movies';

  return (
    <Col xs='6' md='4' lg='3' xl='2' key={mediaID}>
      
      {(mediaID) ?
        <Link href={`/${mediaType}/${mediaID}`} className={`vod-link`} asChild>
          <Pressable>
            <Card
              className={`vod-card`}
            >
              <Card.Img variant="top" src={image} loading="lazy"/>
              <Card.Body>
                <Card.Title className={`text-center`}>{name}</Card.Title>
              </Card.Body>
            </Card>
          </Pressable>
        </Link>
      :
      <Card
        className={`vod-card`}
      >
        <div className={`vod-badge`}>Coming Soon!</div>
        <Card.Img variant="top" src={image} loading="lazy"/>
        <Card.Body>
          <Card.Title className={`text-center`}>{name}</Card.Title>
        </Card.Body>
      </Card>
      }
    </Col>
  );
}

export default VODCard;