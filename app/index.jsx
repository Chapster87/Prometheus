import { useContext } from 'react';
import App from '../components/App';
import { AuthContext } from '../components/session/AuthContext';

import { enableLegacyWebImplementation } from 'react-native-gesture-handler';

enableLegacyWebImplementation(true);

export default function Page() {
  const [session, setSession] = useContext(AuthContext);

  return (
    <App session={session} />
  );
}