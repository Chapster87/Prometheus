import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Player from '../../components/Player';
import VideoJS from '../../components/VideoJS'

// initialize player line api
const player = new Player();

export default function Page() {
  const [movieData, setMovieData] = useState();
  const { id } = useLocalSearchParams(); 
  
  useEffect(() => {
    player.getVODInfo(id)
    .then(data => {

      // http(s)://domain:port/movie/username/password/streamID.ext
      const streamUrl = `${player.config.baseUrl}/movie/${player.config.auth.username}/${player.config.auth.password}/${data.movie_data.stream_id}.${data.movie_data.container_extension}`;
      
      data.movie_data.stream_url = streamUrl;

      setMovieData(data);
      console.log("Stream Data", data);
    });
  }, []);

  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: '/path/to/video.mp4',
      type: 'video/mp4'
    }]
  };

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
    <>
      {/* May be better to define a dummy data object and then replace than checking to see if it's there and rendering on the second page load */}
      {(movieData) &&
        <View style={{
          display: 'block',
          width: '100%',
          height: '100vh',
          backgroundImage: `url("${movieData.info.backdrop_path}")`,
          backgroundSize: 'cover'
        }}>
          <Container style={{ marginTop: '100px', background: 'rgba(0, 0, 0, 0.7)', padding:'30px' }}>
            <Row>
              <Col>
                {/* <p><video src={movieData.movie_data.stream_url} type='video/x-matroska; codecs="theora, vorbis"' controls ></video></p> */}
                <VideoJS options={{
                  autoplay: false,
                  controls: true,
                  responsive: true,
                  fluid: true,
                  sources: [{
                    src: movieData.movie_data.stream_url,
                    type: 'video/mp4'
                  }]}}
                  onReady={handlePlayerReady} 
                />
              </Col>
            </Row>
            <Row >
              <Col xs='12' md='3'>
                <img src={movieData.info.movie_image} alt={movieData.movie_data.name} />
              </Col>
              <Col xs='12' md='9'>
                <Row>
                  <Col>
                    <h1>{movieData.movie_data.name}</h1>
                    <ul className={`unstyled mb-3`}>
                      <li><strong>Genre:</strong> {movieData.info.genre}</li>
                      <li><strong>Runtime:</strong> {movieData.info.duration}</li>
                      <li><strong>Rating:</strong> <strong>{movieData.info.rating}</strong> / 10</li>
                      <li>{movieData.movie_data.stream_url}</li>
                    </ul>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <p>{movieData.info.plot}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <p><strong>Cast:</strong> {movieData.info.actors}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </View>
      }
    </>
  );
}