import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import Player from '../../components/Player';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import ImgPlaceholder from '../../assets/images/svg/card-image.svg';

import VODCard from '../../components/vod/VODCard';

// initialize player line api
const player = new Player({
  baseUrl: process.env.EXPO_PUBLIC_XC_URL,
  // username and password of user line
  auth: {
    username: process.env.EXPO_PUBLIC_XC_USERNAME,
    password: process.env.EXPO_PUBLIC_XC_PASSWORD
  }
})

player.baseURL = process.env.EXPO_PUBLIC_XC_URL

export default function Page() {
  const [allMedia, setAllMedia] = useState();
  
  useEffect(() => {
    player.getVODStreams('X')
      .then(data => {
        setAllMedia(data);
        console.log("All Movies", data);
      });
  }, []);

  function handleCardClick(mediaID){
    console.log("click");
    // setVodID(mediaID);
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Link href="/" asChild>
              <Button variant="primary">Home</Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Container fluid className='vod-list'>
        <Row>
          <Col>
            <h1>All Movies</h1>
          </Col>
        </Row>
        <Row>
          {(allMedia) ?
            allMedia.slice(0, 50).map(media => {
                return (
                  <VODCard key={media.stream_id} mediaID={media.stream_id} image={media.stream_icon} name={media.title} onCardClick={handleCardClick} />
                );
              })
          :
            [...Array(18)].map((elementInArray, index) => ( 
              <Col key={index} xs='6' md='4' lg='3' xl='2' style={{ display: 'flex', alignItems: "stretch"}}>
                <Card className={`vod-card movie`}>
                  <div className={`card-img-top card-img-placeholder`}>
                    <ImgPlaceholder width={120} height={40} />
                  </div>
                  <Card.Body>
                    <Card.Title className={`text-center`}>
                        <Placeholder animation="glow">
                          <Placeholder xs={10} />
                        </Placeholder>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  );
}