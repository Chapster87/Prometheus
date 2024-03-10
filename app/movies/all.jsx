import { useState, useEffect } from 'react';
import { Box, Heading } from '@gluestack-ui/themed';

import Spark from '../../components/Spark';

import MediaCard from '../../components/media/MediaCard';
import DummyCard from '../../components/dummies/DummyCard';

// initialize api engine
const spark = new Spark();

function Page() {
  const [allMedia, setAllMedia] = useState();
  
  useEffect(() => {
    spark.getVODStreams('X')
      .then(data => {
        setAllMedia(data);
      });
  }, []);

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
                <MediaCard key={media.stream_id} streamType='movie' mediaID={media.stream_id} image={media.stream_icon} name={media.title} />
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