import App from '../components/App';

import { enableLegacyWebImplementation } from 'react-native-gesture-handler';

enableLegacyWebImplementation(true);

export default function Page() {
  return (
    <App />
  );
}