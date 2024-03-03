import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { GluestackUIProvider, Box, Link, LinkText, Text } from '@gluestack-ui/themed';
import { config } from '../../../config/gluestack-ui.config'

import Spark from '../../../components/Spark';
import TVGuide from '../../../components/tv/TVGuide';

// initialize api engine
const spark = new Spark();

export default function Page() {
  const { id, name } = useLocalSearchParams(); 
  const [activeMedia, setActiveMedia] = useState('Live TV');

  return (
    <GluestackUIProvider config={config}>
      <div>
        <Box grid='container'>
          <Box grid='row'>
            <Box grid='col' columns='12'>
              <Link href="/">
                <LinkText size="lg">Home</LinkText>
              </Link>
            </Box>
          </Box>
        </Box>
      </div>
      <TVGuide page={activeMedia} spark={spark} catId={id} catName={name} />
    </GluestackUIProvider>
  );
}