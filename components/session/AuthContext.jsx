import { useState, useEffect, createContext } from "react";
import { supabase } from '../../config/supabase'

export const AuthContext = createContext();

export const AuthProvider = (props) => {
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
    <AuthContext.Provider value={[session, setSession]}>
      {props.children}
    </AuthContext.Provider>
  )
}