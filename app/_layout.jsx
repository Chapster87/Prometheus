import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Slot } from 'expo-router';
import AppLoading from 'expo-app-loading';
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from '../config/gluestack-ui.config'
import { supabase } from '../config/supabase'
import { AuthProvider } from '../components/session/AuthContext';

import useFonts from './hooks/useFonts';

import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';

import '../assets/css/index.css';
import SiteLock from '../components/SiteLock';

export default function HomeLayout() {
  const [IsReady, SetIsReady] = useState(false);
  const [session, setSession] = useState(null);

  const LoadFonts = async () => {
    await useFonts();
  };

  useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    // if(process.env.EXPO_PUBLIC_USE_ENV === 'false') {
    // } else {
    //   setSession(
    //     {
    //       user: {
    //         user_metadata: {
    //           firstName: 'Demo',
    //           lastName: 'User',
    //           id: '1',
    //           tmdbApiKey: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    //           tmdbApiReadAccessToken: process.env.EXPO_PUBLIC_TMDB_API_READ_ACCESS_TOKEN,
    //           xcUrl: process.env.EXPO_PUBLIC_XC_URL,
    //           xcUsername: process.env.EXPO_PUBLIC_XC_USERNAME,
    //           xcPassword: process.env.EXPO_PUBLIC_XC_PASSWORD
    //         }
    //       }
    //     }
    //   );
    // }
  }, []);

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  } else {
    return (
      <GluestackUIProvider config={config} colorMode='dark'>
        {session || process.env.EXPO_PUBLIC_USE_ENV === 'true' ?
          <AuthProvider> 
            <Header session={session} />
            <Slot />
            <Footer />
          </AuthProvider>
        :
          <SiteLock />
        }

      </GluestackUIProvider>
    );
  }
}