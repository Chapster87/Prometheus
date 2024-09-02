import { useState, useEffect } from 'react';
import Head from 'expo-router/head';
import { Box, View } from "@gluestack-ui/themed";

import MediaHero from './media/MediaHero'
import MediaRowTabs from './media/MediaRowTabs';
import Spark from './Spark';
import DummyHero from './dummies/DummyHero';

function App({ session }) {
  const [heroMedia, setHeroMedia] = useState();
  const [trendingGroups, setTrendingGroups] = useState();
  const [account, setAccount] = useState(session);

  // initialize api engine
  const spark = new Spark(session);

  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      setAccount(session);
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

            console.log(allTrending);
  
            setHeroMedia(randomMedia);
            setTrendingGroups([
              {
                id: 'trendingMovies',
                title: 'Trending Movies',
                mediaData: values[0]
              }, 
              {
                id: 'trendingSeries',
                title: 'Trending Series',
                mediaData: values[1]
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
              {(trendingGroups) &&
                <>
                  <MediaRowTabs
                    tabGroups={trendingGroups}
                    defaultTab='trendingMovies'
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
                    defaultTab='trendingMovies'
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