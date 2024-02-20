import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View} from 'react-native';
import VideoJS from '../VideoJS'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function VOD({player, vodWrapper}) {
  const [movieCategoryData, setMovieCategoryData] = useState(vodWrapper);
  const [movieData, setMovieData] = useState();

  // GET VOD Info
  // player.getVODInfo(movieCategoryData.stream_id) // This will get info such as video codecs, duration, description, directors for 1 VOD
  //   .then(console.log)
  //   .catch(console.log)

  useEffect(() => {
    player.getVODInfo(movieCategoryData.stream_id)
    .then(data => {

      // http(s)://domain:port/movie/username/password/streamID.ext
      const streamUrl = `${player.baseURL}/movie/${player.config.auth.username}/${player.config.auth.password}/${data.movie_data.stream_id}.${data.movie_data.container_extension}`;
      
      data.movie_data.stream_url = streamUrl;

      setMovieData(data);
      // console.log("Movie Data", movieData);
    });
  }, []);

  // function failed(e) {
  //   // video playback failed - show a message saying why
  //   switch (e.target.error.code) {
  //     case e.target.error.MEDIA_ERR_ABORTED:
  //       alert('You aborted the video playback.');
  //       break;
  //     case e.target.error.MEDIA_ERR_NETWORK:
  //       alert('A network error caused the video download to fail part-way.');
  //       break;
  //     case e.target.error.MEDIA_ERR_DECODE:
  //       alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
  //       break;
  //     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
  //       alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
  //       break;
  //     default:
  //       alert('An unknown error occurred.');
  //       break;
  //   }
  // }

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
  )
}

export default VOD;