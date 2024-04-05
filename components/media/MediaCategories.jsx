import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Box, Card, Heading, View, Pressable, VStack } from '@gluestack-ui/themed';

import MediaList from './MediaList';

function MediaCategories({ page, spark, session }) {
  const [mediaCategory, setMediaCategory] = useState();
  const [activeCategory, setActiveCategory] = useState({id: 'X', name: `All ${page}`});

  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
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
            console.log(categories);
          });
      }
    }
  }, [session])

  function categoryClick (id, name) {
    console.log('clicked');
    setActiveCategory({id: id, name: name});
  }

  return (
    <>
      <Box grid='container-fluid'>
        <Box grid='row'>
          <Box grid='col' columns='2' sx={stickyColumns}>
            {(mediaCategory) ?
              <VStack>
                {(page === 'Movies') &&
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
                {mediaCategory.map(cat => (
                  <Link 
                    href={{
                      pathname: (page === 'Movies') ? '/movies/category/[id]' : '/series/category/[id]',
                      params: { id: cat.category_id, name: cat.category_name }
                    }}
                    asChild
                    key={cat.category_id}
                  >
                    <Pressable>
                      <Card sx={{ margin: '1rem', cursor: 'pointer' }}>
                        <Heading size='xl'>{cat.category_name}</Heading>
                      </Card>
                    </Pressable>
                  </Link>
                ))}
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
              <MediaList page={page} spark={spark} session={session} catId={activeCategory.id} catName={activeCategory.name} />
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