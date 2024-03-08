import { Slot } from 'expo-router';
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from '../config/gluestack-ui.config'

import Header from '../components/Header';

import '../assets/scss/index.scss';

export default function HomeLayout() {
  return (
    <GluestackUIProvider config={config} colorMode='dark'>
      <Header />
      <Slot />
    </GluestackUIProvider>
  );
}