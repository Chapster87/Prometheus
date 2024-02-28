import { useState, useEffect } from 'react';
import VODCard from '../vod/VODCard';

import Player from '../Player';

// initialize player line api
const player = new Player();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`
  }
};

function TrendingMovies() {
  const [trendingData, setTrendingData] = useState();
  
  useEffect(() => {
    player.getTrendingMovies()
      .then(response => {
        setTrendingData(response)
      });

  }, []);

  useEffect(() => {
    
  }, []);

  return (
    <>
      {(trendingData) ?
        <>
          {trendingData.map(trending =>
            <VODCard key={trending.id} mediaID={trending.stream_id} image={`https://image.tmdb.org/t/p/w400${trending.poster_path}`} name={trending.title} />
          )}
        </>
      :
        <div>No Results</div>
      }
    </>
  );
}

export default TrendingMovies;