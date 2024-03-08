import { Box, Heading } from "@gluestack-ui/themed"

import TrendingMovies from './movies/TrendingMovies';
import TrendingSeries from './series/TrendingSeries';

function App() {
  return (
    <>
      <Box grid='container'>
        <Box grid='row'>
          <Box grid='col' columns='12'>
            <Heading size='3xl'>Trending Movies</Heading>
          </Box>
        </Box>
      </Box>
      <Box grid='container-fluid'>
        <Box grid='row'>
          <Box grid='col' columns='12'>
            <TrendingMovies />
          </Box>
        </Box>
        <Box grid='row'>
          <Box grid='col' columns='12'>
            <TrendingSeries />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;