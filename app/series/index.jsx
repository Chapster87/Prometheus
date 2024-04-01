import { useState, useContext  } from 'react';
import { AuthContext } from '../../components/session/AuthContext';

import Spark from '../../components/Spark';
import MediaCategories from '../../components/media/MediaCategories';

function App() {
  const [session, setSession] = useContext(AuthContext);
  const [activePage, setActivePage] = useState('Series');

  // initialize api engine
  const spark = new Spark(session);

  return (
    <MediaCategories page={activePage} spark={spark} session={session} />
  );
}

export default App;