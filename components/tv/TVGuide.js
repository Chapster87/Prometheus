import { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currTime = Date.now()

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
              <div>{new Date(currTime * 1000).toString()}</div>
              <div>{date.toLocaleTimeString('en-US')}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              {channels.map(channel => 
                <div key={channel.num} className={`channel`}>
                  <div className={`channel-inner`}>
                    <div className={`channel-namecard`}>
                      <img className={`channel-icon`} src={channel.stream_icon} /><span className={`channel-title`}>{channel.name}</span>
                    </div>
                    <div className={`program-list`}>
                      {channel.epg_listings.map(epg => {
                          const guideWidthMinutes = 120;
                          const programLengthMinutes = (epg.stop_timestamp - epg.start_timestamp)/60;
                          const programWidth = (programLengthMinutes / guideWidthMinutes * 100) + '%';

                          return (
                            <div key={epg.id} className={`program`} style={{ width: programWidth }}>
                              <div className={`program-inner`}>
                                {atob(epg.title)}
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}

export default TVGuide;