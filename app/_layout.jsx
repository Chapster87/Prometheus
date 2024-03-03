import { Slot } from 'expo-router';
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from '../config/gluestack-ui.config'

import Header from '../components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/scss/index.scss';

export default function HomeLayout() {
  return (
    <GluestackUIProvider config={config}>
      <Header />
      <Slot />
    </GluestackUIProvider>
  );
}