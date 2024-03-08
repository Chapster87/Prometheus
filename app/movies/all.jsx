import { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { Box, Card, Heading } from '@gluestack-ui/themed';

import Spark from '../../components/Spark';
import ImgPlaceholder from '../../assets/images/svg/card-image.svg';

import VODCard from '../../components/vod/VODCard';

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
                <VODCard key={media.stream_id} streamType='movie' mediaID={media.stream_id} image={media.stream_icon} name={media.title} />
              );
            })
        :
          [...Array(18)].map((elementInArray, index) => (
            <Box grid='col' columns='12' columnsMd='4' columnsLg='3' columnsXl='2' style={{ display: 'flex', alignItems: "stretch"}} key={index}>
              <Card size="md" variant="elevated" m="$3">
                <Box style={{ ...styles.placeholderCardImg }} bg='$trueGray200' color='$trueGray500'>
                  <ImgPlaceholder width={120} height={40} />
                </Box>
              </Card>
            </Box>
          ))
        }
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  placeholderCardImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300
  }
});

export default Page;