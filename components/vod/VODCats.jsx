import { useState, useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { GluestackUIProvider, Box, View, Text } from '@gluestack-ui/themed';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

import VODList from './VODList';

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
              <h1>{page}</h1>
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
                          <Card.Body>
                            <Card.Title>All Movies</Card.Title>
                          </Card.Body>
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
                          <Card.Body>
                            <Card.Title>{cat.category_name}</Card.Title>
                          </Card.Body>
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
                      <Card.Body>
                        <Card.Title>
                          <Placeholder animation="glow">
                            <Placeholder xs={10} />
                          </Placeholder>
                        </Card.Title>
                      </Card.Body>
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