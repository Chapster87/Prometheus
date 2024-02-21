import { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import ImgPlaceholder from '../../assets/images/svg/card-image.svg';

import VODCard from '../vod/VODCard';
import MovieDetail from '../movies/MovieDetail';
import SeriesDetail from '../series/SeriesDetail';

function VODList({page, player, catData}) {
  const [VODCatData, setVODCatData] = useState();
  const [VodID, setVodID] = useState();
  const [movieData, setMovieData] = useState();

  if(page === 'Series') {
    // GET Series Streams
    // player.getSeriesStreams(catData.category_id)
    // .then(console.log)
    // .catch(console.log)

    useEffect(() => {
      player.getSeriesStreams(catData.category_id)
        .then((data) => setVODCatData(data));
    }, []);

    // May need to also fetch move data for each to link tmdb id and create page based on that

  } else if (page === 'Movies') {

    // GET Movie Streams
    player.getVODStreams(catData.category_id)
    .then(console.log)
    .catch(console.log)

    useEffect(() => {
      player.getVODStreams(catData.category_id)
        .then(data => {
          setVODCatData(data);
        });

      // player.getVODInfo(VODCatData.stream_id)
      //   .then(data => {
      //     setMovieData(data);
      //     console.log("Move Data from List", data)
      //   });
      
    }, []);
  }

  function handleCardClick(mediaID){
    setVodID(mediaID);
  }

  return (
    <>
      {(!VodID) &&
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
                const mediaID = isSeries ? vod.series_id : vod.stream_id;
                const mediaImg = isSeries ? vod.cover : vod.stream_icon

                return (
                  <VODCard key={mediaID} mediaID={mediaID} image={mediaImg} name={vod.name} onCardClick={handleCardClick} />
                );
              })
            :
              [...Array(18)].map((elementInArray, index) => ( 
                <Col xs='6' md='4' lg='3' xl='2' style={{ display: 'flex', alignItems: "stretch"}}>
                  <Card className={`vod-card movie`}>
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

      {(VodID && page === 'Movies') && <MovieDetail player={player} streamID={VodID} />}
      {(VodID && page === 'Series') && <SeriesDetail player={player} seriesID={VodID} />}
    </>
  )
}

export default VODList;