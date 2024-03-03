import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { GluestackUIProvider, Box, ImageBackground, View, Text } from '@gluestack-ui/themed';
import { config } from '../../config/gluestack-ui.config'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Spark from '../../components/Spark';
import VideoJS from '../../components/VideoJS'

// initialize api engine
const spark = new Spark();

const MODAL_DEFAULT = {
  show: false,
  episodeURL: null
}

export default function Page() {
  const { id } = useLocalSearchParams(); 
  const [seriesData, setSeriesData] = useState();
  const [showVideoModal, setShowVideoModal] = useState(MODAL_DEFAULT);
  
  useEffect(() => {
    spark.getSeriesInfo(id)
      .then(data => {
        setSeriesData(data);
        console.log('Page Data', data)
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

  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <GluestackUIProvider config={config}>
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
            <Box grid='container' style={{ marginTop: '100px', background: 'rgba(0, 0, 0, 0.7)', padding:'30px' }}>
              <Box grid='row'>
                <Box grid='col' columns='12' columnsMd='3'>
                  <img src={seriesData.info.cover} alt={seriesData.info.name} />
                </Box>
                <Box grid='col' columns='12' columnsMd='9'>
                  <Box grid='row'>
                    <Box grid='col' columns='12'>
                      <h1>{seriesData.info.name}</h1>
                      <ul className={`unstyled mb-3`}>
                        {(seriesData.info.genre) && <li><strong>Genre:</strong> {seriesData.info.genre}</li>}
                        <li><strong>Rating:</strong> <strong>{seriesData.info.rating}</strong> / 10</li>
                      </ul>
                    </Box>
                  </Box>
                  <Box grid='row'>
                    <Box grid='col' columns='12'>
                      <p>{seriesData.info.plot}</p>
                    </Box>
                  </Box>
                  <Box grid='row'>
                    <Box grid='col' columns='12'>
                      <p><strong>Cast:</strong> {seriesData.info.cast}</p>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box grid='row' mt='$8'>
                <Box grid='col' columns='12'>
                  <Tabs
                    defaultActiveKey="1"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    {seriesData.seasons.map((season, index) => 
                      <Tab eventKey={season.season_number} title={season.name} key={season.id}>
                        {(seriesData.episodes[index]) &&
                          seriesData.episodes[index].map(episode => {
                              // http(s)://domain:port/series/username/password/streamID.ext
                              const episodeURL = `${spark.config.baseUrl}/series/${spark.config.auth.username}/${spark.config.auth.password}/${episode.id}.${episode.container_extension}`;
                            return (
                              <Box grid='row' key={episode.id}>
                                <Box grid='col' columns='12' columnsMd='6' columnsLg='3'>
                                  <img src={episode.info.movie_image} alt={episode.title} />
                                  <Button variant="primary" onClick={() => handleShow(episodeURL)}>
                                    Play Episode
                                  </Button>
                                </Box>
                                <Box grid='col' columns='12' columnsMd='6' columnsLg='9'>
                                  <h3>{episode.title}</h3>
                                  <ul className={`unstyled mb-3`}>
                                    <li><strong>Runtime:</strong> {episode.info.duration}</li>
                                    <li><strong>Rating:</strong> <strong>{episode.info.rating}</strong> / 10</li>
                                    <li>{episodeURL}</li>
                                  </ul>
                                  <p>{episode.info.plot}</p>
                                </Box>
                              </Box>
                            )
                          }
                        )}
                      </Tab>
                    )}
                  </Tabs>
                </Box>
              </Box>
            </Box>
          </View>
          <Modal show={showVideoModal.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <VideoJS options={{
                autoplay: false,
                controls: true,
                responsive: true,
                fluid: true,
                sources: [{
                  src: showVideoModal.episodeURL,
                  type: 'video/mp4'
                }]}}
                onReady={handlePlayerReady} 
              />
            </Modal.Body>
          </Modal>
        </>
      }
    </GluestackUIProvider>
  );
}