import { useContext } from 'react';
import Home from '../components/Home';
import { AuthContext } from '../components/session/AuthContext';

import { enableLegacyWebImplementation } from 'react-native-gesture-handler';

enableLegacyWebImplementation(true);

export default function Page() {
  const [session, setSession] = useContext(AuthContext);

  return (
    <Home session={session} />
  );
}