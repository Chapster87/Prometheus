import { useState, useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Box, Card, Heading, View } from '@gluestack-ui/themed';

function TVGroups({page, spark, session}) {
  const [mediaCategory, setMediaCategory] = useState([]);
  const [groupData, setGroupData] = useState();

  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      // spark.getLiveStreamCategory()
      //   .then(console.log)
      //   .catch(console.log)

      spark.getLiveStreamCategory()
        .then((data) => setMediaCategory(data));
    }
  }, [session]);

  return (
    <>
      {(mediaCategory) &&
        <Box grid='container-fluid'>
          <Box grid='row'>
            <Box grid='col' columns='12'>
              <Heading size='3xl'>{page}</Heading>
              <View style={styles.tileGrid}>
                {mediaCategory.map(cat =>
                  <Link 
                    href={{
                      pathname: '/tv/category/[id]',
                      params: { id: cat.category_id, name: cat.category_name }
                    }}
                    asChild
                    key={cat.category_id}
                  >
                    <Pressable>
                      <Card size="md" variant="elevated" m="$3" style={{ width: '18rem', margin: '1rem', cursor: 'pointer' }}>
                          <Heading size='xl'>{cat.category_name}</Heading>
                      </Card>
                    </Pressable>
                  </Link>
                )}
              </View>
            </Box>
          </Box>
        </Box>
      }
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

export default TVGroups;