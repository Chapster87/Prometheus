import { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function VOD({player, vodWrapper}) {
  const [movieCategoryData, setMovieCategoryData] = useState(vodWrapper);
  const [vodMovieData, setVodMovieData] = useState([]);
  const [vodInfoData, setVodInfoData] = useState([]);

  // GET VOD Info
  player.getVODInfo(movieCategoryData.stream_id) // This will get info such as video codecs, duration, description, directors for 1 VOD
    .then(console.log)
    .catch(console.log)

  useEffect(() => {
    player.getVODInfo(movieCategoryData.stream_id)
    .then((data) => setVodMovieData(data.movie_data));

    player.getVODInfo(movieCategoryData.stream_id)
    .then((data) => setVodInfoData(data.info));
  }, []);

  // function handleCategoryClick(event, vodData){
  //   event.preventDefault();
  // }

  return (
    <div>
        <>
          <View>
            <img src={vodInfoData.movie_image} alt={vodMovieData.name} />
          </View>
          <View>
            <h1>{vodMovieData.title}</h1>
            <p>{vodInfoData.plot}</p>
          </View>
        </>
    </div>
  )
}

export default VOD;