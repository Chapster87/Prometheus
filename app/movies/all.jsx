import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../components/session/AuthContext';
import { Box, Heading, Text, View } from '@gluestack-ui/themed';

import Spark from '../../components/Spark';

import MediaCard from '../../components/media/MediaCard';
import DummyCard from '../../components/dummies/DummyCard';

function Page() {
  const [session, setSession] = useContext(AuthContext);
  const [allMedia, setAllMedia] = useState();

  // initialize api engine
  const spark = new Spark(session);
  
  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      const useFiltered = true;
      spark.getAllMovies(useFiltered)
        .then(movies => {
          console.log(movies)
          setAllMedia(movies.data);
        });
    }
  }, [session]);

  return (
    <Box grid='container-fluid' className='vod-list'>
      <Box grid='row'>
        <Box grid='col' columns='12'>
          <Heading size='3xl'>All Movies</Heading>
        </Box>
      </Box>
      <Box grid='row'>
        {(allMedia) ?
          allMedia.slice(0, 50).map(media => {
              return (
                <View key={media.stream_id}>
                  {/* <Box><Text>{media.category_id}</Text></Box> */}
                  <MediaCard key={media.stream_id} streamType='movie' mediaID={media.stream_id} image={media.stream_icon} name={media.title} />
                </View>
              );
            })
        :
          [...Array(18)].map((elementInArray, index) => (
            <DummyCard key={index} />
          ))
        }
      </Box>
    </Box>
  );
}

export default Page;