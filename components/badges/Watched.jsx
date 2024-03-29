import { Badge, BadgeText, Button, ButtonText, LinkText, Pressable, Text } from '@gluestack-ui/themed';

function WatchedBadge({ watchHistory, mediaID, updateMediaMeta, loading, mediaType }) {
  return (
    <>
      {(mediaID && watchHistory && watchHistory.includes(mediaID.toString())) ?
        <>
          <Badge sx={watchedBadge} size="lg">
            <BadgeText sx={badgeText} color="$white">Watched</BadgeText>
          </Badge>
          <Pressable onPress={() => updateMediaMeta('UNWATCH', mediaID)}>
            <LinkText>{loading ? 'Loading ...' : 'Mark Unwatched'}</LinkText>
          </Pressable>
        </>
        :
        <Pressable onPress={() => updateMediaMeta('WATCHED', mediaID)}>
          <LinkText>{loading ? 'Loading ...' : 'Mark Watched'}</LinkText>
        </Pressable>
      }
    </>
  );
}

const watchedBadge = {
  position: "absolute",
  top: 16,
  left: 12,
  paddingVertical: 5,
  paddingHorizontal: 12,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '$success300',
  backgroundColor: '$success600',
  zIndex: 10
}

const badgeText = {
  fontSize: 16,
  fontWeight: 700
}

export default WatchedBadge;