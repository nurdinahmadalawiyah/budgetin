import { Text, View } from 'react-native';

import { BudgetinTheme } from '@/core/theme/theme';

import { onboardingArtStyles as styles } from './onboarding-art.styles';
import { OnboardingSlide } from './onboarding-art.types';

export function CashflowArt({ slide }: { slide: OnboardingSlide }) {
  return (
    <View style={[styles.artCard, { backgroundColor: slide.accentSoft }]}>
      <View style={[styles.blob, styles.cashBlobLeft, { backgroundColor: slide.accentMuted }]} />
      <View style={[styles.blob, styles.cashBlobRight, { backgroundColor: '#EEF7F4' }]} />
      <View style={[styles.poster, { backgroundColor: BudgetinTheme.surface.card }]}>
        <View style={styles.moneyRow}>
          <View style={[styles.moneyLineWide, { backgroundColor: slide.accent }]} />
          <View style={[styles.moneyDot, { backgroundColor: slide.accent }]} />
        </View>
        <View style={styles.moneyStack}>
          <View style={[styles.moneyTile, { backgroundColor: '#DCEAE6' }]} />
          <View style={[styles.moneyTile, { backgroundColor: '#BEDDD9' }]} />
          <View style={[styles.moneyTileTall, { backgroundColor: slide.accent }]} />
        </View>
        <View style={styles.summaryCard}>
          <View style={[styles.summaryChip, { backgroundColor: slide.accentSoft }]} />
          <View style={styles.summaryBars}>
            <View style={[styles.summaryBar, { backgroundColor: slide.accent }]} />
            <View style={[styles.summaryBarShort, { backgroundColor: slide.accentMuted }]} />
          </View>
        </View>
      </View>
      <View style={[styles.floatingBadge, { backgroundColor: slide.accent }]}>
        <Text style={styles.floatingBadgeText}>Auto setup</Text>
      </View>
    </View>
  );
}
