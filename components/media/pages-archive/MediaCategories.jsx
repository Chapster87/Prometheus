import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Box, Card, Heading, View, Pressable, VStack } from '@gluestack-ui/themed';

function MediaCategories({ page, spark, session }) {
  const [mediaCategory, setMediaCategory] = useState();

  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      if(page === 'Series') {
        // GET Series Streams 
        // spark.getSeriesCategories()
        //   .then(console.log)
        //   .catch(console.log);

        spark.getSeriesCategories()
          .then(categories => {
            setMediaCategory(categories);
          });
      } else if (page === 'Movies') {
        // GET VOD Streams 
        // spark.getVODStreamCategories()
        //   .then(console.log)
        //   .catch(console.log);

        spark.getVODStreamCategories()
          .then(categories => {
            setMediaCategory(categories.data);
            console.log(categories);
          });
      }
    }
  }, [session])

  return (
    <>
      <Box grid='container-fluid'>
        <Box grid='row'>
          <Box grid='col' columns='12'>
            <Heading size='3xl'>{page}</Heading>
          </Box>
        </Box>
        <Box grid='row'>
          <Box grid='col' columns='2'>
            {(mediaCategory) ?
              <VStack sx={categoryList}>
                {(page === 'Movies') &&
                  <Link href="/movies/all" asChild>
                    <Pressable>
                      <Card sx={{ margin: '1rem', cursor: 'pointer' }}>
                        <Heading size='xl'>All Movies</Heading>
                      </Card>
                    </Pressable>
                  </Link>
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
              <VStack sx={categoryList}>
                [...Array(60)].map((elementInArray, index) => ( 
                  <Card sx={{ margin: '1rem' }}>
                  </Card>
                ))
              </VStack>
            }
          </Box>
          <Box grid="col" columns="10"></Box>
        </Box>
      </Box>
    </>
  )
}

const categoryList = {
  height: 'calc(100vh - 146px)', //header and heading height
  overflow: 'auto'
}

export default MediaCategories;