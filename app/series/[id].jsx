import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Box, Button, ButtonText, Heading, ImageBackground, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody,  ModalFooter, ModalCloseButton, Icon, CloseIcon, View, VStack, Text, Tabs, TabsTab, TabsTabTitle, TabsTabList, TabsTabPanel, TabsTabPanels } from '@gluestack-ui/themed';

import Spark from '../../components/Spark';
import VideoJS from '../../components/VideoJS'

// initialize api engine
const spark = new Spark();

const MODAL_DEFAULT = {
  show: false,
  episodeURL: null
}

export default function Page() {
  const { id } = useLocalSearchParams(); 
  const [seriesData, setSeriesData] = useState();
  const [showVideoModal, setShowVideoModal] = useState(MODAL_DEFAULT);
  
  useEffect(() => {
    spark.getSeriesInfo(id)
      .then(data => {
        setSeriesData(data);
        console.log('Page Data', data)
      });
  }, []);

  const handleClose = () => setShowVideoModal(prevState => {
    return {
      ...prevState,
      show: false,
      episodeURL: null
    }
  });

  const handleShow = (episodeURL) => setShowVideoModal(prevState => {
    return {
      ...prevState,
      show: true,
      episodeURL: episodeURL
    }
  });

  // const playerRef = useRef(null);
  const ref = useRef(null)

  const handlePlayerReady = (player) => {
    ref.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
      {/* May be better to define a dummy data object and then replace than checking to see if it's there and rendering on the second page load */}
      {(seriesData) &&
        <>
          <View style={{
            display: 'block',
            width: '100%',
            height: '100vh',
            backgroundImage: `url("${seriesData.info.backdrop_path}")`,
            backgroundSize: 'cover'
          }}>
            <Box grid='container' style={{ marginTop: '100px', background: 'rgba(0, 0, 0, 0.7)', padding:'30px' }}>
              <Box grid='row'>
                <Box grid='col' columns='12' columnsMd='3'>
                  <img src={seriesData.info.cover} alt={seriesData.info.name} />
                </Box>
                <Box grid='col' columns='12' columnsMd='9'>
                  <Box grid='row'>
                    <Box grid='col' columns='12'>
                      <Heading size='3xl'>{seriesData.info.name}</Heading>
                      <VStack space="md" reversed={false}>
                        {(seriesData.info.genre) && <Box><strong>Genre:</strong> {seriesData.info.genre}</Box>}
                        <Box><strong>Rating:</strong> <strong>{seriesData.info.rating}</strong> / 10</Box>
                        <Box>{seriesData.info.plot}</Box>
                        <Box><strong>Cast:</strong> {seriesData.info.cast}</Box>
                      </VStack>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box grid='row' mt='$8'>
                <Box grid='col' columns='12'>
                  <Tabs>
                    <TabsTabList>
                    {seriesData.seasons.map((season, index) => 
                      <TabsTab value={season.id} key={season.id}>
                        <TabsTabTitle color='$white'>{season.name}</TabsTabTitle>
                      </TabsTab>
                    )}
                    </TabsTabList>
                    <TabsTabPanels>
                      {seriesData.seasons.map((season, index) => 
                        <TabsTabPanel value={season.id} key={season.id}>
                          {(seriesData.episodes[index]) &&
                            seriesData.episodes[index].map(episode => {
                              // http(s)://domain:port/series/username/password/streamID.ext
                              const episodeURL = `${spark.config.baseUrl}/series/${spark.config.auth.username}/${spark.config.auth.password}/${episode.id}.${episode.container_extension}`;
                              return (
                                <Box grid='row' key={episode.id}>
                                  <Box grid='col' columns='12' columnsMd='6' columnsLg='3'>
                                    <img src={episode.info.movie_image} alt={episode.title} />
                                    <Button onPress={() => handleShow(episodeURL)} ref={ref}>
                                      <ButtonText>Show Modal</ButtonText>
                                    </Button>
                                  </Box>
                                  <Box grid='col' columns='12' columnsMd='6' columnsLg='9'>
                                    <Heading size='xl'>{episode.title}</Heading>
                                    <VStack space="md" reversed={false}>
                                      <Box><strong>Runtime:</strong> {episode.info.duration}</Box>
                                      <Box><strong>Rating:</strong> <strong>{episode.info.rating}</strong> / 10</Box>
                                      <Box>{episodeURL}</Box>
                                      <Box>{episode.info.plot}</Box>
                                    </VStack>
                                  </Box>
                                </Box>
                              )
                            }
                          )}
                        </TabsTabPanel>
                      )}
                    </TabsTabPanels>
                  </Tabs>
                </Box>
              </Box>
            </Box>
          </View>
          <Modal
            isOpen={showVideoModal.show}
            onClose={() => handleClose()}
            finalFocusRef={ref}
          >
            <ModalBackdrop />
            <ModalContent>
              <ModalHeader>
                <Heading size="lg">Video Title</Heading>
                <ModalCloseButton>
                  <Icon as={CloseIcon} />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <VideoJS options={{
                  autoplay: false,
                  controls: true,
                  responsive: true,
                  fluid: true,
                  sources: [{
                    src: showVideoModal.episodeURL,
                    type: 'video/mp4'
                  }]}}
                  onReady={handlePlayerReady} 
                />
              </ModalBody>
              <ModalFooter>
                <Button size="sm" action="positive" onPress={() => handleClose()}>
                  <ButtonText>Close</ButtonText>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      }
    </>
  );
}