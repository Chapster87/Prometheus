import { useState } from 'react';
import { Box } from "@gluestack-ui/themed"

import TrendingMovies from './movies/TrendingMovies';

function App() {
  return (
    <>
      <Box grid='container-fluid'>
        <Box grid='row'>
          <Box grid='col' columns='12'><h1>Trending Movies</h1></Box>
        </Box>
      </Box>
      <TrendingMovies />
    </>
  );
}

export default App;