import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../components/session/AuthContext';
import { useLocalSearchParams } from 'expo-router';

import { Box, Heading, Image, ImageBackground, View, Text, VStack } from '@gluestack-ui/themed';

import Spark from '../../components/Spark';
import VideoJS from '../../components/VideoJS'

export default function Page() {
  const [session, setSession] = useContext(AuthContext);
  const [movieData, setMovieData] = useState();
  const { id } = useLocalSearchParams();

  // initialize api engine
  const spark = new Spark(session);
  
  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      spark.getVODInfo(id)
      .then(data => {

        // http(s)://domain:port/movie/username/password/streamID.ext
        const streamUrl = `${spark.config.xcUrl}/movie/${spark.config.xcAuth.username}/${spark.config.xcAuth.password}/${data.movie_data.stream_id}.${data.movie_data.container_extension}`;
        
        data.movie_data.stream_url = streamUrl;

        setMovieData(data);
        console.log("Stream Data", data);
      });
    }
  }, [session]);

  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

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
      {(movieData) &&
        <View style={{
          display: 'block',
          width: '100%'
        }}>
          <ImageBackground
            source={{ uri: `${movieData.info.backdrop_path}` }}
            style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%', justifyContent: "center", width: '100%', position: "absolute", top: 0, aspectRatio: "16 / 9" }}
          >
            <Box grid='container'
              style={{ marginTop: '100px', background: 'rgba(0, 0, 0, 0.7)', paddingHorizontal: '30px', paddingVertical: '30px' }}
            >
              <Box grid='row'>
                <Box grid='col' columns='12'>
                  {/* <p><video src={movieData.movie_data.stream_url} type='video/x-matroska; codecs="theora, vorbis"' controls ></video></p> */}
                  <VideoJS options={{
                    autoplay: false,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    sources: [{
                      src: movieData.movie_data.stream_url,
                      type: 'video/mp4'
                    }]}}
                    onReady={handlePlayerReady} 
                  />
                </Box>
              </Box>
              <Box grid='row'>
                <Box grid='col' columns='12' columnsMd='3' sx={{ display: 'flex' }}>
                  <Image
                    borderRadius="$none"
                    alt={movieData.movie_data.name}
                    sx={{ width: '100%', height: 'auto', aspectRatio: '2/3' }}
                    source={{
                      uri: movieData.info.movie_image
                    }}
                  />
                </Box>
                <Box grid='col' columns='12' columnsMd='9'>
                  <Box grid='row'>
                    <Box grid='col' columns='12'>
                      <Heading size='3xl'>{movieData.movie_data.name}</Heading>
                      <VStack space="md" reversed={false}>
                        <Box><Text>Genre: {movieData.info.genre}</Text></Box>
                        <Box><Text>Runtime: {movieData.info.duration}</Text></Box>
                        <Box><Text>Rating: {movieData.info.rating} / 10</Text></Box>
                        <Box><Text>{movieData.movie_data.stream_url}</Text></Box>
                        <Box><Text>{movieData.info.plot}</Text></Box>
                        <Box><Text>Cast: {movieData.info.actors}</Text></Box>
                      </VStack>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ImageBackground>
        </View>
      }
    </>
  );
}