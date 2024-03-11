import { useState, useEffect } from 'react';
import { Box, View } from "@gluestack-ui/themed";

import MediaHero from './media/MediaHero'
import MediaRow from './media/MediaRow'
import Spark from './Spark';
import DummyHero from './dummies/DummyHero';
import DummyRow from './dummies/DummyRow';

// initialize api engine
const spark = new Spark();

function App() {
  const [heroMedia, setHeroMedia] = useState();
  const [trendingMovies, setTrendingMovies] = useState();
  const [movieCount, setMovieCount] = useState();
  const [trendingSeries, setTrendingSeries] = useState();
  const [seriesCount, setSeriesCount] = useState();

  useEffect(() => {
    const fetchMovies = spark.getTrendingMovies()
      .then(response => {
        // console.log(response);
        setTrendingMovies(response);
        setMovieCount(response.length);
        return response;
      });

    const fetchSeries = spark.getTrendingSeries()
      .then(response => {
        // console.log(response);
        setTrendingSeries(response);
        setSeriesCount(response.length);
        return response;
      });

    Promise.all([fetchMovies, fetchSeries])
      .then((values) => {
        const allTrending = values[0].concat(values[1]);

        if (allTrending.length > 0) {
            const random = Math.floor(Math.random() * allTrending.length);
            const randomMedia = allTrending[random];
            setHeroMedia(randomMedia);
        }
      });
  }, []);

  return (
    <View sx={{ marginTop: -80 }}>
      {(heroMedia) ? <MediaHero heroMedia={heroMedia} /> : <DummyHero />}
      <Box grid="container-fluid">
        <Box grid="row">
          <Box grid="col" columns="12">
            {/* <TrendingMovies /> */}
            {(trendingMovies && movieCount) ? 
              <MediaRow title="Trending Movies" mediaData={trendingMovies} mediaCount={movieCount} mediaType='movies' />
            :
              <DummyRow title="Trending Movies" />
            }
          </Box>
        </Box>
        <Box grid="row">
          <Box grid="col" columns="12">
            {(trendingSeries && seriesCount) ?
              <MediaRow title="Trending Series" mediaData={trendingSeries} mediaCount={seriesCount} mediaType='series' />
            :
              <DummyRow title="Trending Series" />
            }
          </Box>
        </Box>
      </Box>
    </View>
  );
}

export default App;