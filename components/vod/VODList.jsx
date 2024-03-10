import { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { Box, Heading } from '@gluestack-ui/themed';

import MediaCard from '../media/MediaCard';
import DummyCard from '../dummies/DummyCard';

function VODList({page, spark, catId, catName}) {
  const [VODCatData, setVODCatData] = useState();
  const [VodID, setVodID] = useState();

  if(page === 'Series') {
    // GET Series Streams
    // spark.getSeriesStreams(catId)
    //   .then(console.log)
    //   .catch(console.log)

    useEffect(() => {
      spark.getSeriesStreams(catId)
        .then((data) => setVODCatData(data));
    }, []);

    // May need to also fetch move data for each to link tmdb id and create page based on that

  } else if (page === 'Movies') {

    useEffect(() => {
      // GET Movie Streams
      // spark.getVODStreams(catId)
      //   .then(data => console.log("VOD", data))
      //   .catch(console.log);
    
      spark.getVODStreams(catId)
        .then(data => setVODCatData(data));
    }, []);
  }

  return (
    <>
      {(!VodID) &&
        <Box grid='container-fluid'>
          <Box grid='row'>
            <Box grid='col' columns='12'>
              <Heading size='3xl'>{page} - {catName}</Heading>
            </Box>
          </Box>
          <Box grid='row'>
            {(VODCatData) ?
              VODCatData.map(vod => {
                const isSeries = (vod.stream_type === 'series');
                const mediaID = isSeries ? vod.series_id : vod.stream_id;
                const mediaImg = isSeries ? vod.cover : vod.stream_icon;

                return (
                  <MediaCard key={mediaID} mediaID={mediaID} streamType={vod.stream_type} name={vod.name} image={mediaImg} />
                );
              })
            :
              [...Array(18)].map((elementInArray, index) =>
                <DummyCard key={index} />
              )
            }
          </Box>
        </Box>
      }
    </>
  )
}

export default VODList;