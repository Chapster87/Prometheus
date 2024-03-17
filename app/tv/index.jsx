import { useState, useContext } from 'react';
import { AuthContext } from '../../components/session/AuthContext';

import Spark from '../../components/Spark';
import TVGroups from '../../components/tv/TVGroups';

function TV() {
  const [session, setSession] = useContext(AuthContext);
  const [activePage, setActivePage] = useState('Live TV');

  // initialize api engine
  const spark = new Spark(session);

  return (
    <TVGroups page={activePage} spark={spark} session={session} />
  );
}

export default TV;