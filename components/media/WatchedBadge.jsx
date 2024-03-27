import { Badge, BadgeText, Button, ButtonText, LinkText, Pressable, Text } from '@gluestack-ui/themed';

function WatchedBadge({ watchHistory, mediaID, updateHistory, loading }) {
  return (
    (watchHistory.includes(mediaID)) ?
    <>
      <Badge sx={badge} size="lg" bg="$success600">
        <BadgeText sx={badgeText} color="$white">Watched</BadgeText>
      </Badge>
      <Pressable onPress={() => updateHistory('REMOVE', mediaID)}>
        <LinkText>{loading ? 'Loading ...' : 'Mark Unwatched'}</LinkText>
      </Pressable>
    </>
    :
    <Pressable onPress={() => updateHistory('ADD', mediaID)}>
      <LinkText>{loading ? 'Loading ...' : 'Mark Watched'}</LinkText>
    </Pressable>
  );
}

const badge = {
  position: "absolute",
  top: 16,
  left: 12,
  paddingVertical: 5,
  paddingHorizontal: 12,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '$success300',
  zIndex: 10
}

const badgeText = {
  fontSize: 16,
  fontWeight: 700
}

export default WatchedBadge;