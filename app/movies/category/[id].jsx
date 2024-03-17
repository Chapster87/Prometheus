import { useState, useContext } from 'react';
import { AuthContext } from '../../../components/session/AuthContext';
import { useLocalSearchParams } from 'expo-router';

import Spark from '../../../components/Spark';
import VODList from '../../../components/vod/VODList';

export default function Page() {
  const [session, setSession] = useContext(AuthContext);
  const { id, name } = useLocalSearchParams(); 
  const [activeMedia, setActiveMedia] = useState('Movies');

  // initialize api engine
  const spark = new Spark(session);

  return (
    <VODList page={activeMedia} spark={spark} session={session} catId={id} catName={name} />
  );
}