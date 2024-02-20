import { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function TVGuide({page, player, groupData}) {
  const [channels, setChannels] = useState();
  const [channelSchedule, setChannelSchedule] = useState();

  // GET LIVE Streams
  // (This will get All LIVE Streams in the selected category ONLY)
  // player.getLiveStreams(groupData.category_id) 
  //   .then(console.log)
  //   .catch(console.log)
  // player.getLiveStreams('20810') // Cartoon Network
  // .then(console.log)
  // .catch(console.log)

  // GET short_epg for LIVE Streams (same as stalker portal, prints the next X EPG that will play soon)
  // player.getEPGLivetreams(id, limit)
  // .then(console.log)
  // .catch(console.log)
  // player.getEPGLivetreams('1461898', 0)
  // .then(console.log)
  // .catch(console.log)

  // GET ALL EPG for LIVE Streams (same as stalker portal, but it will print all epg listings regardless of the day)
  // player.getEPGLivetreams(id)
  // .then(console.log)
  // .catch(console.log)

  // player.getAllEPGLiveStreams(id)
  // .then(console.log)
  // .catch(console.log)

  useEffect(() => {
    player.getLiveStreams(groupData.category_id)
      .then(data => {
        setChannels(data);

        console.log("Channel Data1", channels);

        {(channels) && 
        channels.map(channel => {
          player.getEPGLivetreams(channel.stream_id, 0)
            .then(data => {
              if (data) { 
                console.log("EPG Data", data);
                setChannelSchedule(prevSchedule => {
                  const schedule = {
                    stream_id: channel.stream_id,
                    epg_listings: data.epg_listings
                  }
                  return schedule; 
                });
              } 
            });
        })
        }

        console.log("Schedule", channelSchedule);
      });

      
      
      

      
      
      // .then(data => {
      //   const channelData = data;

      //   {(channelData) &&
      //     channelData.map((channel, index) => {
      //       player.getEPGLivetreams(channel.stream_id, 0)
      //         .then(data => {
      //           if (data.epg_listings) {
      //             const channelSchedule = data.epg_listings;
      //             // console.log("EPG Data", data);
      //             channelData[index].epg_listings = channelSchedule;
      //           }
      //         });
      //     })
      //     console.log("Channel Data", channelData);
      //     setChannels(channelData);
      //   }
      // });

    
    // player.getAllEPGLiveStreams(1461898)
    //   .then(data => {
    //     const channelSchedule = data;
    //     console.log("ALL EPG Data", data);
    //   });

    
  }, []);

  return (
    <>
      {/* May be better to define a dummy data object and then replace than checking to see if it's there and rendering on the second page load */}
      {(channels && channelSchedule) &&
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
                    {/* {(channelSchedule) &&
                      channel.epg_listings.map(epg => 
                        <div key={epg.id}>
                          {epg.title}
                        </div>
                      )
                    } */}
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