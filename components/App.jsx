import { Box, Heading } from "@gluestack-ui/themed"

import TrendingMovies from './movies/TrendingMovies';

function App() {
  return (
    <>
      <Box grid='container-fluid'>
        <Box grid='row'>
          <Box grid='col' columns='12'>
            <Heading size='3xl'>Trending Movies</Heading>
          </Box>
        </Box>
      </Box>
      <TrendingMovies />
    </>
  );
}

export default App;