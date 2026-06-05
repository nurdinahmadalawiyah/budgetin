import { Text, View } from 'react-native';

import { BudgetinThemeTokens } from '@/core/theme/theme';

import { onboardingArtStyles as styles } from './onboarding-art.styles';
import { OnboardingSlide } from './onboarding-art.types';

export function CashflowArt({
  slide,
  theme,
}: {
  slide: OnboardingSlide;
  theme: BudgetinThemeTokens;
}) {
  return (
    <View style={[styles.artCard, { backgroundColor: slide.accentSoft }]}>
      <View style={[styles.blob, styles.cashBlobLeft, { backgroundColor: slide.accentMuted }]} />
      <View
        style={[styles.blob, styles.cashBlobRight, { backgroundColor: theme.onboarding.cashBlobSoft }]}
      />
      <View style={[styles.poster, { backgroundColor: theme.surface.card, boxShadow: theme.onboarding.cardShadow }]}>
        <View style={styles.moneyRow}>
          <View style={[styles.moneyLineWide, { backgroundColor: slide.accent }]} />
          <View style={[styles.moneyDot, { backgroundColor: slide.accent }]} />
        </View>
        <View style={styles.moneyStack}>
          <View style={[styles.moneyTile, { backgroundColor: theme.onboarding.cashTileMuted }]} />
          <View style={[styles.moneyTile, { backgroundColor: theme.onboarding.cashTileStrong }]} />
          <View style={[styles.moneyTileTall, { backgroundColor: slide.accent }]} />
        </View>
        <View style={[styles.summaryCard, { backgroundColor: theme.onboarding.summaryCard }]}>
          <View style={[styles.summaryChip, { backgroundColor: slide.accentSoft }]} />
          <View style={styles.summaryBars}>
            <View style={[styles.summaryBar, { backgroundColor: slide.accent }]} />
            <View style={[styles.summaryBarShort, { backgroundColor: theme.brand.coral }]} />
          </View>
        </View>
      </View>
      <View style={[styles.floatingBadge, { backgroundColor: slide.accent }]}>
        <Text style={[styles.floatingBadgeText, { color: theme.text.inverted }]}>Auto setup</Text>
      </View>
    </View>
  );
}
