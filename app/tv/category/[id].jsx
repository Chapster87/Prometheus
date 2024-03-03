import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import Spark from '../../../components/Spark';
import TVGuide from '../../../components/tv/TVGuide';

// initialize api engine
const spark = new Spark();

export default function Page() {
  const { id, name } = useLocalSearchParams(); 
  const [activeMedia, setActiveMedia] = useState('Live TV');

  return (
    <TVGuide page={activeMedia} spark={spark} catId={id} catName={name} />
  );
}