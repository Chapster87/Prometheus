import { Badge, BadgeIcon, BadgeText, Box, LinkText, Pressable } from '@gluestack-ui/themed';
import { Star } from 'lucide-react-native';

function FavoriteBadge({ favorites, mediaID, updateMediaMeta, loading }) {
  console.log(favorites);
  return (
    <>
      {(mediaID && favorites && favorites.includes(mediaID.toString())) ?
        <>
          <Badge sx={favoriteBadge}>
            <Box sx={badgeInner}>
              <BadgeIcon sx={badgeIcon} as={Star} mr="$2" fill="$amber700" />
              <BadgeText sx={badgeText}>Favorite</BadgeText>
            </Box>
          </Badge>
          <Pressable onPress={() => updateMediaMeta('UNFAVORITE', mediaID)}>
            <LinkText>{loading ? 'Loading ...' : 'Remove Favorite'}</LinkText>
          </Pressable>
        </>
        :
        <Pressable onPress={() => updateMediaMeta('FAVORITE', mediaID)}>
          <LinkText>{loading ? 'Loading ...' : 'Mark Favorite'}</LinkText>
        </Pressable>
      }
    </>
  );
}

const favoriteBadge = {
  position: "absolute",
  top: 0,
  right: -22,
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '$amber700',
  backgroundColor: '$amber400',
  zIndex: 10,
  width: 250
}

const badgeInner = {
  flexDirection: 'row',
  alignItems: 'center',
}

const badgeIcon = {
  width: 26,
  height: 26,
  color: '$amber700',
}

const badgeText = {
  fontSize: 26,
  backgroundColor: '$amber700',
  color: 'transparent',
  backgroundClip: 'text',
  textShadow: '0 8px 5px rgba(255, 255, 255, 0.12)'
}

export default FavoriteBadge;