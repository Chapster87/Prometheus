import { useState } from 'react';
import { GluestackUIProvider, Box, Text } from "@gluestack-ui/themed"
import { config } from '../../config/gluestack-ui.config'
import { Link, LinkText } from "@gluestack-ui/themed"
import Button from 'react-bootstrap/Button';

import Spark from '../../components/Spark';
import TVGroups from '../../components/tv/TVGroups';

// initialize api engine
const spark = new Spark();

function App() {
  const [activePage, setActivePage] = useState('Live TV');

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
      <TVGroups page={activePage} spark={spark} />
    </GluestackUIProvider>
  );
}

export default App;