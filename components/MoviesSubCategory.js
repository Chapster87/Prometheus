import { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import MoviesVOD from './MoviesVOD';

function MoviesSubCat({player, catData}) {
  const [movieCategoryData, setMovieCategoryData] = useState([]);
  const [VODData, setVODData] = useState();

  // GET VOD Streams
  // player.getVODStreams(catData.category_id)
  // .then(console.log)
  // .catch(console.log)

  useEffect(() => {
    player.getVODStreams(catData.category_id)
    .then((data) => setMovieCategoryData(data));
  }, []);

  function handleCategoryClick(event, vodData){
    event.preventDefault();

    setVODData(vodData);
  }

  return (
    <div>
      {(!VODData) &&
        <>
        <h1>Movies - {catData.category_name}</h1>
        <ul>
          {movieCategoryData.map(vod => 
            <li key={vod.stream_id}>
              <a href="#" onClick={(event) => handleCategoryClick(event, vod)}>{vod.name}</a>
            </li>
          )}
        </ul>
        </>
      }

      {(VODData) && <MoviesVOD player={player} vodWrapper={VODData} />}
    </div>
  )
}

export default MoviesSubCat;