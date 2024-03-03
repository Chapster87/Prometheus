import { useState, useEffect } from 'react';
import { Pressable } from "react-native";
import { Link } from 'expo-router';
import { GluestackUIProvider, Box, ImageBackground, View, Text } from '@gluestack-ui/themed';
import { config } from '../../config/gluestack-ui.config'

import Player from '../../components/Player';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import ImgPlaceholder from '../../assets/images/svg/card-image.svg';

import VODCard from '../../components/vod/VODCard';

// initialize player line api
const player = new Player();

export default function Page() {
  const [allMedia, setAllMedia] = useState();
  
  useEffect(() => {
    player.getVODStreams('X')
      .then(data => {
        setAllMedia(data);
        // console.log("All Movies", data);
      });
  }, []);

  function handleCardClick(mediaID){
    // Disabled for now - need to make each movie it's own route
    console.log("click");
    // setVodID(mediaID);
  }

  return (
    <GluestackUIProvider config={config}>
      <Box grid='container'>
        <Box grid='row'>
          <Box grid='col' columns='1'>
            <Link href="/" className={`btn btn-primary`} asChild>
              <Pressable>
                <Text>Home</Text>
              </Pressable>
            </Link>
          </Box>
        </Box>
      </Box>
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
                  <VODCard key={media.stream_id} mediaID={media.stream_id} image={media.stream_icon} name={media.title} onCardClick={handleCardClick} />
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
    </GluestackUIProvider>
  );
}