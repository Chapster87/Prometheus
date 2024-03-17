import { useState, useContext } from 'react';
import { AuthContext } from '../../../components/session/AuthContext';
import { useLocalSearchParams } from 'expo-router';

import Spark from '../../../components/Spark';
import TVGuide from '../../../components/tv/TVGuide';

export default function Page() {
  const [session, setSession] = useContext(AuthContext);
  const { id, name } = useLocalSearchParams(); 
  const [activeMedia, setActiveMedia] = useState('Live TV');

  // initialize api engine
  const spark = new Spark(session);

  return (
    <TVGuide page={activeMedia} spark={spark} session={session} catId={id} catName={name} />
  );
}