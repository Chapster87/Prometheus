import { useState } from 'react';

import Spark from '../../components/Spark';
import TVGroups from '../../components/tv/TVGroups';

// initialize api engine
const spark = new Spark();

function App() {
  const [activePage, setActivePage] = useState('Live TV');

  return (
    <TVGroups page={activePage} spark={spark} />
  );
}

export default App;