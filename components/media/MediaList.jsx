import { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { Box, Button, ButtonText, Heading, Icon, Text } from '@gluestack-ui/themed';
import { ArrowLeft, ArrowLeftToLine, ArrowRight, ArrowRightToLine } from 'lucide-react-native';
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
            console.log(series);
            const data = series.data;
            // setVODCatData(series.data)
            const { page, size } = mediaData;
            const currPage = paginate(data, page, size);
            console.log('currPage', currPage)
            setMediaData({ ...mediaData, data: series.data, currPage: currPage });
          });

      } else if (page === 'Movies') {
        // GET Movie Streams
        spark.getVODStreams(catId)
          .then(movies => {
            console.log(movies);
            const data = movies.data;
            // setVODCatData(movies.data)
            const { page, size } = mediaData;
            const currPage = paginate(data, page, size);
            console.log('currPage', currPage)
            setMediaData({ ...mediaData, data: movies.data, currPage: currPage }); 
          });
      }
    }
  }, [session])

  function firstPage() {
    const { page, size, data } = mediaData;

    if (page !== 1) {
      const newPage = 1;
      const newCurrPage = paginate(data, newPage, size);

      setMediaData({ ...mediaData, page: newPage, currPage: newCurrPage });
    }
  }

  function previousPage() {
    const { page, size, data } = mediaData;

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

  function lastPage() {
    const { currPage, page, size, data } = mediaData;

    if (page !== currPage.totalPages) {
      const newPage = currPage.totalPages;
      const newCurrPage = paginate(data, newPage, size);

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
          <Box grid='row' sx={{ marginBottom: 30 }}>
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
              </>
            :
              [...Array(18)].map((elementInArray, index) =>
                <DummyCard key={index} />
              )
            }
          </Box>
          {(mediaData && mediaData.currPage && mediaData.currPage.data) &&
            <Box grid='row' sx={{ width: '100%', background: 'rgba(0, 0, 0, 0.6)', position: 'fixed', bottom: 0, paddingVertical: 14 }}>
              <Box grid='col' columns='12' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="gradient" onPress={firstPage} sx={{ marginRight: '$3' }}>
                  <Icon as={ArrowLeftToLine} sx={{ color: '$white', marginRight: '$2'}} />
                  <ButtonText>First</ButtonText>
                </Button>
                <Button variant="gradient" onPress={previousPage}>
                  <Icon as={ArrowLeft} sx={{ color: '$white', marginRight: '$2'}} />
                  <ButtonText>Previous Page</ButtonText>
                </Button>
                <Box sx={{ marginHorizontal: '$6' }}><Text>{mediaData.currPage.currentPage} / {mediaData.currPage.totalPages} | {mediaData.currPage.perPage} per page</Text></Box>
                <Button variant="gradient" onPress={nextPage}>
                  <ButtonText>Next Page</ButtonText>
                  <Icon as={ArrowRight} sx={{ color: '$white', marginLeft: '$2' }} />
                </Button>
                <Button variant="gradient" onPress={lastPage} sx={{ marginLeft: '$3' }}>
                  <ButtonText>Last</ButtonText>
                  <Icon as={ArrowRightToLine} sx={{ color: '$white', marginLeft: '$2' }} />
                </Button>
              </Box>
            </Box>
          }
        </Box>
      }
    </>
  )
}

export default MediaList;