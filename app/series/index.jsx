import { useState } from 'react';

import Spark from '../../components/Spark';
import VODCats from '../../components/vod/VODCats';

// initialize api engine
const spark = new Spark();

function App() {
  const [activePage, setActivePage] = useState('Series');

  return (
    <VODCats page={activePage} spark={spark} />
  );
}

export default App;