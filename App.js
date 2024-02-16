import { Component, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Player from './components/Player';
import Movies from './components/Movies';
import Series from './components/Series';
import LiveTV from './components/LiveTV';

import './index.css';

// Resources
// https://github.com/brunocarvalhodearaujo/xtream-codes
// https://github.com/4gray/iptvnator
// https://github.com/iptv-org/awesome-iptv
// https://github.com/gtaman92/XtreamCodesExtendAPI/tree/master

// initialize player line api
const player = new Player({
  baseUrl: 'http://the.url.com:port',
  // username and password of user line
  auth: {
    username: 'admin',
    password: 'password'
  }
})

player.baseURL = 'http://the.url.com:port'

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
    <View style={styles.container}>
      <StatusBar style="auto" />
      {(activePage === 'Home') ? 
        <>
          <button onClick={clickMovies}>Movies</button>
          <button onClick={clickSeries}>Series</button>
          <button onClick={clickTV}>Live TV</button>
        </>
        :
        <button onClick={clickHome}>Home</button>
      }
      {(activePage === 'Movies') && <Movies player={player}></Movies>}
      {(activePage === 'Series') && <Series player={player}></Series>}
      {(activePage === 'TV') && <LiveTV player={player}></LiveTV>}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default App;