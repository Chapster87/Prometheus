import { useState, useContext } from 'react';
import { AuthContext } from '../../components/session/AuthContext';

import { Box, CircleIcon, Text, Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel } from '@gluestack-ui/themed';

import Spark from '../../components/Spark';

function Search() {
  const [session, setSession] = useContext(AuthContext);

  // initialize api engine
  const spark = new Spark(session);

  return (
    <Box grid="container">
      <Box grid="row">
        <Box grid="col" columns="12">
          <RadioGroup>
            <Radio value="movie" size="md">
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
        <Box grid="col" columns="12">
          
        </Box>
      </Box>
    </Box>
  );
}

export default Search;