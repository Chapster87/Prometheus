import { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { Box, Button, ButtonText, Heading } from '@gluestack-ui/themed';
const paginate = require('paginate-array');

import MediaCard from './MediaCard';
import DummyCard from '../dummies/DummyCard';

function MediaList({page, spark, session, catId, catName}) {
  const [VODCatData, setVODCatData] = useState();
  const [mediaData, setMediaData] = useState({ data: [], size: 50, page: 1, currPage: null });
  const [VodID, setVodID] = useState();

  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      if(page === 'Series') {
        // GET Series Streams
        spark.getSeriesStreams(catId)
          .then((series) => {
            setVODCatData(series)
            // console.log(series);
          });

      } else if (page === 'Movies') {
        // GET Movie Streams
        spark.getVODStreams(catId)
          .then(movies => {
            console.log(movies);
            const data = movies.data;
            // setVODCatData(movies.data)
            const { page, size } = mediaData;
            // const paginated = paginate(res.data, 2, 100);
            const currPage = paginate(data, page, size);
            console.log('currPage', currPage)
            setMediaData({ ...mediaData, data: movies.data, currPage: currPage }); 
          });
      }
    }
  }, [session])

  function previousPage() {
    const { currPage, page, size, data } = mediaData;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(data, newPage, size);

      setMediaData({ ...mediaData, page: newPage, currPage: newCurrPage });
    }
  }

  function nextPage() {
    const { currPage, page, size, data } = mediaData;

    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(data, newPage, size);
      console.log('newPage', newPage);
      setMediaData({ ...mediaData, page: newPage, currPage: newCurrPage });
    }
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
            {/* {(VODCatData) ?
              VODCatData.map(vod => {
                const isSeries = (vod.stream_type === 'series');
                const mediaID = isSeries ? vod.series_id : vod.stream_id;
                const mediaImg = isSeries ? vod.cover : vod.stream_icon;

                return (
                  <MediaCard key={mediaID} mediaID={mediaID} streamType={vod.stream_type} name={vod.name} image={mediaImg} />
                );
              })
            : */}
            {(mediaData && mediaData.currPage && mediaData.currPage.data) ?
              <>
                {mediaData.currPage.data.map(vod => {
                  const isSeries = (vod.stream_type === 'series');
                  const mediaID = isSeries ? vod.series_id : vod.stream_id;
                  const mediaImg = isSeries ? vod.cover : vod.stream_icon;

                  return (
                    <MediaCard key={mediaID} mediaID={mediaID} streamType={vod.stream_type} name={vod.name} image={mediaImg} />
                  );
                })}
                <Button onPress={previousPage}><ButtonText>Previous Page</ButtonText></Button>
                <Button onPress={nextPage}><ButtonText>Next Page</ButtonText></Button>
              </>
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

export default MediaList;