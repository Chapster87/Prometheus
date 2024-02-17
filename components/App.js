import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Player from './Player';
import MovieCategories from './MovieCategories';
import Series from './Series';
import LiveTV from './LiveTV';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/scss/index.scss';

// Resources
// https://github.com/brunocarvalhodearaujo/xtream-codes
// https://github.com/4gray/iptvnator
// https://github.com/iptv-org/awesome-iptv
// https://github.com/gtaman92/XtreamCodesExtendAPI/tree/master

// For Live Streams the main format is
// http(s)://domain:port/live/username/password/streamID.ext ( In allowed_output_formats element you have the available ext )
// For VOD Streams the format is:
// http(s)://domain:port/movie/username/password/streamID.ext ( In target_container element you have the available ext )
// For Series Streams the format is
// http(s)://domain:port/series/username/password/streamID.ext ( In target_container element you have the available ext )

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

// const player = new Player({
//   baseUrl: '***REMOVED***',
//   // username and password of user line
//   auth: {
//     username: '***REMOVED***',
//     password: '***REMOVED***'
//   }
// })

// player.baseURL = '***REMOVED***'

// retrieve account line information
// player.getAccountInfo()
//   .then(console.log)
//   .catch(console.log)

// GET Live Stream Categories
// player.getLiveStreamCategory()
// .then(console.log)
// .catch(console.log)

// GET VOD Stream Categories
// player.getVODStreamCategories()
// .then(console.log)
// .catch(console.log)

// // GET LIVE Streams
// player.getLiveStreams(category) // (This will get All LIVE Streams in the selected category ONLY)
// .then(console.log)
// .catch(console.log)
// player.getLiveStreams('20810') // US | Kids
// .then(console.log)
// .catch(console.log)

// // GET VOD Streams 
// player.getVODStreams(category)
// .then(console.log)
// .catch(console.log)

// // GET VOD Info
// player.getVODInfo(id) // This will get info such as video codecs, duration, description, directors for 1 VOD
// .then(console.log)
// .catch(console.log)

// // GET short_epg for LIVE Streams (same as stalker portal, prints the next X EPG that will play soon)
// player.getEPGLivetreams(id, limit)
// .then(console.log)
// .catch(console.log)
// player.getEPGLivetreams('1461898', 0) // Cartoon Newtork
// .then(console.log)
// .catch(console.log)

// // GET ALL EPG for LIVE Streams (same as stalker portal, but it will print all epg listings regardless of the day)
// player.getEPGLivetreams(id)
// .then(console.log)
// .catch(console.log)

function App() {
  const [activePage, setActivePage] = useState('Home');

  function clickHome() {
    setActivePage('Home');
  }
  
  function clickMovies() {
    setActivePage('Movies');
  }

  function clickSeries() {
    setActivePage('Series');
  }

  function clickTV() {
    setActivePage('TV');
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
                  <Button variant="primary" onClick={clickMovies}>Movies</Button>
                  <Button variant="primary" onClick={clickSeries}>Series</Button>
                  <Button variant="primary" onClick={clickTV}>Live TV</Button>
                </>
              :
                <Button variant="primary" onClick={clickHome}>Home</Button>
              }
            </Col>
          </Row>
        </Container>
      </div>
      {(activePage === 'Movies') && <MovieCategories player={player} />}
      {(activePage === 'Series') && <Series player={player} />}
      {(activePage === 'TV') && <LiveTV player={player} />}
    </>
  );
}

export default App;