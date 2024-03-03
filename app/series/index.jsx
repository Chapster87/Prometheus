import { useState } from 'react';
import { GluestackUIProvider, Box, Text } from "@gluestack-ui/themed"
import { config } from '../../config/gluestack-ui.config'
import { Link, LinkText } from "@gluestack-ui/themed"
import Button from 'react-bootstrap/Button';

import Spark from '../../components/Spark';
import VODCats from '../../components/vod/VODCats';

// initialize api engine
const spark = new Spark();

function App() {
  const [activePage, setActivePage] = useState('Series');

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
      <VODCats page={activePage} spark={spark} />
    </GluestackUIProvider>
  );
}

export default App;