import { useState, useEffect, createContext } from "react";
import { supabase } from '../../config/supabase'

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      });
    // if(process.env.EXPO_PUBLIC_USE_ENV === 'false') {
    // }
    // else {
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

  return (
    <AuthContext.Provider value={[session, setSession]}>
      {props.children}
    </AuthContext.Provider>
  )
}