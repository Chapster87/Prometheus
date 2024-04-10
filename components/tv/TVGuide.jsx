import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Heading, Icon, Image, Text } from '@gluestack-ui/themed';
import { Clock, Clock1, Clock2, Clock3, Clock4, Clock5, Clock6, Clock7, Clock8, Clock9, Clock10, Clock11, Clock12 } from 'lucide-react-native';

const programListWidthMinutes = 120;

const date = new Date();
// const day = date.getDate();
// const month = date.getMonth() + 1;
// const year = date.getFullYear();
// const hours = date.getHours();
// const minutes = date.getMinutes();
// const seconds = date.getSeconds();

const fullDateTime = Date.now()

function setIntervalImmediately(func, interval) {
  func();
  return setInterval(func, interval);
}

function TVGuide({ page, spark, session, catId, catName }) {
  const [currTime, setCurrTime] = useState(new Date());
  const [channels, setChannels] = useState();
  const [timeMarkerPos, setTimeMarkerPos] = useState();

  useEffect(() => {
    updateTime();
  }, []);

  const updateTime = () => {
    let updateTimeInterval = setIntervalImmediately(() => {
      setCurrTime(() => {
        currDate = new Date();
        let currMinutes = currDate.toLocaleTimeString('en-US', {minute:'2-digit'});

        if (currMinutes >= 30) {
          currMinutes = currMinutes - 30;
        }

        const timeMarkerPosition = (currMinutes / programListWidthMinutes * 100) + '%';
        setTimeMarkerPos(timeMarkerPosition);
        
        return currDate;
      });
    }, 10000) // update time and marker every 10 sec
  }

  useEffect(() => {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      spark.getLiveGuide(catId)
        .then(data => {
          console.log('channels', data);
          setChannels(data)
        });
    }
  }, [session]);

  return (
    <>
      {/* Needs dummy content */}
      {(channels) &&
        <>
          <Box grid='container-fluid'>
            <Box grid='row'>
              <Box grid='col' columns='12'>
                <Heading size='3xl'>{page} - {catName}</Heading>
              </Box>
            </Box>
          </Box>
          <Box grid='container-fluid'>
            <Box grid='row'>
              <Box grid='col' columns='12'>
                <Text>Full Date/Time: {new Date(fullDateTime * 1000).toString()}</Text>
              </Box>
              <Box grid='col' columns='12'>
                {(currTime) &&
                  <Text>Time: {currTime.toLocaleTimeString('en-US', {timeStyle: 'short', hour12: true})}</Text>
                }
              </Box>
            </Box>
            <Box grid='row'>
              <Box grid='col' columns='2' sx={{ paddingRight: 8 }}>
                {channels.map(channel => 
                  <Box sx={channelRow} key={channel.num}>
                    <Box sx={channelInner}>
                      <Box sx={ channelNameCard } bg='$trueGray700'>
                        <Image
                          borderRadius="$none"
                          alt={channel.name}
                          sx={{ width: 90, height: 'auto', aspectRatio: '360/270' }}
                          source={{
                            uri: channel.stream_icon
                          }}
                        />
                        <Text sx={channelTitle}>{channel.name}</Text>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box grid='col' columns='10' sx={{ paddingLeft: 0 }}>
                <Box sx={{ ...timeMarker, left: timeMarkerPos ? timeMarkerPos : '0%' }}>
                  <Icon as={Clock} sx={timeMarkerIcon}/>
                  <Text>{currTime.toLocaleTimeString('en-US', {hour: 'numeric', hour12: true})}</Text>
                  <Text>{currTime.toLocaleTimeString('en-US', {minute:'2-digit'})}</Text>
                </Box>
                {channels.map(channel => 
                  <Box sx={channelRow} key={channel.num}>
                    <Box sx={channelInner}>
                      <Box sx={ programList }>
                        {channel.epg_listings.map((epg, index) => {
                            const programLengthMinutes = (epg.stop_timestamp - epg.start_timestamp)/60;
                            const programWidth = (programLengthMinutes / programListWidthMinutes * 100) + '%';

                            return (
                              <Box key={epg.id} sx={{...program, width: programWidth, paddingLeft: index === 0 ? 0 : 4 }}>
                                <Box sx={ programInner } bg={index === 0 ? '$trueGray600' : '$trueGray800'}>
                                  <Text sx={ programTitle }>{atob(epg.title)}</Text>
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
        </>
      }
    </>
  )
}

const channelCardWidth = 300;

const channelRow = {
  display: 'flex',
  height: 120,
  marginBottom: 8
};

const channelInner = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  height: '100%',
  width: '100%'
};

const channelNameCard = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  borderRadius: 6,
  padding: 20
};

const channelTitle = {
  display: 'inline',
  marginLeft: 16,
  fontWeight: 700,
  fontSize: 18,
  lineHeight: 1.2
};

const timeMarker = {
  position: 'absolute',
  top: 0,
  zIndex: 10,
  height: '100%',
  width: 1,
  backgroundColor: '$primary0',
};

const timeMarkerIcon = {
  position: 'absolute',
  top: -34,
  left: -17,
  width: 20,
  height: 20,
  border: '1px solid $primary0',
  borderRadius: '50%',
  padding: 6,
  color: '$primary0'
};

const programList = {
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '0%',
};

const program = {
  display: 'flex',
  paddingVertical: 0,
  paddingHorizontal: 4
};

const programInner = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  borderRadius: 6,
  cursor: 'pointer',
  padding: 25,
};

const programTitle = {
  fontWeight: 700
};

export default TVGuide;