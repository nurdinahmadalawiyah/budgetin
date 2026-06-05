import 'react-native-gesture-handler';

import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';

import { AnimatedSplashOverlay } from '@/core/components/animated-icon';
import { initializeDatabase } from '@/core/database';
import { RootNavigator } from '@/core/navigation/root-navigator';
import { useAppStore } from '@/core/store';
import { appLogger } from '@/core/utils';

const appNavigationTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#12100F',
    border: '#2A2724',
    card: '#1A1816',
    primary: '#F06B61',
    text: '#FFF6EC',
  },
} as const;

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  const failBootstrap = useAppStore((state) => state.failBootstrap);
  const finishBootstrap = useAppStore((state) => state.finishBootstrap);
  const startBootstrap = useAppStore((state) => state.startBootstrap);

  useEffect(() => {
    let isMounted = true;

    startBootstrap();
    initializeDatabase()
      .then(() => {
        if (isMounted) {
          finishBootstrap();
        }
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : 'Unknown database error';

        if (isMounted) {
          failBootstrap(message);
        }

        appLogger.error('Failed to initialize database', error);
      });

    return () => {
      isMounted = false;
    };
  }, [failBootstrap, finishBootstrap, startBootstrap]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={appNavigationTheme}>
        <AnimatedSplashOverlay />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
