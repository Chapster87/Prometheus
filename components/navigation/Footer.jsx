import { useState, useEffect } from 'react';
import { Box, HStack, Text } from '@gluestack-ui/themed';

import TmdbLongSvg from '../svgs/TmdbLong';

function Footer() {

  useEffect(() => {
    
  }, []);

  return (
    <>
      <Box grid='container-fluid'>
        <Box grid='row' sx={{ background: 'rgba(0, 0, 0, 0.6)' }}>
          <Box grid='col' columns='12'>
            <Box grid="container">
              <Box grid='row'>
                <Box grid='col' columns='12'>
                </Box>
              </Box>
            </Box>
            <HStack sx={{ justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
              <Text sx={{ marginRight: 8 }}>Data sourced from</Text>
              <TmdbLongSvg height={14}/>
            </HStack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Footer;