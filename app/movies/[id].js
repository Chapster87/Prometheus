import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`
  }
};

export default function Page() {
  const [movieData, setMovieData] = useState();
  const { id } = useLocalSearchParams(); 
  
  useEffect(() => {
    const fetchTrending = async () => {
      // fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      fetch(`https://api.themoviedb.org/3/movie/${id}?&append_to_response=credits&include_adult=false`, options)
        .then(response => response.json())
        .then(response => setMovieData(response))
        .catch(err => console.error(err));
    };
    fetchTrending();

    console.log("Movie", movieData);
  }, []);

  

  return (
    <>
      <Text>TMDB ID: {id}</Text>
      {(movieData) &&
        <>
          <div>{JSON.stringify(movieData)}</div>
          {/* {movieData.results.map(trending =>
            
          )} */}
        </>
      }
    </>
  );
}