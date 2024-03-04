import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Box, Card, Heading, View, Pressable } from '@gluestack-ui/themed';

function VODCats({page, spark}) {
  const [mediaCategory, setMediaCategory] = useState();
  const [listData, setListData] = useState();
  if(page === 'Series') {
    // GET Series Streams 
    // spark.getSeriesCategories()
    //   .then(console.log)
    //   .catch(console.log);

    useEffect(() => {
      spark.getSeriesCategories()
      .then(categories => {
        setMediaCategory(categories);
      });
    }, []);

  } else if (page === 'Movies') {
    // GET VOD Streams 
    // spark.getVODStreamCategories()
    //   .then(console.log)
    //   .catch(console.log);

    useEffect(() => {
      spark.getVODStreamCategories()
        .then(categories => {
          setMediaCategory(categories);
        });
    }, []);
  }

  return (
    <>
      {(!listData) &&
        <Box grid='container-fluid'>
          <Box grid='row'>
            <Box grid='col' columns='12'>
              <Heading size='3xl'>{page}</Heading>
            </Box>
          </Box>
          <Box grid='row'>
            {(mediaCategory) ?
              <Box grid='col' columns='12'>
                <View style={styles.tileGrid}>
                  {(page === 'Movies') &&
                    <Link href="/movies/all" asChild>
                      <Pressable>
                        <Card style={{ width: '18rem', margin: '1rem', cursor: 'pointer' }}>
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
                        <Card style={{ width: '18rem', margin: '1rem', cursor: 'pointer' }}>
                          <Heading size='xl'>{cat.category_name}</Heading>
                        </Card>
                      </Pressable>
                    </Link>
                  ))}
                </View>
              </Box>
            :
              [...Array(60)].map((elementInArray, index) => ( 
                <Box grid='col' columns='12' key={index}>
                  <View style={styles.tileGrid}>
                    <Card style={{ width: '18rem', margin: '1rem' }}>
                    </Card>
                  </View>
                </Box>
              ))
            }
          </Box>
        </Box>
      }
      {/* {(listData) && <VODList page={page} spark={spark} catData={listData} />} */}
    </>
  )
}

const styles = StyleSheet.create({
  tileGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default VODCats;