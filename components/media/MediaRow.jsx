import { Dimensions } from "react-native";
import { Box, HStack, Heading } from '@gluestack-ui/themed';

import MediaCard from './MediaCard';

const { width, height } = Dimensions.get('window');

function MediaRow({ title, mediaData, rowPadding, xcEnabled, session }) {
  let defaultRowPadding = rowPadding ? rowPadding : '12';
  const cardWidth = (width / 10) - defaultRowPadding;

  return (
    ((mediaData) &&
      <>
        {title && <Heading size="3xl" sx={{ marginBottom: '$6' }}>{title}</Heading>}
        <HStack reversed={false} wrap={false} sx={{ maxWidth: '100vw', overflow: 'auto', gap: 12}}>
          {mediaData.map(media => {
            const isSeries = (media.media_type === 'tv');
            const mediaName = isSeries ? media.name : media.title;
            return (
              <Box key={media.id} sx={{ width: cardWidth }}>
                <MediaCard
                  mediaID={media.stream_id}
                  tmdbID={media.id}
                  streamType={media.media_type}
                  xcEnabled={xcEnabled}
                  name={mediaName}
                  image={`https://image.tmdb.org/t/p/w400${media.poster_path}`} 
                  session={session ? session : null}
                />
              </Box>
            );
          })}
        </HStack>
      </>
    )
  );
}

export default MediaRow;