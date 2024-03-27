import { useState, useEffect, useContext, useRef } from 'react';
import Head from 'expo-router/head';
import { AuthContext } from '../../components/session/AuthContext';
import { useLocalSearchParams, Link } from 'expo-router';
import { Box, Button, ButtonText, Heading, Icon, Image, ImageBackground, LinkText, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody,  ModalFooter, ModalCloseButton, CloseIcon, View, VStack, Text, Tabs, TabsTab, TabsTabTitle, TabsTabList, TabsTabPanel, TabsTabPanels, HStack } from '@gluestack-ui/themed';

import Spark from '../../components/Spark';
import { supabase } from '../../config/supabase'
import VideoJS from '../../components/VideoJS'
import { Clapperboard } from 'lucide-react-native';
import WatchedBadge from '../../components/media/WatchedBadge';

const MODAL_DEFAULT = {
  show: false,
  episodeURL: null
}

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useContext(AuthContext);
  const { id, type } = useLocalSearchParams(); 
  const [seriesData, setSeriesData] = useState();
  const [watchHistory, setWatchHistory] = useState();
  const [xcData, setXcData] = useState();
  const [xcEpisodes, setXcEpisodes] = useState();
  const [xcSeasons, setXcSeasons] = useState();
  const [showVideoModal, setShowVideoModal] = useState(MODAL_DEFAULT);

  // initialize api engine
  const spark = new Spark(session);
  
  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      if(type === 'tmdb') {
        spark.getTmdbSeries(id)
          .then(data => {
            setSeriesData(data);
            console.log("TMDB Data", data);
          });
      } else if(spark.config.xcUrl) {
        const fetchXcInfo = spark.getSeriesInfo(id)
          .then(data => {
            setXcData(data);
            const episodes = []
            for (const index in data.episodes) {
              episodes.push(data.episodes[index]);
            }
            setXcEpisodes(episodes);
            setXcSeasons(data.seasons);
            console.log('XC Data', data);
            return data;
          })
          .then(data => {
            return spark.searchTmdbSeries(data.info.title, data.info.year);
          });
        
        Promise.all([fetchXcInfo])
          .then((value) => {
            const tmdbID = value[0].id;
            if(tmdbID) {
              spark.getTmdbSeries(tmdbID)
                .then(data => {
                  setSeriesData(data);
                  console.log("XC TMDB Data", data);
                });
            }
          });
      }

      async function getWatchHistory() {
        setLoading(true);
        const { user } = session
  
        const { data, error } = await supabase
          .from('profiles')
          .select('watchHistorySeries')
          .eq('id', user.id)
          .single();
  
        if (error) {
          console.warn(error)
        } else if (data) {
          setWatchHistory(data.watchHistorySeries);
        }
      }
  
      getWatchHistory()
      setLoading(false);
    }
  }, [session]);

  async function updateHistory(event, ID) {
    setLoading(true);
    if (session) {
      const { user } = session
      let newHistory = null;

      console.log('ID', ID);
      console.log('history before', watchHistory);

      if(ID && event === 'ADD') {
        newHistory = [
          ...watchHistory,
          ID.toString()
        ];
      }

      if (ID && event === 'REMOVE') {
        newHistory = [...watchHistory];
        const toRemove = newHistory.indexOf(ID.toString());
        if (toRemove > -1) {
          newHistory.splice(toRemove, 1);
        }
      }

      console.log('newHistory', newHistory);

      const updates = {
        id: user.id,
        watchHistorySeries: newHistory,
        updated_at: new Date(),
      }

      async function updateDatabase() {
        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
          alert(error.message)
        } else {
          setWatchHistory(newHistory);
        }
      }

      updateDatabase();
    }

    setLoading(false);
  }

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
          <Head>
            <title>{`${seriesData.name} (${seriesData.first_air_date.substr(0,4)})`} | Prometheus</title>
          </Head>
          <View style={{
            display: 'block',
            width: '100%',
            marginTop: -90
          }}>
            <ImageBackground
              source={{ uri: `https://image.tmdb.org/t/p/original${seriesData.backdrop_path}`}}
              style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%', justifyContent: "flex-start", width: '100%', position: "absolute", top: 0, aspectRatio: "16 / 9" }}
            >
              <Box grid='container' style={{ marginTop: 130, background: 'rgba(0, 0, 0, 0.7)', padding: 30 }}>
                <Box grid="row">
                  <Box grid='col' columns='12' columnsMd='3'>
                    <Image
                      borderRadius="$none"
                      alt={seriesData.name}
                      sx={{ width: '100%', height: 'auto', aspectRatio: '2/3' }}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${seriesData.poster_path}`
                      }}
                    />
                  </Box>
                  <Box grid='col' columns='12' columnsMd='9'>
                    <Heading size='3xl'>{seriesData.name}</Heading>
                    <VStack space="md" reversed={false}>
                      <Box><Text>Genre(s):{' '}
                        {seriesData.genres.map((genre, index, genres) => {
                          let output = genre.name;
                          if (index + 1 !== genres.length) {
                            output += ', '
                          }
                          return output;
                        })}
                      </Text></Box>
                      <Box><Text>Rating: NEED</Text></Box>
                      <Box><Text>{seriesData.overview}</Text></Box>
                      <Box><Text>Cast: NEED</Text></Box>
                      {(seriesData.homepage) && <Box><Link href={seriesData.homepage} target={'_blank'} rel={'noopener noreferrer'}><LinkText>{seriesData.homepage}</LinkText></Link></Box>}
                    </VStack>
                  </Box>
                </Box>
                {(xcData && xcEpisodes && xcSeasons) &&
                  <Box grid="row">
                    <Box grid="col" columns='12'>
                      <Tabs defaultValue={`tab-1`}>
                        <TabsTabList>
                        {xcEpisodes.map((season, index) => {
                          let seasonIndex = xcData && xcData.episodes.length && xcEpisodes[0].length > 0 ? index : index + 1;
                          return (
                            <TabsTab value={`tab-${index}`} key={index}>
                              <TabsTabTitle color='$white'>
                                {(xcSeasons[seasonIndex] && xcSeasons[seasonIndex].name) ? `${xcSeasons[seasonIndex].name} (S${seasonIndex})` : `Season ${seasonIndex}`}
                              </TabsTabTitle>
                            </TabsTab>
                          )
                        })}
                        </TabsTabList>
                        <TabsTabPanels>
                          {xcEpisodes.map((season, index) => {
                            return (
                              <TabsTabPanel value={`tab-${index}`} key={index} sx={{ marginTop: 20 }}>
                                {xcEpisodes[index].map(episode => {
                                  // http(s)://domain:port/series/username/password/streamID.ext
                                  const episodeURL = `${spark.config.xcUrl}/series/${spark.config.xcAuth.username}/${spark.config.xcAuth.password}/${episode.id}.${episode.container_extension}`;
                                  return (
                                    <Box grid='row' key={episode.id} sx={{ marginBottom: 20 }}>
                                      <Box grid='col' columns='12' columnsMd='6' columnsLg='3'>
                                        {(episode.info.movie_image) ?
                                          <Image
                                            alt={episode.title}
                                            sx={{ width: '100%', height: 'auto', aspectRatio: '16/9', borderRadius: 4 }}
                                            source={{
                                              uri: episode.info.movie_image
                                            }}
                                          />
                                        :
                                          <Box sx={episodeVideoPlaceholder}>
                                            <Icon as={Clapperboard} sx={episodeVideoIcon} />
                                          </Box>
                                        }
                                        <HStack sx={{ position: 'static', justifyContent: 'space-between', alignItems: 'center' }}>
                                          {(watchHistory) &&
                                            <WatchedBadge watchHistory={watchHistory} mediaID={episode.id} updateHistory={updateHistory} loading={loading} />
                                          }
                                          <Button variant="gradient" onPress={() => handleShow(episodeURL)} ref={ref}>
                                            <ButtonText>Open Modal</ButtonText>
                                          </Button>
                                        </HStack>
                                        
                                      </Box>
                                      <Box grid='col' columns='12' columnsMd='6' columnsLg='9'>
                                        <Heading size='xl'>{episode.title}</Heading>
                                        <VStack space="md" reversed={false}>
                                          <Box><Text><strong>Runtime:</strong> {episode.info.duration}</Text></Box>
                                          <Box><Text><strong>Rating:</strong> <strong>{episode.info.rating}</strong> / 10</Text></Box>
                                          <Box><Text>{episodeURL}</Text></Box>
                                          <Box><Text>{episode.info.plot}</Text></Box>
                                        </VStack>
                                      </Box>
                                    </Box>
                                  )
                                })}
                              </TabsTabPanel>
                            )
                          })}
                        </TabsTabPanels>
                      </Tabs>
                    </Box>
                  </Box>
                }
              </Box>
            </ImageBackground>
          </View>
          <Modal
            isOpen={showVideoModal.show}
            onClose={() => handleClose()}
            finalFocusRef={ref}
            sx={{ position: 'fixed' }}
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

const episodeVideoPlaceholder = {
  width: '100%',
  height: 'auto',
  aspectRatio: '16/9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$warmGray800',
  borderRadius: 4
};

const episodeVideoIcon = {
  width: 50,
  height: 50,
  coilor: '$warmGray400'
}