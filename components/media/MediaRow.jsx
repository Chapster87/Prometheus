import { Box, HStack, Heading } from '@gluestack-ui/themed';

import MediaCard from './MediaCard';

function MediaRow({ title, mediaData, mediaCount, mediaType}) {
  return (
    ((mediaData && mediaCount) &&
      <>
        {title && <Heading size="3xl" sx={headingSX}>{title}</Heading>}
        <HStack space="none" reversed={false} wrap={false}>
          {mediaData.map(media => {
            const isSeries = (mediaType === 'series');
            const mediaName = isSeries ? media.name : media.title;
            return (
              <MediaCard key={media.id} mediaID={media.stream_id} streamType={mediaType} name={mediaName} image={`https://image.tmdb.org/t/p/w400${media.poster_path}`} />
            );
          })}
        </HStack>
      </>
    )
  );
}

const headingSX = {
  marginBottom: '$6'
}

export default MediaRow;