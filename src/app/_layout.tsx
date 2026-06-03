import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/core/components/animated-icon';
import { initializeDatabase } from '@/core/database';
import { useAppStore } from '@/core/store';
import AppTabs from '@/core/components/app-tabs';

export default function TabLayout() {
  const colorScheme = useColorScheme();
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

        console.error('Failed to initialize database', error);
      });

    return () => {
      isMounted = false;
    };
  }, [failBootstrap, finishBootstrap, startBootstrap]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
