import { useState, useEffect } from 'react';
import { Box } from '@gluestack-ui/themed';

import Spark from '../../components/Spark';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import ImgPlaceholder from '../../assets/images/svg/card-image.svg';

import VODCard from '../../components/vod/VODCard';

// initialize api engine
const spark = new Spark();

export default function Page() {
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
          <h1>All Movies</h1>
        </Box>
      </Box>
      <Box grid='row'>
        {(allMedia) ?
          allMedia.slice(0, 50).map(media => {
              return (
                <VODCard key={media.stream_id} mediaID={media.stream_id} image={media.stream_icon} name={media.title} />
              );
            })
        :
          [...Array(18)].map((elementInArray, index) => (
            <Box grid='col' columns='12' columnsMd='4' columnsLg='3' columnsXl='2' style={{ display: 'flex', alignItems: "stretch"}} key={index}>
              <Card className={`vod-card movie`}>
                <div className={`card-img-top card-img-placeholder`}>
                  <ImgPlaceholder width={120} height={40} />
                </div>
                <Card.Body>
                  <Card.Title className={`text-center`}>
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
  );
}