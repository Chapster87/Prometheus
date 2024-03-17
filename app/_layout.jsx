import { useState, useEffect } from 'react';
import { Slot } from 'expo-router';
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from '../config/gluestack-ui.config'
import { supabase } from '../config/supabase'
import { AuthProvider } from '../components/session/AuthContext';

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

  }, []);

  return (
    <GluestackUIProvider config={config} colorMode='dark'>
      {session || process.env.EXPO_PUBLIC_USE_ENV === 'true' ? 
        <AuthProvider>
          <Header session={session} />
          <Slot />
        </AuthProvider>
      :
        <SiteLock />
      }

    </GluestackUIProvider>
  );
}