import { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MODAL_DEFAULT = {
  show: false,
  episodeURL: null
}

function VOD({player, vodWrapper}) {
  const [seriesCatData, setSeriesCatData] = useState(vodWrapper);
  const [seriesData, setSeriesData] = useState();
  const [showVideoModal, setShowVideoModal] = useState(MODAL_DEFAULT);

  // GET VOD Info
  player.getSeriesInfo(seriesCatData.series_id) // This will get info such as video codecs, duration, description, directors for 1 VOD
    .then(console.log)
    .catch(console.log)

  useEffect(() => {
    player.getSeriesInfo(seriesCatData.series_id)
      .then(data => {
        // Alot of series have a season 0 for "specials", but episode data doesn't seem to have an season 0
        if (!data.episodes[0]) {
          // Determines if there are episodes for "Season 0",
          // if not, it removes "Season 0" and saves it
          const season0 = data.seasons.shift();
        }

        setSeriesData(data);
        // console.log("Data", seriesData);
      });
  }, []);

  const handleClose = () => setShowVideoModal(prevState => {
    return {
      ...prevState,
      show: false,
      episodeURL: null
    }
  });
  const handleShow = (episodeURL) => setShowVideoModal(prevState => {
    return {
      ...prevState,
      show: true,
      episodeURL: episodeURL
    }
  });

  return (
    <>
      {/* May be better to define a dummy data object and then replace than checking to see if it's there and rendering on the second page load */}
      {(seriesData) &&
        <>
          <View style={{
            display: 'block',
            width: '100%',
            height: '100vh',
            backgroundImage: `url("${seriesData.info.backdrop_path}")`,
            backgroundSize: 'cover'
          }}>
            <Container style={{ marginTop: '100px', background: 'rgba(0, 0, 0, 0.7)', padding:'30px' }}>
              <Row >
                <Col xs='12' md='3'>
                  <img src={seriesData.info.cover} alt={seriesData.info.name} />
                </Col>
                <Col xs='12' md='9'>
                  <Row>
                    <Col>
                      <h1>{seriesData.info.name}</h1>
                      <ul className={`unstyled mb-3`}>
                        {(seriesData.info.genre) && <li><strong>Genre:</strong> {seriesData.info.genre}</li>}
                        <li><strong>Rating:</strong> <strong>{seriesData.info.rating}</strong> / 10</li>
                      </ul>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <p>{seriesData.info.plot}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <p><strong>Cast:</strong> {seriesData.info.cast}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className={`mt-5`}>
                <Col>
                  <Tabs
                    defaultActiveKey="1"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    {seriesData.seasons.map(season => 
                      <Tab eventKey={season.season_number} title={season.name} key={season.id}>
                        {seriesData.episodes[season.season_number].map(episode => {
                            // http(s)://domain:port/series/username/password/streamID.ext
                            const episodeURL = `${player.baseURL}/series/${player.config.auth.username}/${player.config.auth.password}/${episode.id}.${episode.container_extension}`;
                          return (
                            <Row key={episode.id}>
                              <Col xs='12' md='6' lg='3'>
                                <img src={episode.info.movie_image} alt={episode.title} />
                                <Button variant="primary" onClick={() => handleShow(episodeURL)}>
                                  Play Episode
                                </Button>
                              </Col>
                              <Col xs='12' md='6' lg='9'>
                                <h3>{episode.title}</h3>
                                <ul className={`unstyled mb-3`}>
                                  <li><strong>Runtime:</strong> {episode.info.duration}</li>
                                  <li><strong>Rating:</strong> <strong>{episode.info.rating}</strong> / 10</li>
                                  <li>{episodeURL}</li>
                                </ul>
                                <p>{episode.info.plot}</p>
                              </Col>
                            </Row>
                          )
                        })}
                      </Tab>
                    )}
                  </Tabs>
                </Col>
              </Row>
            </Container>
          </View>
          <Modal show={showVideoModal.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><video src={showVideoModal.episodeURL} type='video/x-matroska; codecs="theora, vorbis"' controls ></video></p>
            </Modal.Body>
          </Modal>
        </>
      }
    </>
  )
}

export default VOD;