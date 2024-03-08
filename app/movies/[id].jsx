import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Box, Heading, ImageBackground, View, Text, VStack } from '@gluestack-ui/themed';

import Spark from '../../components/Spark';
import VideoJS from '../../components/VideoJS'

// initialize api engine
const spark = new Spark();

export default function Page() {
  const [movieData, setMovieData] = useState();
  const { id } = useLocalSearchParams(); 
  
  useEffect(() => {
    spark.getVODInfo(id)
    .then(data => {

      // http(s)://domain:port/movie/username/password/streamID.ext
      const streamUrl = `${spark.config.baseUrl}/movie/${spark.config.auth.username}/${spark.config.auth.password}/${data.movie_data.stream_id}.${data.movie_data.container_extension}`;
      
      data.movie_data.stream_url = streamUrl;

      setMovieData(data);
      console.log("Stream Data", data);
    });
  }, []);

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
          width: '100%',
          height: '100vh',
        }}>
          <ImageBackground
            source={{ uri: `${movieData.info.backdrop_path}` }}
            style={{ flex: 1, justifyContent: "center" }}
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
                <Box grid='col' columns='12' columnsMd='3'>
                  <img src={movieData.info.movie_image} alt={movieData.movie_data.name} />
                </Box>
                <Box grid='col' columns='12' columnsMd='9'>
                  <Box grid='row'>
                    <Box grid='col' columns='12'>
                      <Heading size='3xl'>{movieData.movie_data.name}</Heading>
                      <VStack space="md" reversed={false}>
                        <Box><Text><strong>Genre:</strong> {movieData.info.genre}</Text></Box>
                        <Box><Text><strong>Runtime:</strong> {movieData.info.duration}</Text></Box>
                        <Box><Text><strong>Rating:</strong> <strong>{movieData.info.rating}</strong> / 10</Text></Box>
                        <Box><Text>{movieData.movie_data.stream_url}</Text></Box>
                        <Box><Text>{movieData.info.plot}</Text></Box>
                        <Box><Text><strong>Cast:</strong> {movieData.info.actors}</Text></Box>
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