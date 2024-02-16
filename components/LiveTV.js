import { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// // GET LIVE Streams
// player.getLiveStreams(category) // (This will get All LIVE Streams in the selected category ONLY)
// .then(console.log)
// .catch(console.log)
// player.getLiveStreams('20810') // Cartoon Network
// .then(console.log)
// .catch(console.log)

// // GET short_epg for LIVE Streams (same as stalker portal, prints the next X EPG that will play soon)
// player.getEPGLivetreams(id, limit)
// .then(console.log)
// .catch(console.log)
// player.getEPGLivetreams('1461898', 0)
// .then(console.log)
// .catch(console.log)

// // GET ALL EPG for LIVE Streams (same as stalker portal, but it will print all epg listings regardless of the day)
// player.getEPGLivetreams(id)
// .then(console.log)
// .catch(console.log)

function LiveTV({player}) {
  const [mediaCategory, setMediaCategory] = useState([]);

  // GET Live Stream Categories
  player.getLiveStreamCategory()
  .then(console.log)
  .catch(console.log)

  useEffect(() => {
    player.getLiveStreamCategory()
    .then((data) => setMediaCategory(data));

  }, []);

  return (
    <div>
      <h1>Live TV</h1>
        <ul>
          {mediaCategory.map(cat => 
            <li key={cat.category_id}>
              {cat.category_name}
            </li>
          )}
        </ul>
    </div>
  )
}

export default LiveTV;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  }
});