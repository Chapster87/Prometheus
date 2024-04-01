import { useState, useEffect } from 'react';
import { Badge, BadgeText, Button, ButtonText, LinkText, Pressable, Text } from '@gluestack-ui/themed';
import { supabase } from '../../config/supabase'

function WatchedBadge({ session, mediaID, mediaType }) {
  const [loading, setLoading] = useState(true);
  const [watchHistory, setWatchHistory] = useState();

  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      async function getMediaMeta() {
        setLoading(true);
        const { user } = session
  
        const { data, error } = await supabase
          .from('media')
          .select((mediaType === 'movies') ? 'watchHistoryMovies' : 'watchHistorySeries')
          .eq('id', user.id)
          .single();
  
        if (error) {
          console.warn(error)
        } else if (data) {
          setWatchHistory((mediaType === 'movies') ? data.watchHistoryMovies : data.watchHistorySeries);
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
      let newHistory = [];

      if(watchHistory) {
        newHistory = [...watchHistory]
      }

      if(ID && event === 'WATCHED' && !newHistory.includes(ID.toString())) {
        newHistory.push(ID.toString());
      }

      if (ID && event === 'UNWATCH') {
        const toRemove = newHistory.indexOf(ID.toString());
        if (toRemove > -1) {
          newHistory.splice(toRemove, 1);
        }
      }

      let updates = {};

      if (mediaType === 'movies') {
        updates = {
          id: user.id,
          watchHistoryMovies: newHistory,
          updated_at: new Date(),
        }
      } else {
        updates = {
          id: user.id,
          watchHistorySeries: newHistory,
          updated_at: new Date(),
        }
      }

      async function updateDatabase() {
        const { error } = await supabase.from('media').upsert(updates)

        if (error) {
          alert(error.message)
        } else {
          setWatchHistory(newHistory);
        }
      }

      updateDatabase();
    }

    setLoading(false);
  }

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