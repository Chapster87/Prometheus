import { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import MoviesVOD from './MoviesDetail';

function MoviesList({player, catData}) {
  const [movieCategoryData, setMovieCategoryData] = useState([]);
  const [VODData, setVODData] = useState();

  // GET VOD Streams
  // player.getVODStreams(catData.category_id)
  // .then(console.log)
  // .catch(console.log)

  useEffect(() => {
    player.getVODStreams(catData.category_id)
    .then((data) => setMovieCategoryData(data));
  }, []);

  function handleCategoryClick(event, vodData){
    event.preventDefault();

    setVODData(vodData);
  }

  return (
    <>
      {(!VODData) &&
        <Container fluid>
          <Row>
            <Col>
              <h1>Movies - {catData.category_name}</h1>
            </Col>
          </Row>
          <Row>
              {movieCategoryData.map(vod =>
                <Col xs='6' md='4' lg='3' xl='2' style={{ display: 'flex', alignItems: "stretch"}} key={vod.stream_id}>
                  <Card
                    className={`media-tile movie`}
                    onClick={(event) => handleCategoryClick(event, vod)}>
                    <Card.Img variant="top" src={vod.stream_icon} loading="lazy"/>
                    <Card.Body>
                      <Card.Title className={`text-center`}>{vod.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              )}
          </Row>
        </Container>
      }

      {(VODData) && <MoviesVOD player={player} vodWrapper={VODData} />}
    </>
  )
}

export default MoviesList;