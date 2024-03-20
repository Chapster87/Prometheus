import { AppState, Platform } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ffxnwmcpjdfnymkcihpy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmeG53bWNwamRmbnlta2NpaHB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzNjQ2NTUsImV4cCI6MjAyNTk0MDY1NX0.BhZUf6hBY9LICbUIRvavL2AaU5fqvf6BaT7BwV-s_24'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // https://github.com/supabase/supabase-js/issues/870
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})