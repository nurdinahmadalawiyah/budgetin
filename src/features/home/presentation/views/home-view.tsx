import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/core/components/animated-icon';
import { HintRow } from '@/core/components/hint-row';
import { useLocale } from '@/core/i18n';
import { ThemedText } from '@/core/components/themed-text';
import { ThemedView } from '@/core/components/themed-view';
import { WebBadge } from '@/core/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/core/theme/theme';

function getDevMenuHint(
  t: (scope: string, options?: Record<string, string | number | boolean | null | undefined>) => string,
) {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">{t('home.devToolsWeb')}</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">{t('home.devToolsDevice')}</ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">{t('home.devToolsSimulator', { shortcut })}</ThemedText>
  );
}

export function HomeView() {
  const { t } = useLocale();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            {t('home.title')}
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          {t('home.getStarted')}
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow
            title={t('home.tryEditing')}
            hint={<ThemedText type="code">{t('home.tryEditingHint')}</ThemedText>}
          />
          <HintRow title={t('home.devTools')} hint={getDevMenuHint(t)} />
          <HintRow
            title={t('home.freshStart')}
            hint={<ThemedText type="code">{t('home.freshStartHint')}</ThemedText>}
          />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
