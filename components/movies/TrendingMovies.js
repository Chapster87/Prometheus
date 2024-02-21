import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import VODCard from '../vod/VODCard';

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
    const fetchTrending = async () => {
      fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => setTrendingData(response))
        .catch(err => console.error(err));
    };
    fetchTrending();

    console.log("Trending", trendingData);
  }, []);

  // {(trendingData) &&
  //   trendingData.map((Val) => {
  //     const {
  //       name,
  //       title,
  //       poster_path,
  //       first_air_date,
  //       release_date,
  //       media_type,
  //       id,
  //     } = Val;
  //   });
  // }

  return (
    <>
      {(trendingData) ?
        <>
          {trendingData.results.map(trending =>
            <VODCard key={trending.id} id={trending.id} image={`https://image.tmdb.org/t/p/w400${trending.poster_path}`} name={trending.title} />
          )}
        </>
      :
        <div>No Results</div>
      }
    </>
  );
}

export default TrendingMovies;