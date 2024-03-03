import { Box, Text } from '@gluestack-ui/themed';
import { StyleSheet} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Page() {

  return (
    <>
      <Box grid='container'>
        <Box grid='row'>
          <Box grid='col' columns='11' offset='1' columnsSm='10' offsetSm='2' columnsMd='8' offsetMd='4' columnsLg='6' offsetLg='6' columnsXl='4' offsetXl='8' columnsXxl='2' offsetXxl='10'
            style={{ ...styles.column, backgroundColor: 'green'}}
          >
            <Text style={styles.text}>Col-1, Col-Md-9</Text>
          </Box>
        </Box>
        {/* <Box grid='row'>
          <Box grid='col' columns='11' offset='1'
            style={{ ...styles.column, backgroundColor: 'goldenrod'}}
          >
            <Text style={styles.text}>Col-1, Col-Md-9</Text>
          </Box>
          <Box grid='col' columns='10' offset='2'
            style={{ ...styles.column, backgroundColor: 'goldenrod'}}
          >
            <Text style={styles.text}>Col-2, Col-Md-10</Text>
          </Box>
          <Box grid='col' columns='9' offset='3'
            style={{ ...styles.column, backgroundColor: 'goldenrod'}}
          >
            <Text style={styles.text}>Col-3, Col-Md-11</Text>
          </Box>
          <Box grid='col' columns='8' offset='4'
            style={{ ...styles.column, backgroundColor: 'goldenrod'}}
          >
            <Text style={styles.text}>Col-4, Col-Md-12</Text>
          </Box>
          <Box grid='col' columns='7' offset='5'
            style={{ ...styles.column, backgroundColor: 'goldenrod'}}
          >
            <Text style={styles.text}>Col-4, Col-Md-12</Text>
          </Box>
          <Box grid='col' columns='6' offset='6'
            style={{ ...styles.column, backgroundColor: 'goldenrod'}}
          >
            <Text style={styles.text}>Col-4, Col-Md-12</Text>
          </Box>
          <Box grid='col' columns='5' offset='7'
            style={{ ...styles.column, backgroundColor: 'goldenrod'}}
          >
            <Text style={styles.text}>Col-4, Col-Md-12</Text>
          </Box>
          <Box grid='col' columns='4' offset='8'
            style={{ ...styles.column, backgroundColor: 'goldenrod'}}
          >
            <Text style={styles.text}>Col-4, Col-Md-12</Text>
          </Box>
          <Box grid='col' columns='3' offset='9'
            style={{ ...styles.column, backgroundColor: 'goldenrod'}}
          >
            <Text style={styles.text}>Col-4, Col-Md-12</Text>
          </Box>
          <Box grid='col' columns='2' offset='10'
            style={{ ...styles.column, backgroundColor: 'goldenrod'}}
          >
            <Text style={styles.text}>Col-4, Col-Md-12</Text>
          </Box>
          <Box grid='col' columns='1' offset='11'
            style={{ ...styles.column, backgroundColor: 'goldenrod'}}
          >
            <Text style={styles.text}>Col-11, Col-Md-12</Text>
          </Box>
        </Box> */}
      </Box>
      <Container>
      <Row>
        <Col xs='12' sm='10' md='8' lg='6' xl='4' xxl='2'
          style={{ ...styles.column, backgroundColor: 'coral' }}
        >
          <Text style={styles.text}>Col-12, Col-Md-9</Text>
        </Col>
      </Row>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  column: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    border: '1px solid black'
  },
  text: {
    color: 'black',
    fontWeight: 'bold'
  }
});