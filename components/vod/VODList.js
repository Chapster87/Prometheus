import { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import ImgPlaceholder from '../../assets/images/svg/card-image.svg';

import MovieDetail from '../movies/MovieDetail';
import SeriesDetail from '../series/SeriesDetail';

function VODList({page, player, catData}) {
  const [VODCatData, setVODCatData] = useState();
  const [VODData, setVODData] = useState();

  console.log(catData);

  if(page === 'Series') {
    // GET Series Streams
    // player.getSeriesStreams(catData.category_id)
    // .then(console.log)
    // .catch(console.log)

    useEffect(() => {
      player.getSeriesStreams(catData.category_id)
      .then((data) => setVODCatData(data));
    }, []);

  } else if (page === 'Movies') {

    // GET Movie Streams
    // player.getVODStreams(catData.category_id)
    // .then(console.log)
    // .catch(console.log)

    useEffect(() => {
      player.getVODStreams(catData.category_id)
      .then((data) => setVODCatData(data));
    }, []);
  }

  function handleCategoryClick(vodData){
    setVODData(vodData);
  }

  return (
    <>
      {(!VODData) &&
        <Container fluid className='vod-list'>
          <Row>
            <Col>
              <h1>{page} - {catData.category_name}</h1>
            </Col>
          </Row>
          <Row>
            {(VODCatData) ?
              VODCatData.map(vod => {
                const isSeries = (vod.stream_type === 'series');
                
                return (
                  <Col xs='6' md='4' lg='3' xl='2' style={{ display: 'flex', alignItems: "stretch"}} key={isSeries ? vod.series_id : vod.stream_id}>
                    <Card
                      className={`media-tile movie`}
                      onClick={() => handleCategoryClick(vod)}>
                      <Card.Img variant="top" src={isSeries ? vod.cover : vod.stream_icon} loading="lazy"/>
                      <Card.Body>
                        <Card.Title className={`text-center`}>{vod.name}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            :
              [...Array(18)].map((elementInArray, index) => ( 
                <Col xs='6' md='4' lg='3' xl='2' style={{ display: 'flex', alignItems: "stretch"}}>
                  <Card className={`media-tile movie`}>
                    <div className={`card-img-top card-img-placeholder`}>
                      <ImgPlaceholder width={120} height={40} />
                    </div>
                    <Card.Body>
                      <Card.Title className={`text-center`}>
                          <Placeholder animation="glow">
                            <Placeholder xs={10} />
                          </Placeholder>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </Container>
      }

      {(VODData && page === 'Movies') && <MovieDetail player={player} vodWrapper={VODData} />}
      {(VODData && page === 'Series') && <SeriesDetail player={player} vodWrapper={VODData} />}
    </>
  )
}

export default VODList;