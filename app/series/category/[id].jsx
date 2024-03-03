import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import Spark from '../../../components/Spark';
import VODList from '../../../components/vod/VODList';

// initialize api engine
const spark = new Spark();

export default function Page() {
  const { id, name } = useLocalSearchParams(); 
  const [activeMedia, setActiveMedia] = useState('Series');

  return (
    <VODList page={activeMedia} spark={spark} catId={id} catName={name} />
  );
}