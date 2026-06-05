import { Text, View } from 'react-native';

import { BudgetinThemeTokens } from '@/core/theme/theme';

import { onboardingArtStyles as styles } from './onboarding-art.styles';
import { OnboardingSlide } from './onboarding-art.types';

export function GoldArt({
  slide,
  theme,
}: {
  slide: OnboardingSlide;
  theme: BudgetinThemeTokens;
}) {
  return (
    <View style={[styles.artCard, { backgroundColor: slide.accentSoft }]}>
      <View
        style={[styles.blob, styles.goldBlobLeft, { backgroundColor: theme.onboarding.goldBlobSoft }]}
      />
      <View style={[styles.blob, styles.goldBlobBottom, { backgroundColor: slide.accentMuted }]} />
      <View
        style={[
          styles.goldCard,
          { backgroundColor: theme.surface.card, boxShadow: theme.onboarding.cardShadow },
        ]}>
        <View style={styles.goldHeader}>
          <View>
            <View style={[styles.goldHeading, { backgroundColor: slide.accent }]} />
            <View style={[styles.goldSubheading, { backgroundColor: slide.accentMuted }]} />
          </View>
          <View style={[styles.goldCoin, { backgroundColor: slide.accent }]} />
        </View>
        <View style={styles.goldBars}>
          <View style={[styles.goldBarTall, { backgroundColor: slide.accent }]} />
          <View style={[styles.goldBarMedium, { backgroundColor: theme.onboarding.goldBarMedium }]} />
          <View style={[styles.goldBarSmall, { backgroundColor: theme.onboarding.goldBarSmall }]} />
        </View>
      </View>
      <View
        style={[
          styles.goalPill,
          { backgroundColor: theme.onboarding.goldPill, boxShadow: theme.onboarding.goldPillShadow },
        ]}>
        <Text style={[styles.goalPillText, { color: slide.accent }]}>Target gram</Text>
      </View>
    </View>
  );
}
