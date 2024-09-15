import { useState, useContext } from 'react';
import Head from 'expo-router/head';
import { AuthContext } from '../../components/session/AuthContext';

import { Box, Button, ButtonText, CircleIcon, FormControl, FormControlLabel, FormControlLabelText, Input, InputField, Text, Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel } from '@gluestack-ui/themed';

import Spark from '../../components/Spark';
import Fuse from 'fuse.js'

import MediaCard from '../../components/media/MediaCard';

const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  keys: ['name']
}

function Search() {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useContext(AuthContext);
  const [searchCategory, setSearchCategory] = useState('movies');
  const [searchTerm, setSearchTerm] = useState(false);
  const [searchResults, setSearchResults] = useState();

  // initialize api engine
  const spark = new Spark(session);

  // useEffect(() => {
  // }, [session]);

  async function searchMovies() {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      setLoading(true)
      if (searchTerm) {
        const useFilteredList = true;
        const allMovies = await spark.getAllMovies(useFilteredList)
          .then(movies => {
            const fuse = new Fuse(movies.data, fuseOptions)
            const found = fuse.search(searchTerm);
            // console.log(found);
            setSearchResults(found);
          });
      }
      setLoading(false)
    }
  }

  async function searchSeries() {
    if (session || process.env.EXPO_PUBLIC_USE_ENV === 'true') {
      setLoading(true)
      // console.log('Series');
      if (searchTerm) {
        const allSeries = await spark.getAllSeries()
          .then(series => {
            const fuse = new Fuse(series.data, fuseOptions)
            const found = fuse.search(searchTerm);
            // console.log(found);
            setSearchResults(found);
          });
      }
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Search | Prometheus</title>
      </Head>
      <Box grid="container">
        <Box grid="row">
          <Box grid="col" columns="12">
            <RadioGroup value={searchCategory} onChange={setSearchCategory}>
              <Radio value="movies" size="md">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} strokeWidth={1} />
                </RadioIndicator>
                <RadioLabel>Movies</RadioLabel>
              </Radio>
              <Radio value="series" size="md">
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} strokeWidth={1} />
                </RadioIndicator>
                <RadioLabel>Series</RadioLabel>
              </Radio>
            </RadioGroup>
          </Box>
        </Box>
        <Box grid="row">
          <Box grid="col" columns="12" columnsMd='5'>
            <FormControl>
              <FormControlLabel mb="$1">
                <FormControlLabelText>Search</FormControlLabelText>
              </FormControlLabel>
              <Input isRequired="true">
                <InputField
                  type="text"
                  onChangeText={(text) => setSearchTerm(text)}
                  value={searchTerm || ""}
                  placeholder="Search..."
                />
              </Input>
            </FormControl>
          </Box>
        </Box>
        <Box grid='row'>
          <Box grid='col' columns='2'>
              <Button variant="gradient" isDisabled={loading} onPress={() => searchCategory === 'movies' ? searchMovies() : searchSeries()}>
                <ButtonText>{loading ? 'Loading ...' : 'Search'}</ButtonText>
              </Button>
          </Box>
        </Box>
        {(searchResults) &&
          <Box grid="row">
            {searchResults.map(media => {
              const isSeries = (media.item.stream_type === 'series');
              const mediaID = isSeries ? media.item.series_id : media.item.stream_id;
              const mediaImg = isSeries ? media.item.cover : media.item.stream_icon;

              return (
                <MediaCard
                  key={mediaID}
                  mediaID={mediaID}
                  streamType={media.item.stream_type} 
                  name={media.item.name}
                  image={mediaImg}
                />
              );
            })}
          </Box>
        }
      </Box>
    </>
  );
}

export default Search;