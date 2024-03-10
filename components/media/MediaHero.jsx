import { useState } from 'react';
import { Box, Button, ButtonText, HStack,  Heading, Icon, ImageBackground, Link, Text } from '@gluestack-ui/themed';
import { Clapperboard, Library, TrendingUp } from 'lucide-react-native';

function VODHero({ heroMedia }) {
  const [media, setMedia] = useState(heroMedia);
  const [mediaType, setMediaType] = useState(heroMedia.media_type === 'movie' ? 'Movie' : 'Series'); 

  return (
    (media && mediaType) &&
    <Box w="100%" sx={{ aspectRatio: "21 / 9" }}>
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/original${media.backdrop_path}` }}
        style={{ flex: 1, justifyContent: "center", width: '100%', position: "absolute", top: 0, aspectRatio: "16 / 9" }}
      >
        <Box grid="container-fluid">
          <Box grid="row">
            <Box grid="col" columns="5">
              <Box sx={{
                backgroundColor: '#171717c0',
                padding: '$6 $4',
                borderRadius: '$sm',
                alignItems: 'flex-start',
                marginBottom: 100
              }}>
                <Text sx={{ display: 'flex', alignItems: 'center', color: '$white', fontSize: '$lg', textTransform: 'uppercase', fontWeight: '$bold' }}>
                  <Icon as={TrendingUp} sx={{ color: '$primary0', marginRight: '$1' }} /> Trending {mediaType}
                </Text>
                <Heading
                  size="4xl"
                  color="$white"
                  fontWeight="$bold"
                  lineHeight="1.1"
                  textAlign="left"
                  marginBottom="$4"
                >
                  {mediaType === 'Movie' ? media.title : media.name}
                </Heading>
                <Text sx={{ marginBottom: '$8' }}>{media.overview}</Text>
                {(media.stream_id) ? 
                  <HStack>
                    <Link href={`/${mediaType === 'Movie' ? 'movies' : 'series'}/${media.stream_id}`}>
                      <Button action="primary">
                        <Icon as={Clapperboard} sx={{ color: '$white', marginRight: '$2' }} />
                        <ButtonText>Watch Now</ButtonText>
                      </Button>
                    </Link>
                    <Link href={`/${mediaType === 'Movie' ? 'movies' : 'series'}/${media.stream_id}`} sx={{ marginLeft: '$4' }}>
                      <Button variant="outline" action="primary" sx={{ backgroundColor: '$white', borderWidth: 2 }}>
                        <Icon as={Library} sx={{ color: '$primary300', marginRight: '$2' }} />
                        <ButtonText>{mediaType} Info</ButtonText>
                      </Button>
                    </Link>
                  </HStack>
                :
                  <Text>Coming Soon</Text>
                }
              </Box>
            </Box>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
}

export default VODHero;