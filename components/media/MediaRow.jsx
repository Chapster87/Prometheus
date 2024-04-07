import { Dimensions } from "react-native";
import { Box, HStack, Heading } from '@gluestack-ui/themed';

import MediaCard from './MediaCard';

const { width, height } = Dimensions.get('window');
const cardWidth = (width / 6) - 12;

function MediaRow({ title, mediaData, mediaType, xcEnabled }) {
  return (
    ((mediaData) &&
      <>
        {title && <Heading size="3xl" sx={{ marginBottom: '$6' }}>{title}</Heading>}
        <HStack reversed={false} wrap={false} sx={{ maxWidth: '100vw', overflow: 'auto', marginBottom: '$8', gap: 12}}>
          {mediaData.map(media => {
            const isSeries = (mediaType === 'series');
            const mediaName = isSeries ? media.name : media.title;
            return (
              <Box key={media.id} sx={{ width: cardWidth }}>
                <MediaCard mediaID={media.stream_id} tmdbID={media.id} streamType={mediaType} xcEnabled={xcEnabled} name={mediaName} image={`https://image.tmdb.org/t/p/w400${media.poster_path}`} />
              </Box>
            );
          })}
        </HStack>
      </>
    )
  );
}

export default MediaRow;