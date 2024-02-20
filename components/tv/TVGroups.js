import { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import TVGuide from './TVGuide';

function TVGroups({page, player}) {
  const [mediaCategory, setMediaCategory] = useState([]);
  const [groupData, setGroupData] = useState();

  // player.getLiveStreamCategory()
  //   .then(console.log)
  //   .catch(console.log)

  if(page === 'Live TV') {
    useEffect(() => {
      player.getLiveStreamCategory()
        .then((data) => setMediaCategory(data));
    }, []);
  }

  function handleCategoryClick(catData){
    setGroupData(catData);
  }

  return (
    <>
      {(mediaCategory && !groupData) &&
        <Container fluid>
          <Row>
            <Col>
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
            </Col>
          </Row>
        </Container>
      }
      {(groupData) && <TVGuide page={page} player={player} groupData={groupData} />}
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