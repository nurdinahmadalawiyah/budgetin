import { Text, View } from 'react-native';

import { BudgetinThemeTokens } from '@/core/theme/theme';

import { onboardingArtStyles as styles } from './onboarding-art.styles';
import { OnboardingSlide } from './onboarding-art.types';

export function QuizArt({
  slide,
  theme,
}: {
  slide: OnboardingSlide;
  theme: BudgetinThemeTokens;
}) {
  return (
    <View style={[styles.artCard, { backgroundColor: slide.accentSoft }]}>
      <View
        style={[styles.blob, styles.quizBlobTop, { backgroundColor: theme.onboarding.quizBlobSoft }]}
      />
      <View
        style={[
          styles.questionCard,
          { backgroundColor: theme.surface.card, boxShadow: theme.onboarding.cardShadow },
        ]}>
        <View style={[styles.questionBadge, { backgroundColor: slide.accent }]}>
          <Text style={[styles.questionBadgeText, { color: theme.text.inverted }]}>5Q</Text>
        </View>
        <View style={styles.questionLines}>
          <View style={[styles.questionLineWide, { backgroundColor: slide.accent }]} />
          <View style={[styles.questionLine, { backgroundColor: slide.accentMuted }]} />
        </View>
        <View style={styles.answerColumn}>
          <View style={[styles.answerChoice, { borderColor: slide.accentMuted }]}>
            <View style={[styles.answerRadio, { borderColor: slide.accent }]} />
            <View style={[styles.answerText, { backgroundColor: theme.onboarding.quizChoiceLine }]} />
          </View>
          <View
            style={[
              styles.answerChoice,
              { borderColor: slide.accent, backgroundColor: theme.onboarding.quizChoiceActive },
            ]}>
            <View style={[styles.answerRadioSelected, { backgroundColor: slide.accent }]} />
            <View style={[styles.answerTextSelected, { backgroundColor: slide.accentMuted }]} />
          </View>
          <View style={[styles.answerChoice, { borderColor: theme.onboarding.quizChoiceMuted }]}>
            <View style={[styles.answerRadio, { borderColor: slide.accentMuted }]} />
            <View style={[styles.answerText, { backgroundColor: theme.onboarding.quizChoiceLineAlt }]} />
          </View>
        </View>
      </View>
      <View style={[styles.floatingDotCluster, { backgroundColor: slide.accent }]} />
    </View>
  );
}
