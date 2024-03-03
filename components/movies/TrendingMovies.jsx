import { useState, useEffect } from 'react';
import { HStack } from '@gluestack-ui/themed';

import VODCard from '../vod/VODCard';
import Spark from '../Spark';

// initialize api engine
const spark = new Spark();

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
    spark.getTrendingMovies()
      .then(response => {
        setTrendingData(response)
      });
  }, []);

  return (
    <>
      {(trendingData) ?
        <HStack space="none" reversed={false} wrap={true}>
          {trendingData.map(trending =>
            <VODCard key={trending.id} mediaID={trending.stream_id} image={`https://image.tmdb.org/t/p/w400${trending.poster_path}`} name={trending.title} />
          )}
        </HStack>
      :
        <div>No Results</div>
      }
    </>
  );
}

export default TrendingMovies;