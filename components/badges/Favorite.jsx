import { useState, useEffect } from 'react';
import { Badge, BadgeIcon, BadgeText, Box, LinkText, Pressable } from '@gluestack-ui/themed';
import { Star } from 'lucide-react-native';
import { supabase } from '../../config/supabase'

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

  async function updateMediaMeta(event, ID) {
    setLoading(true);
    if (session) {
      const { user } = session
      let newFavorites = [];

      if(favorites) {
        newFavorites = [...favorites];
      }

      if (ID && event === 'FAVORITE' && !newFavorites.includes(ID.toString())) {
        newFavorites.push(ID.toString());
      }

      if (ID && event === 'UNFAVORITE') {
        const toRemove = newFavorites.indexOf(ID.toString());
        if (toRemove > -1) {
          newFavorites.splice(toRemove, 1);
        }
      }

      let updates = {};

      if((mediaType === 'movies')) {
        updates = {
          id: user.id,
          favoritesMovies: newFavorites.sort(),
          updated_at: new Date(),
        }
      } else {
        updates = {
          id: user.id,
          favoritesSeries: newFavorites.sort(),
          updated_at: new Date(),
        }
      }

      async function updateDatabase() {
        const { error } = await supabase.from('media').upsert(updates)

        if (error) {
          alert(error.message)
        } else {
          setFavorites(newFavorites);
        }
      }

      updateDatabase();
    }
    setLoading(false);
  }

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
  width: 'auto'
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
  textShadow: '0 8px 5px rgba(255, 255, 255, 0.12)',
  marginRight: 28
}

export default FavoriteBadge;