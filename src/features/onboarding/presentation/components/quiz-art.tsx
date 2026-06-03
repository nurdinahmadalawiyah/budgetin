import { Text, View } from 'react-native';

import { BudgetinTheme } from '@/core/theme/theme';

import { onboardingArtStyles as styles } from './onboarding-art.styles';
import { OnboardingSlide } from './onboarding-art.types';

export function QuizArt({ slide }: { slide: OnboardingSlide }) {
  return (
    <View style={[styles.artCard, { backgroundColor: slide.accentSoft }]}>
      <View style={[styles.blob, styles.quizBlobTop, { backgroundColor: '#FDECE8' }]} />
      <View style={[styles.questionCard, { backgroundColor: BudgetinTheme.surface.card }]}>
        <View style={[styles.questionBadge, { backgroundColor: slide.accent }]}>
          <Text style={styles.questionBadgeText}>5Q</Text>
        </View>
        <View style={styles.questionLines}>
          <View style={[styles.questionLineWide, { backgroundColor: slide.accent }]} />
          <View style={[styles.questionLine, { backgroundColor: slide.accentMuted }]} />
        </View>
        <View style={styles.answerColumn}>
          <View style={[styles.answerChoice, { borderColor: slide.accentMuted }]}>
            <View style={[styles.answerRadio, { borderColor: slide.accent }]} />
            <View style={[styles.answerText, { backgroundColor: '#efd8c7' }]} />
          </View>
          <View
            style={[
              styles.answerChoice,
              { borderColor: slide.accent, backgroundColor: '#FDF0EE' },
            ]}>
            <View style={[styles.answerRadioSelected, { backgroundColor: slide.accent }]} />
            <View style={[styles.answerTextSelected, { backgroundColor: slide.accentMuted }]} />
          </View>
          <View style={[styles.answerChoice, { borderColor: '#ebcfb5' }]}>
            <View style={[styles.answerRadio, { borderColor: slide.accentMuted }]} />
            <View style={[styles.answerText, { backgroundColor: '#f0dcc8' }]} />
          </View>
        </View>
      </View>
      <View style={[styles.floatingDotCluster, { backgroundColor: slide.accent }]} />
    </View>
  );
}
