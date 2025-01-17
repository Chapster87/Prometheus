import { useState, useEffect } from 'react';
import Head from 'expo-router/head';
import { Box, View } from "@gluestack-ui/themed";
import { supabase } from '../config/supabase'

import MediaHero from './media/MediaHero'
import MediaRowTabs from './media/MediaRowTabs';
import Spark from './Spark';
import DummyHero from './dummies/DummyHero';

function App({ session }) {
  const [heroMedia, setHeroMedia] = useState();
  const [favGroups, setFavGroups] = useState();
  const [trendingGroups, setTrendingGroups] = useState();
  const [account, setAccount] = useState(session);

  // initialize api engine
  const spark = new Spark(session);

  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      setAccount(session);

      if (session) {
        async function getMediaMeta() {
          const { user } = session;
    
          const { data, error } = await supabase
            .from('media')
            .select(`favoritesMovies, favoritesSeries`)
            .eq('id', user.id)
            .single();
    
          if (error) {
            console.warn(error)
          } else if (data) {
            const fetchFavoriteSeries = spark.getTmdbSeriesGroup(data.favoritesSeries)
              .then(response => {
                // console.log('favoriteSeries', response);
                return response;
              });

            const fetchFavoriteMovies = spark.getTmdbMoviesGroup(data.favoritesMovies)
              .then(response => {
                // console.log('favoriteMovies', response);
                return response;
              });

            Promise.all([fetchFavoriteSeries, fetchFavoriteMovies])
              .then((values) => {
                if (values && values.length > 1 && values[0] && values[1]) {
                  const series = values[0];
                  const movies = values[1];
                  const favoriteGroups = [
                    {
                      id: 'favoriteSeries',
                      title: 'Favorite Series',
                      mediaData: []
                    },
                    {
                      id: 'favoriteMovies',
                      title: 'Favorite Movies',
                      mediaData: []
                    }
                  ];

                  if (series.length > 0) {
                    for (let i in series){
                      favoriteGroups[0].mediaData.push({
                        media_type: 'tv',
                        id: series[i].id,
                        name: series[i].name,
                        poster_path: series[i].poster_path
                      });
                    }
                  }

                  if (movies.length > 0) {
                    for (let j in movies){
                      favoriteGroups[1].mediaData.push({
                        media_type: 'movie',
                        id: movies[j].id,
                        title: movies[j].title,
                        poster_path: movies[j].poster_path
                      });
                    }
                  }

                  setFavGroups(favoriteGroups);
                }
              });
          }
        }
    
        getMediaMeta();
      }

      const fetchTrendingMovies = spark.getTrendingMovies()
        .then(response => {
          // console.log(response);
          return response;
        });

      const fetchTrendingSeries = spark.getTrendingSeries()
        .then(response => {
          // console.log(response);
          return response;
        });

      Promise.all([fetchTrendingMovies, fetchTrendingSeries])
        .then((values) => {
          if (values && values.length > 1 && values[0] && values[1]) {
            const allTrending = values[0].concat(values[1]);
            const random = Math.floor(Math.random() * allTrending.length);
            const randomMedia = allTrending[random];

            setHeroMedia(randomMedia);
            setTrendingGroups([
              {
                id: 'trendingSeries',
                title: 'Trending Series',
                mediaData: values[1]
              },
              {
                id: 'trendingMovies',
                title: 'Trending Movies',
                mediaData: values[0]
              }
            ]);
          }
        });
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Home | Prometheus</title>
      </Head>
      <View sx={{ marginTop: -90 }}>
        {(heroMedia) ? <MediaHero heroMedia={heroMedia} /> : <DummyHero />}
        <Box grid="container-fluid">
          <Box grid="row">
            <Box grid="col" columns="12">
              {(favGroups) &&
                <>
                  <MediaRowTabs
                    tabGroups={favGroups}
                    defaultTab='favoriteSeries'
                    xcEnabled={account.user.user_metadata.xcUrl}
                    session={session ? session : null}
                  />
                </>
              }
            </Box>
          </Box>
          <Box grid="row" sx={{ marginTop: 20 }}>
            <Box grid="col" columns="12">
              {(trendingGroups) &&
                <>
                  <MediaRowTabs
                    tabGroups={trendingGroups}
                    defaultTab='trendingSeries'
                    xcEnabled={account.user.user_metadata.xcUrl}
                    session={session ? session : null}
                  />
                </>
              }
            </Box>
          </Box>
        </Box>
      </View>
    </>
  );
}

export default App;