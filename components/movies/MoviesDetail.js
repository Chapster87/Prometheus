import { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function VOD({player, vodWrapper}) {
  const [movieCategoryData, setMovieCategoryData] = useState(vodWrapper);
  const [vodMovieData, setVodMovieData] = useState([]);
  const [vodInfoData, setVodInfoData] = useState([]);

  // GET VOD Info
  player.getVODInfo(movieCategoryData.stream_id) // This will get info such as video codecs, duration, description, directors for 1 VOD
    .then(console.log)
    .catch(console.log)

  useEffect(() => {
    player.getVODInfo(movieCategoryData.stream_id)
    .then((data) => setVodMovieData(data.movie_data));

    player.getVODInfo(movieCategoryData.stream_id)
    .then((data) => setVodInfoData(data.info));
  }, []);

  // function handleCategoryClick(event, vodData){
  //   event.preventDefault();
  // }

  console.log(player);

  const backdropImage = vodInfoData['backdrop_path']
  // http(s)://domain:port/movie/username/password/streamID.ext
  const movieURL = `${player.baseURL}/movie/${player.config.auth.username}/${player.config.auth.password}/${vodMovieData.stream_id}.${vodMovieData.container_extension}`;

  function failed(e) {
    // video playback failed - show a message saying why
    switch (e.target.error.code) {
      case e.target.error.MEDIA_ERR_ABORTED:
        alert('You aborted the video playback.');
        break;
      case e.target.error.MEDIA_ERR_NETWORK:
        alert('A network error caused the video download to fail part-way.');
        break;
      case e.target.error.MEDIA_ERR_DECODE:
        alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
        break;
      case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
        break;
      default:
        alert('An unknown error occurred.');
        break;
    }
  }

  return (
    <View style={{
      display: 'block',
      width: '100%',
      height: '100vh',
      backgroundImage: `url("${backdropImage}")`,
      backgroundSize: 'cover'
    }}>
      <Container style={{ marginTop: '100px', background: 'rgba(0, 0, 0, 0.7)', padding:'30px' }}>
        <Row>
          <Col>
            <p><video src={movieURL} type='video/x-matroska; codecs="theora, vorbis"' autoplay controls ></video></p>
          </Col>
        </Row>
        <Row >
          <Col xs='12' md='3'>
            <img src={vodInfoData.movie_image} alt={vodMovieData.name} />
          </Col>
          <Col xs='12' md='9'>
            <Row>
              <Col>
                <h1>{vodMovieData.name}</h1>
                <ul className={`unstyled mb-3`}>
                  <li><strong>Genre:</strong> {vodInfoData.genre}</li>
                  <li><strong>Runtime:</strong> {vodInfoData.duration}</li>
                  <li><strong>Rating:</strong> <strong>{vodInfoData.rating}</strong> / 10</li>
                  <li>{movieURL}</li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col>
              <p>{vodInfoData.plot}</p>
              </Col>
            </Row>
            <Row>
              <Col>
              <p><strong>Cast:</strong> {vodInfoData.actors}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </View>
  )
}


export default VOD;