import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Heading, HStack, Text, View } from '@gluestack-ui/themed';
import Carousel from "react-native-reanimated-carousel";

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

const width = Dimensions.get('window').width;
const COUNT = 6;

function TrendingMovies() {
  const [trendingData, setTrendingData] = useState();
  const [seriesCount, setSeriesCount] = useState();

  useEffect(() => {
    spark.getTrendingSeries()
      .then(response => {
        console.log(response);
        setTrendingData(response)
        setSeriesCount(response.length);
      });
  }, []);

  return (
    <>
      {(trendingData && seriesCount) &&
        <>
          <HStack space="none" reversed={false} wrap={false}>
            {trendingData.map(trending =>
              <VODCard key={trending.id} mediaID={trending.stream_id} streamType='series' image={`https://image.tmdb.org/t/p/w400${trending.poster_path}`} name={trending.title} />
            )}
          </HStack>
        </>
      }
    </>
  );
}

const MovieGridSX= {
  display: 'flex',
  justifyContent: 'center'
}

export default TrendingMovies;