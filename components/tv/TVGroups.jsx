import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GluestackUIProvider, Box, ImageBackground, View, Text } from '@gluestack-ui/themed';
import { config } from '../../config/gluestack-ui.config'
import Card from 'react-bootstrap/Card';

import TVGuide from './TVGuide';

function TVGroups({page, spark}) {
  const [mediaCategory, setMediaCategory] = useState([]);
  const [groupData, setGroupData] = useState();

  // spark.getLiveStreamCategory()
  //   .then(console.log)
  //   .catch(console.log)

  if(page === 'Live TV') {
    useEffect(() => {
      spark.getLiveStreamCategory()
        .then((data) => setMediaCategory(data));
    }, []);
  }

  function handleCategoryClick(catData){
    setGroupData(catData);
  }

  return (
    <GluestackUIProvider config={config}>
      {(mediaCategory && !groupData) &&
        <Box grid='container-fluid'>
          <Box grid='row'>
            <Box grid='col' columns='12'>
              <h1>{page}</h1>
              <View style={styles.tileGrid}>
                {mediaCategory.map(cat =>
                  <Card style={{ width: '18rem', margin: '1rem', cursor: 'pointer' }} key={cat.category_id} onClick={() => handleCategoryClick(cat)}>
                    <Card.Body>
                      <Card.Title>{cat.category_name}</Card.Title>
                    </Card.Body>
                  </Card>
                )}
              </View>
            </Box>
          </Box>
        </Box>
      }
      {(groupData) && <TVGuide page={page} spark={spark} groupData={groupData} />}
    </GluestackUIProvider>
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