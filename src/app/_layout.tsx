import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AnimatedSplashOverlay } from '@/core/components/animated-icon';
import { initializeDatabase } from '@/core/database';
import { useAppStore } from '@/core/store';
import { appLogger } from '@/core/utils';

export default function RootLayout() {
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

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DarkTheme}>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
