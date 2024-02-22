import { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function TVGuide({page, player, groupData}) {
  const [channels, setChannels] = useState();

  useEffect(() => {
  player.getLiveGuide(groupData.category_id)
    .then(data => console.log("TV Guide", data))

  player.getLiveGuide(groupData.category_id)
    .then(data => setChannels(data));
    
  }, []);

  return (
    <>
      {/* Needs dummy content */}
      {(channels) &&
        <Container fluid className={`tv-guide`}>
          <Row>
            <Col>
              <h1>{page} - {groupData.category_name}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {channels.map(channel => 
                <Row key={channel.num} className={`channel`}>
                  <Col className={`channel-inner`}>
                    <div className={`channel-namecard`}>
                      <img className={`channel-icon`} src={channel.stream_icon} /><span className={`channel-title`}>{channel.name}</span>
                    </div>
                    {channel.epg_listings.map(epg => 
                        <div key={epg.id}>
                          {atob(epg.title)}
                        </div>
                      )
                    }
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}

export default TVGuide;