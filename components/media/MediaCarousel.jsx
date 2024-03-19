import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Heading, HStack, Text, View } from '@gluestack-ui/themed';
import Carousel from "react-native-reanimated-carousel";

import MediaCard from '../media/MediaCard';
import Spark from '../Spark';

// initialize api engine
const spark = new Spark();

const width = Dimensions.get('window').width;
// const width = 1000;
const COUNT = 6;

function TrendingMovies() {
  const [trendingData, setTrendingData] = useState();
  const [movieCount, setMovieCount] = useState();

  useEffect(() => {
    spark.getTrendingMovies()
      .then(response => {
        console.log(response);
        setTrendingData(response)
        setMovieCount(response.length);
      });
  }, []);

  return (
    <>
      {(trendingData && movieCount) &&
        <>
          <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%' }}>
            <Carousel
              loop
              width={width / COUNT}
              height={width / 2}
              autoPlay={false}
              style={{width: width}}
              // data={[Object.keys(trendingData)]}
              data={[...new Array(movieCount).keys()]}
              onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={({ index }) => 
                <MediaCard key={trendingData[index].id} streamType='movie' mediaID={trendingData[index].stream_id} image={`https://image.tmdb.org/t/p/w400${trendingData[index].poster_path}`} name={trendingData[index].title} />
              }
            />
          </View>
        </>
      }
    </>
  );
}

export default TrendingMovies;