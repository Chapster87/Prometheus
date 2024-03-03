import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GluestackUIProvider, Box, ImageBackground, View, Text } from '@gluestack-ui/themed';
import { config } from '../../config/gluestack-ui.config'

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
    <GluestackUIProvider config={config}>
      {/* Needs dummy content */}

      {(channels) &&
        <Box grid='container-fluid'>
          <Box grid='row'>
            <Box grid='col' columns='12'>
              <h1>{page} - {groupData.category_name}</h1>
            </Box>
          </Box>
          <Box grid='row'>
            <Box grid='col' columns='12'>
              <div>{new Date(currTime * 1000).toString()}</div>
              <div>{date.toLocaleTimeString('en-US')}</div>
            </Box>
          </Box>
          <Box grid='row'>
            <Box grid='col' columns='12'>
              {channels.map(channel => 
                <Box style={{ ...styles.channel }} key={channel.num}>
                  <Box style={{ ...styles.channelInner }}>
                    <Box style={{ ...styles.channelNameCard }} bg='$warmGray200'>
                      <img style={{ ...styles.channelIcon }} src={channel.stream_icon} />
                      <Text style={{ ...styles.channelTitle }}>{channel.name}</Text>
                    </Box>
                    <Box style={{ ...styles.programList }}>
                      {channel.epg_listings.map(epg => {
                          const guideWidthMinutes = 120;
                          const programLengthMinutes = (epg.stop_timestamp - epg.start_timestamp)/60;
                          const programWidth = (programLengthMinutes / guideWidthMinutes * 100) + '%';

                          return (
                            <Box key={epg.id} style={{ ...styles.program, width: programWidth }}>
                              <Box style={{ ...styles.programInner }} bg='$warmGray400'>
                                <Text style={{ ...styles.programTitle }}>{atob(epg.title)}</Text>
                              </Box>
                            </Box>
                          );
                        })
                      }
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      }
    </GluestackUIProvider>
  )
}

const channelCardWidth = 300;

const styles = StyleSheet.create({
  channel: {
    display: 'flex',
    height: 120,
    marginBottom: 8
  },
  channelInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '100%',
    width: '100%'
  },
  channelNameCard: {
    display: 'flex',
    alignItems: 'center',
    width: channelCardWidth,
    marginRight: 4,
    borderRadius: 6,
    padding: 20
  },
  channelIcon: {
    maxWidth: 90
  },
  channelTitle: {
    display: 'inline',
    marginLeft: 16,
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 1.2
  },
  programList: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  program: {
    display: 'flex',
    paddingVertical: 0,
    paddingHorizontal: 4
  },
  programInner: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 6,
    cursor: 'pointer',
    padding: 25,
  },
  programTitle: {
    fontWeight: 700
  }
});

export default TVGuide;