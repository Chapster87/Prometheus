import { useState, useEffect } from 'react';
import { Slot } from 'expo-router';
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from '../config/gluestack-ui.config'
import { supabase } from '../config/supabase'

import Header from '../components/Header';

import '../assets/scss/index.scss';
import SiteLock from '../components/SiteLock';

export default function HomeLayout() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    if (session) {
      console.log(session)
    }

  }, []);

  return (
    <GluestackUIProvider config={config} colorMode='dark'>
      <Header />
      <Slot />
      {/* {!session ? 
        <SiteLock />
      :
        <>
          <Header />
          <Slot />
        </>
      } */}
    </GluestackUIProvider>
  );
}