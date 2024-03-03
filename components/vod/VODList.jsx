import { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { GluestackUIProvider, Box, Text } from '@gluestack-ui/themed';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import ImgPlaceholder from '../../assets/images/svg/card-image.svg';

import VODCard from '../vod/VODCard';

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
              <h1>{page} - {catName}</h1>
            </Box>
          </Box>
          <Box grid='row'>
            {(VODCatData) ?
              VODCatData.map(vod => {
                const isSeries = (vod.stream_type === 'series');
                const mediaID = isSeries ? vod.series_id : vod.stream_id;
                const mediaImg = isSeries ? vod.cover : vod.stream_icon;

                return (
                  <VODCard key={mediaID} mediaID={mediaID} streamType={vod.stream_type} name={vod.name} image={mediaImg} />
                );
              })
            :
              [...Array(18)].map((elementInArray, index) => ( 
                <Box grid='col' columns='6' columnsMd='4' columnsLg='3' columnsXl='2' style={{ display: 'flex', alignItems: "stretch"}} key={index}>
                  <Card>
                    <div style={{ ...styles.placeholderCardImg }} bg='$trueGray200' color='$trueGray500'>
                      <ImgPlaceholder width={120} height={40} />
                    </div>
                    <Card.Body>
                      <Card.Title>
                          <Placeholder animation="glow">
                            <Placeholder xs={10} />
                          </Placeholder>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Box>
              ))
            }
          </Box>
        </Box>
      }
    </>
  )
}

const styles = StyleSheet.create({
  placeholderCardImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300
  }
});

export default VODList;