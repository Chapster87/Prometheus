import { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import MoviesSubCat from './MoviesSubCategory';

function Movies({player}) {
  const [mediaCategory, setMediaCategory] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState();

  // GET VOD Streams 
  // player.getVODStreamCategories()
  //   .then(console.log)
  //   .catch(console.log);

  useEffect(() => {
    player.getVODStreamCategories()
    .then((data) => setMediaCategory(data));
  }, []);

  function handleCategoryClick(event, catData){
    event.preventDefault();

    setSubCategoryData(catData);
  }

  return (
    <div>
      {(!subCategoryData) &&
        <>
        <h1>Movies</h1>
        <ul>
          {mediaCategory.map(cat => 
            <li key={cat.category_id}>
              <a href="#" onClick={(event) => handleCategoryClick(event, cat)}>{cat.category_name}</a>
            </li>
          )}
        </ul>
        </>
      }
      {(subCategoryData) && <MoviesSubCat player={player} catData={subCategoryData} />}
        
    </div>
  )
}

export default Movies;