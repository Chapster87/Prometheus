import { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import MoviesList from './MoviesList';

function MovieCategories({player}) {
  const [mediaCategory, setMediaCategory] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState();

  // GET VOD Streams 
  // player.getVODStreamCategories()
  //   .then(console.log)
  //   .catch(console.log);

  useEffect(() => {
    player.getVODStreamCategories()
    .then((data) => setMediaCategory(data));
  }, []);

  function handleCategoryClick(event, catData){
    event.preventDefault();

    setSubCategoryData(catData);
  }

  return (
    <>
      {(!subCategoryData) &&
        <Container fluid>
          <Row>
            <Col>
              <h1>Movies</h1>
              <View style={styles.tileGrid}>
                {mediaCategory.map(cat =>
                  <Card style={{ width: '18rem', margin: '1rem', cursor: 'pointer' }} key={cat.category_id} onClick={(event) => handleCategoryClick(event, cat)}>
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
      {(subCategoryData) && <MoviesList player={player} catData={subCategoryData} />}
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

export default MovieCategories;