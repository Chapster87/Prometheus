import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Box, Card, Heading, View, Pressable, VStack } from '@gluestack-ui/themed';

import MediaList from './MediaList';

function MediaCategories({ page, spark, session }) {
  const [mediaCategory, setMediaCategory] = useState();
  const [activeCategory, setActiveCategory] = useState({id: 'X', name: `All ${page}`});
  const [listKey, setListKey] = useState(0);
  const [isTmdb, setIsTmdb] = useState(false);

  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      if(session.user.user_metadata.xcUrl) {
        if(page === 'Series') {

          spark.getSeriesCategories()
            .then(categories => {
              setMediaCategory(categories);
              // console.log(categories);
            });
        } else if (page === 'Movies') {
          spark.getVODStreamCategories()
            .then(categories => {
              setMediaCategory(categories.data);
              // console.log('Movie Cats:', categories);
            });
        }
      } else if(session.user.user_metadata.tmdbApiKey && session.user.user_metadata.tmdbApiReadAccessToken) {
        setIsTmdb(true);
        if(page === 'Series') {
          spark.getTmdbSeriesGenres()
            .then(genres => {
              setMediaCategory(genres);
              setActiveCategory({id: genres[0].id, name: genres[0].name});
              setListKey(key => key + 1);
              console.log('Tmdb Genres:', genres);
            });
        } else if (page === 'Movies') {
          spark.getTmdbMovieGenres()
            .then(genres => {
              setMediaCategory(genres);
              setActiveCategory({id: genres[0].id, name: genres[0].name});
              setListKey(key => key + 1);
              // console.log('Tmdb Genres:', genres);
            });
        }
      }
    }
  }, [session])

  function categoryClick (id, name) {
    console.log('clicked');
    setActiveCategory({ ...activeCategory, id: id, name: name});
    setListKey(key => key + 1);
  }

  return (
    <>
      <Box grid='container-fluid'>
        <Box grid='row'>
          <Box grid='col' columns='2' sx={stickyColumns}>
            {mediaCategory ?
              <VStack>
                {(page === 'Movies' && !isTmdb) &&
                  <>
                    <Link href="/movies/all" asChild>
                      <Pressable>
                        <Card sx={{ margin: '1rem', cursor: 'pointer' }}>
                          <Heading size='xl'>All Movies</Heading>
                        </Card>
                      </Pressable>
                    </Link>
                    <Pressable onPress={() => categoryClick('28', 'Action')} key={'213451324'}>
                      <Card sx={{ margin: '1rem', cursor: 'pointer' }}>
                        <Heading size='xl'>Test- Action</Heading>
                      </Card>
                    </Pressable>
                  </>
                }
                {mediaCategory.map(cat => {
                  let categoryName;
                  let categoryId;
                  if(isTmdb) {
                    categoryName = cat.name;
                    categoryId = cat.id;
                  } else {
                    categoryName = cat.category_name;
                    categoryId = cat.category_id;
                  }

                  return (
                    (categoryName && categoryId) &&
                      // Link to seperate Page
                      // <Link 
                      //   href={{
                      //     pathname: (page === 'Movies') ? '/movies/category/[id]' : '/series/category/[id]',
                      //     params: { id: categoryId, name: categoryName }
                      //   }}
                      //   asChild
                      //   key={categoryId}
                      // >
                      //   <Pressable>
                      //     <Card sx={{ margin: '1rem', cursor: 'pointer' }}>
                      //       <Heading size='xl'>{categoryName}</Heading>
                      //     </Card>
                      //   </Pressable>
                      // </Link>
                      <Pressable onPress={() => categoryClick(categoryId, categoryName)} key={categoryId}>
                        <Card sx={{ margin: '1rem', cursor: 'pointer' }}>
                          <Heading size='xl'>{categoryName}</Heading>
                        </Card>
                      </Pressable>
                  )
                })}
              </VStack>
            :
              <VStack>
                {[...Array(60)].map((elementInArray, index) => ( 
                  <Card sx={{ margin: '1rem' }} key={index}>
                  </Card>
                ))}
              </VStack>
            }
          </Box>
          <Box grid="col" columns="10" sx={stickyColumns}>
            {(activeCategory) &&
              <MediaList key={listKey} page={page} spark={spark} session={session} catId={activeCategory.id} catName={activeCategory.name} />
            }
          </Box>
        </Box>
      </Box>
    </>
  )
}

const stickyColumns = {
  height: 'calc(100vh - 146px)', //header and heading height
  overflow: 'auto'
}

export default MediaCategories;