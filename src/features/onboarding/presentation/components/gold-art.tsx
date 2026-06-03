import { Text, View } from 'react-native';

import { BudgetinTheme } from '@/core/theme/theme';

import { onboardingArtStyles as styles } from './onboarding-art.styles';
import { OnboardingSlide } from './onboarding-art.types';

export function GoldArt({ slide }: { slide: OnboardingSlide }) {
  return (
    <View style={[styles.artCard, { backgroundColor: slide.accentSoft }]}>
      <View style={[styles.blob, styles.goldBlobLeft, { backgroundColor: '#F1F1FF' }]} />
      <View style={[styles.blob, styles.goldBlobBottom, { backgroundColor: slide.accentMuted }]} />
      <View style={[styles.goldCard, { backgroundColor: BudgetinTheme.surface.card }]}>
        <View style={styles.goldHeader}>
          <View>
            <View style={[styles.goldHeading, { backgroundColor: slide.accent }]} />
            <View style={[styles.goldSubheading, { backgroundColor: slide.accentMuted }]} />
          </View>
          <View style={[styles.goldCoin, { backgroundColor: slide.accent }]} />
        </View>
        <View style={styles.goldBars}>
          <View style={[styles.goldBarTall, { backgroundColor: slide.accent }]} />
          <View style={[styles.goldBarMedium, { backgroundColor: '#8F93FF' }]} />
          <View style={[styles.goldBarSmall, { backgroundColor: '#C8CAFF' }]} />
        </View>
      </View>
      <View style={[styles.goalPill, { backgroundColor: '#EFF0FF' }]}>
        <Text style={[styles.goalPillText, { color: slide.accent }]}>Target gram</Text>
      </View>
    </View>
  );
}
