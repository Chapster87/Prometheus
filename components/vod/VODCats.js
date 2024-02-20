import { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

import VODList from './VODList';

function VODCats({page, player}) {
  const [mediaCategory, setMediaCategory] = useState();
  const [listData, setListData] = useState();

  if(page === 'Series') {
    // GET Series Streams 
    // player.getSeriesCategories()
    //   .then(console.log)
    //   .catch(console.log);

    useEffect(() => {
      player.getSeriesCategories()
      .then((data) => setMediaCategory(data));
    }, []);

  } else if (page === 'Movies') {
    // GET VOD Streams 
    // player.getVODStreamCategories()
    //   .then(console.log)
    //   .catch(console.log);

    useEffect(() => {
      player.getVODStreamCategories()
      .then((data) => setMediaCategory(data));
    }, []);
  }

  function handleCategoryClick(catData){
    setListData(catData);
  }

  return (
    <>
      {(!listData) &&
        <Container fluid>
          <Row>
            <Col>
              <h1>{page}</h1>
            </Col>
          </Row>
          <Row>
          {(mediaCategory) ?
            <Col>
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
          :
            [...Array(60)].map((elementInArray, index) => ( 
              <Col>
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
              </Col>
            ))
          }
          </Row>
        </Container>
      }
      {(listData) && <VODList page={page} player={player} catData={listData} />}
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