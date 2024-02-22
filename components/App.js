import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import Player from './Player';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import TVGroups from './tv/TVGroups';
import VODCats from './vod/VODCats';
import TrendingMovies from './movies/TrendingMovies';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/scss/index.scss';

// initialize player line api
const player = new Player({
  baseUrl: process.env.EXPO_PUBLIC_XC_URL,
  // username and password of user line
  auth: {
    username: process.env.EXPO_PUBLIC_XC_USERNAME,
    password: process.env.EXPO_PUBLIC_XC_PASSWORD
  }
})

player.baseURL = process.env.EXPO_PUBLIC_XC_URL

function App() {
  const [activePage, setActivePage] = useState('Home');

  function clickHome() {
    setActivePage('Home');
  }

  function selectMedia(VodType) {
    setActivePage(VodType);
  }

  return (
    <>
      <StatusBar style="auto" />
      <div>
        <Container>
          <Row>
            <Col>
              {(activePage === 'Home') ?
                <>
                  <Button variant="primary" onClick={() => selectMedia('Live TV')}>Live TV</Button>
                  <Button variant="primary" onClick={() => selectMedia('Movies')}>Movies</Button>
                  <Button variant="primary" onClick={() => selectMedia('Series')}>Series</Button>
                  <Link href="/account" asChild>
                    <Button variant="primary">Account</Button>
                  </Link>
                </>
              :
                <Button variant="primary" onClick={clickHome}>Home</Button>
              }
            </Col>
          </Row>
        </Container>
        {(activePage === 'Home') &&
          <Container fluid>
            <Row>
              <Col><h1>Trending Movies</h1></Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <TrendingMovies />
                </Row>
              </Col>
            </Row>
          </Container>
        }
      </div>
      {(activePage === 'Live TV') && <TVGroups page={activePage} player={player} />}
      {(activePage === 'Movies' || activePage === 'Series') && <VODCats page={activePage} player={player} />}
    </>
  );
}

export default App;