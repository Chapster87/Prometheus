import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import AppLoading from 'expo-app-loading';
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from '../config/gluestack-ui.config'
import { supabase } from '../config/supabase'
import { AuthProvider } from '../components/session/AuthContext';
import {
  // NotoSans_100Thin,
  // NotoSans_100Thin_Italic,
  // NotoSans_200ExtraLight,
  // NotoSans_200ExtraLight_Italic,
  // NotoSans_300Light,
  // NotoSans_300Light_Italic,
  // NotoSans_400Regular,
  // NotoSans_400Regular_Italic,
  NotoSans_500Medium,
  // NotoSans_500Medium_Italic,
  NotoSans_600SemiBold,
  // NotoSans_600SemiBold_Italic,
  NotoSans_700Bold,
  // NotoSans_700Bold_Italic,
  // NotoSans_800ExtraBold,
  // NotoSans_800ExtraBold_Italic,
  NotoSans_900Black,
  // NotoSans_900Black_Italic,
} from '@expo-google-fonts/noto-sans';
import {
  // Jost_400Regular,
  // Jost_500Medium,
  Jost_600SemiBold,
  // Jost_700Bold,
} from '@expo-google-fonts/jost';
// import {
//   NotoSansDisplay_100Thin,
//   NotoSansDisplay_200ExtraLight,
//   NotoSansDisplay_300Light,
//   NotoSansDisplay_400Regular,
//   NotoSansDisplay_500Medium,
//   NotoSansDisplay_600SemiBold,
//   NotoSansDisplay_700Bold,
//   NotoSansDisplay_800ExtraBold,
//   NotoSansDisplay_900Black,
//   NotoSansDisplay_100Thin_Italic,
//   NotoSansDisplay_200ExtraLight_Italic,
//   NotoSansDisplay_300Light_Italic,
//   NotoSansDisplay_400Regular_Italic,
//   NotoSansDisplay_500Medium_Italic,
//   NotoSansDisplay_600SemiBold_Italic,
//   NotoSansDisplay_700Bold_Italic,
//   NotoSansDisplay_800ExtraBold_Italic,
//   NotoSansDisplay_900Black_Italic,
// } from '@expo-google-fonts/noto-sans-display';

import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';

import '../assets/css/index.css';
import SiteLock from '../components/SiteLock';

export default function HomeLayout() {
  const [session, setSession] = useState(null);
  let [fontsLoaded] = useFonts({
    // NotoSans_100Thin,
    // NotoSans_100Thin_Italic,
    // NotoSans_200ExtraLight,
    // NotoSans_200ExtraLight_Italic,
    // NotoSans_300Light,
    // NotoSans_300Light_Italic,
    // NotoSans_400Regular,
    // NotoSans_400Regular_Italic,
    NotoSans_500Medium,
    // NotoSans_500Medium_Italic,
    NotoSans_600SemiBold,
    // NotoSans_600SemiBold_Italic,
    NotoSans_700Bold,
    // NotoSans_700Bold_Italic,
    // NotoSans_800ExtraBold,
    // NotoSans_800ExtraBold_Italic,
    NotoSans_900Black,
    // NotoSans_900Black_Italic,
    // NotoSansDisplay_100Thin,
    // NotoSansDisplay_200ExtraLight,
    // NotoSansDisplay_300Light,
    // NotoSansDisplay_400Regular,
    // NotoSansDisplay_500Medium,
    // NotoSansDisplay_600SemiBold,
    // NotoSansDisplay_700Bold,
    // NotoSansDisplay_800ExtraBold,
    // NotoSansDisplay_900Black,
    // NotoSansDisplay_100Thin_Italic,
    // NotoSansDisplay_200ExtraLight_Italic,
    // NotoSansDisplay_300Light_Italic,
    // NotoSansDisplay_400Regular_Italic,
    // NotoSansDisplay_500Medium_Italic,
    // NotoSansDisplay_600SemiBold_Italic,
    // NotoSansDisplay_700Bold_Italic,
    // NotoSansDisplay_800ExtraBold_Italic,
    // NotoSansDisplay_900Black_Italic,
    // Jost_400Regular,
    // Jost_500Medium,
    Jost_600SemiBold,
    // Jost_700Bold,
    'NeonOne': require('../assets/fonts/NeonOne.otf'),
  });

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

  if (!fontsLoaded) {
    return <AppLoading />;
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