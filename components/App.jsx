import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GluestackUIProvider, Box, Text } from "@gluestack-ui/themed"
import { config } from '../config/gluestack-ui.config'
import { Link, LinkText } from "@gluestack-ui/themed"
import Button from 'react-bootstrap/Button';

import Spark from './Spark';
import TVGroups from './tv/TVGroups';
import VODCats from './vod/VODCats';
import TrendingMovies from './movies/TrendingMovies';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/scss/index.scss';

// initialize api engine
const spark = new Spark();

function App() {
  const [activePage, setActivePage] = useState('Home');

  function clickHome() {
    setActivePage('Home');
  }

  function selectMedia(VodType) {
    setActivePage(VodType);
  }

  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="auto" />
      <div>
        <Box grid='container'>
          <Box grid='row'>
            <Box grid='col' columns='12'>
              {(activePage === 'Home') ?
                <>
                  <Button variant="primary" onClick={() => selectMedia('Live TV')}>Live TV</Button>
                  <Button variant="primary" onClick={() => selectMedia('Movies')}>Movies</Button>
                  <Button variant="primary" onClick={() => selectMedia('Series')}>Series</Button>
                  <Link href="/account">
                    <LinkText size="lg">Account</LinkText>
                  </Link>
                </>
              :
                <Button variant="primary" onClick={clickHome}>Home</Button>
              }
            </Box>
          </Box>
        </Box>
        {(activePage === 'Home') &&
          <>
            <Box grid='container-fluid'>
              <Box grid='row'>
                <Box grid='col' columns='12'><h1>Trending Movies</h1></Box>
              </Box>
            </Box>
            <TrendingMovies />
          </>
        }
      </div>
      {(activePage === 'Live TV') && <TVGroups page={activePage} spark={spark} />}
      {(activePage === 'Movies' || activePage === 'Series') && <VODCats page={activePage} spark={spark} />}
    </GluestackUIProvider>
  );
}

export default App;