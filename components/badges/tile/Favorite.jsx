import { useState, useEffect } from 'react';
import { Badge, BadgeIcon, BadgeText, Box, LinkText, Pressable } from '@gluestack-ui/themed';
import { Star } from 'lucide-react-native';
import { supabase } from '../../../config/supabase'

function FavoriteBadge({ session, mediaID, mediaType }) {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      async function getMediaMeta() {
        setLoading(true);
        const { user } = session
  
        const { data, error } = await supabase
          .from('media')
          .select((mediaType === 'movies') ? 'favoritesMovies' : 'favoritesSeries' )
          .eq('id', user.id)
          .single();
  
        if (error) {
          console.warn(error)
        } else if (data) {
          setFavorites((mediaType === 'movies') ? data.favoritesMovies : data.favoritesSeries);
        }

        setLoading(false);
      }
  
      getMediaMeta()
    }
  }, [session]);

  return (
    <>
      {(mediaID && favorites && favorites.includes(mediaID.toString())) &&
        <>
          <Badge sx={favoriteBadge}>
            <Box sx={badgeInner}>
              <BadgeIcon sx={badgeIcon} as={Star} fill="$amber700" />
              <BadgeText sx={badgeText}>Favorite</BadgeText>
            </Box>
          </Badge>
        </>
      }
    </>
  );
}

const favoriteBadge = {
  position: "absolute",
  top: 12,
  right: -2,
  paddingVertical: 5,
  paddingHorizontal: 12,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: '$amber700',
  backgroundColor: '$amber400',
  zIndex: 10,
  width: 'auto'
}

const badgeInner = {
  flexDirection: 'row',
  alignItems: 'center',
}

const badgeIcon = {
  width: 20,
  height: 20,
  color: '$amber700',
}

const badgeText = {
  display: 'none',
  fontSize: 26,
  backgroundColor: '$amber700',
  color: 'transparent',
  backgroundClip: 'text',
  textShadow: '0 8px 5px rgba(255, 255, 255, 0.12)'
}

export default FavoriteBadge;