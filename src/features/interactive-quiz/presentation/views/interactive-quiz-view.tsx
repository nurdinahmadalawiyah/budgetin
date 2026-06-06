import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppBar } from "@/core/components/layout/app-bar";
import { PhoneShell } from "@/core/components/layout/phone-shell";
import { useLocale } from "@/core/i18n";
import { AppButton } from "@/core/components/ui/app-button";
import { AppIcon } from "@/core/components/ui/app-icon";
import { useBudgetinTheme } from "@/core/theme/hooks/use-budgetin-theme";
import { BudgetinPalette, Fonts, Spacing } from "@/core/theme/theme";
import { QuizOptionCard } from "@/features/interactive-quiz/presentation/components/quiz-option-card";
import { QuizRecommendationCard } from "@/features/interactive-quiz/presentation/components/quiz-recommendation-card";

type InteractiveQuizViewProps = {
  onFinish: () => void;
};

type BudgetingMethod =
  | "anti-impulse"
  | "flexible"
  | "freedom"
  | "priority-based"
  | "zero-based";

type QuizOption = {
  key: string;
  method: BudgetingMethod;
  subtitleKey: string;
  titleKey: string;
};

type QuizQuestion = {
  id: string;
  options: QuizOption[];
  titleKey: string;
};

type Recommendation = {
  descriptionKey: string;
  labelKey: string;
  summaryKey: string;
};

const questions: QuizQuestion[] = [
  {
    id: "expense-tracking",
    titleKey: "interactiveQuiz.questions.expenseTracking.title",
    options: [
      {
        key: "track-all",
        method: "zero-based",
        subtitleKey: "interactiveQuiz.questions.expenseTracking.options.trackAll.subtitle",
        titleKey: "interactiveQuiz.questions.expenseTracking.options.trackAll.title",
      },
      {
        key: "focus-biggest",
        method: "priority-based",
        subtitleKey: "interactiveQuiz.questions.expenseTracking.options.focusBiggest.subtitle",
        titleKey: "interactiveQuiz.questions.expenseTracking.options.focusBiggest.title",
      },
      {
        key: "allocate-all",
        method: "anti-impulse",
        subtitleKey: "interactiveQuiz.questions.expenseTracking.options.allocateAll.subtitle",
        titleKey: "interactiveQuiz.questions.expenseTracking.options.allocateAll.title",
      },
      {
        key: "goal-first",
        method: "flexible",
        subtitleKey: "interactiveQuiz.questions.expenseTracking.options.goalFirst.subtitle",
        titleKey: "interactiveQuiz.questions.expenseTracking.options.goalFirst.title",
      },
      {
        key: "freedom-first",
        method: "freedom",
        subtitleKey: "interactiveQuiz.questions.expenseTracking.options.freedomFirst.subtitle",
        titleKey: "interactiveQuiz.questions.expenseTracking.options.freedomFirst.title",
      },
    ],
  },
  {
    id: "promo-response",
    titleKey: "interactiveQuiz.questions.promoResponse.title",
    options: [
      {
        key: "rarely-tempted",
        method: "anti-impulse",
        subtitleKey: "interactiveQuiz.questions.promoResponse.options.rarelyTempted.subtitle",
        titleKey: "interactiveQuiz.questions.promoResponse.options.rarelyTempted.title",
      },
      {
        key: "often-buy",
        method: "zero-based",
        subtitleKey: "interactiveQuiz.questions.promoResponse.options.oftenBuy.subtitle",
        titleKey: "interactiveQuiz.questions.promoResponse.options.oftenBuy.title",
      },
      {
        key: "very-tempted",
        method: "priority-based",
        subtitleKey: "interactiveQuiz.questions.promoResponse.options.veryTempted.subtitle",
        titleKey: "interactiveQuiz.questions.promoResponse.options.veryTempted.title",
      },
      {
        key: "compare-to-goal",
        method: "flexible",
        subtitleKey: "interactiveQuiz.questions.promoResponse.options.compareToGoal.subtitle",
        titleKey: "interactiveQuiz.questions.promoResponse.options.compareToGoal.title",
      },
      {
        key: "investment-first",
        method: "freedom",
        subtitleKey: "interactiveQuiz.questions.promoResponse.options.investmentFirst.subtitle",
        titleKey: "interactiveQuiz.questions.promoResponse.options.investmentFirst.title",
      },
    ],
  },
  {
    id: "main-priority",
    titleKey: "interactiveQuiz.questions.mainPriority.title",
    options: [
      {
        key: "daily-control",
        method: "zero-based",
        subtitleKey: "interactiveQuiz.questions.mainPriority.options.dailyControl.subtitle",
        titleKey: "interactiveQuiz.questions.mainPriority.options.dailyControl.title",
      },
      {
        key: "needs-vs-wants",
        method: "priority-based",
        subtitleKey: "interactiveQuiz.questions.mainPriority.options.needsVsWants.subtitle",
        titleKey: "interactiveQuiz.questions.mainPriority.options.needsVsWants.title",
      },
      {
        key: "every-rupiah",
        method: "anti-impulse",
        subtitleKey: "interactiveQuiz.questions.mainPriority.options.everyRupiah.subtitle",
        titleKey: "interactiveQuiz.questions.mainPriority.options.everyRupiah.title",
      },
      {
        key: "special-goals",
        method: "flexible",
        subtitleKey: "interactiveQuiz.questions.mainPriority.options.specialGoals.subtitle",
        titleKey: "interactiveQuiz.questions.mainPriority.options.specialGoals.title",
      },
      {
        key: "long-term",
        method: "freedom",
        subtitleKey: "interactiveQuiz.questions.mainPriority.options.longTerm.subtitle",
        titleKey: "interactiveQuiz.questions.mainPriority.options.longTerm.title",
      },
    ],
  },
  {
    id: "comfort-style",
    titleKey: "interactiveQuiz.questions.comfortStyle.title",
    options: [
      {
        key: "simple-fast",
        method: "priority-based",
        subtitleKey: "interactiveQuiz.questions.comfortStyle.options.simpleFast.subtitle",
        titleKey: "interactiveQuiz.questions.comfortStyle.options.simpleFast.title",
      },
      {
        key: "detail-disciplined",
        method: "zero-based",
        subtitleKey: "interactiveQuiz.questions.comfortStyle.options.detailDisciplined.subtitle",
        titleKey: "interactiveQuiz.questions.comfortStyle.options.detailDisciplined.title",
      },
      {
        key: "every-rupiah-task",
        method: "anti-impulse",
        subtitleKey: "interactiveQuiz.questions.comfortStyle.options.everyRupiahTask.subtitle",
        titleKey: "interactiveQuiz.questions.comfortStyle.options.everyRupiahTask.title",
      },
      {
        key: "goal-target",
        method: "flexible",
        subtitleKey: "interactiveQuiz.questions.comfortStyle.options.goalTarget.subtitle",
        titleKey: "interactiveQuiz.questions.comfortStyle.options.goalTarget.title",
      },
      {
        key: "future-extreme",
        method: "freedom",
        subtitleKey: "interactiveQuiz.questions.comfortStyle.options.futureExtreme.subtitle",
        titleKey: "interactiveQuiz.questions.comfortStyle.options.futureExtreme.title",
      },
    ],
  },
  {
    id: "financial-focus",
    titleKey: "interactiveQuiz.questions.financialFocus.title",
    options: [
      {
        key: "cut-daily",
        method: "zero-based",
        subtitleKey: "interactiveQuiz.questions.financialFocus.options.cutDaily.subtitle",
        titleKey: "interactiveQuiz.questions.financialFocus.options.cutDaily.title",
      },
      {
        key: "short-goal",
        method: "flexible",
        subtitleKey: "interactiveQuiz.questions.financialFocus.options.shortGoal.subtitle",
        titleKey: "interactiveQuiz.questions.financialFocus.options.shortGoal.title",
      },
      {
        key: "balance-life",
        method: "priority-based",
        subtitleKey: "interactiveQuiz.questions.financialFocus.options.balanceLife.subtitle",
        titleKey: "interactiveQuiz.questions.financialFocus.options.balanceLife.title",
      },
      {
        key: "full-control",
        method: "anti-impulse",
        subtitleKey: "interactiveQuiz.questions.financialFocus.options.fullControl.subtitle",
        titleKey: "interactiveQuiz.questions.financialFocus.options.fullControl.title",
      },
      {
        key: "passive-income",
        method: "freedom",
        subtitleKey: "interactiveQuiz.questions.financialFocus.options.passiveIncome.subtitle",
        titleKey: "interactiveQuiz.questions.financialFocus.options.passiveIncome.title",
      },
    ],
  },
];

const recommendations: Record<BudgetingMethod, Recommendation> = {
  "anti-impulse": {
    descriptionKey: "interactiveQuiz.recommendation.antiImpulse.description",
    labelKey: "interactiveQuiz.recommendation.antiImpulse.label",
    summaryKey: "interactiveQuiz.recommendation.antiImpulse.summary",
  },
  flexible: {
    descriptionKey: "interactiveQuiz.recommendation.flexible.description",
    labelKey: "interactiveQuiz.recommendation.flexible.label",
    summaryKey: "interactiveQuiz.recommendation.flexible.summary",
  },
  freedom: {
    descriptionKey: "interactiveQuiz.recommendation.freedom.description",
    labelKey: "interactiveQuiz.recommendation.freedom.label",
    summaryKey: "interactiveQuiz.recommendation.freedom.summary",
  },
  "priority-based": {
    descriptionKey: "interactiveQuiz.recommendation.priorityBased.description",
    labelKey: "interactiveQuiz.recommendation.priorityBased.label",
    summaryKey: "interactiveQuiz.recommendation.priorityBased.summary",
  },
  "zero-based": {
    descriptionKey: "interactiveQuiz.recommendation.zeroBased.description",
    labelKey: "interactiveQuiz.recommendation.zeroBased.label",
    summaryKey: "interactiveQuiz.recommendation.zeroBased.summary",
  },
};

function getRecommendation(answers: Record<string, string | undefined>) {
  const scores = {
    "anti-impulse": 0,
    flexible: 0,
    freedom: 0,
    "priority-based": 0,
    "zero-based": 0,
  } satisfies Record<BudgetingMethod, number>;

  questions.forEach((question) => {
    const selectedKey = answers[question.id];
    const option = question.options.find((item) => item.key === selectedKey);

    if (option) {
      scores[option.method] += 1;
    }
  });

  const [winner] = Object.entries(scores).sort((left, right) => {
    if (right[1] !== left[1]) {
      return right[1] - left[1];
    }

    return left[0].localeCompare(right[0]);
  });

  return recommendations[winner[0] as BudgetingMethod];
}

export function InteractiveQuizView({ onFinish }: InteractiveQuizViewProps) {
  const [answers, setAnswers] = useState<Record<string, string | undefined>>(
    {},
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { t } = useLocale();
  const theme = useBudgetinTheme();
  const isWide = width >= 900;
  const question = questions[questionIndex];
  const selectedAnswerKey = answers[question.id];
  const progress = (questionIndex + 1) / questions.length;
  const recommendation = useMemo(() => getRecommendation(answers), [answers]);
  const [progressAnimated] = useState(() => new Animated.Value(progress));

  useEffect(() => {
    Animated.timing(progressAnimated, {
      toValue: showRecommendation ? 1 : progress,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnimated, showRecommendation]);

  const progressWidth = progressAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const selectAnswer = (optionKey: string) => {
    setAnswers((current) => ({
      ...current,
      [question.id]: optionKey,
    }));
  };

  const handleBack = () => {
    if (showRecommendation) {
      setShowRecommendation(false);
      return;
    }

    if (questionIndex > 0) {
      setQuestionIndex((current) => current - 1);
    }
  };

  const handleContinue = () => {
    if (showRecommendation) {
      onFinish();
      return;
    }

    if (!selectedAnswerKey) {
      return;
    }

    if (questionIndex === questions.length - 1) {
      setShowRecommendation(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
  };

  return (
    <>
      <StatusBar style={theme.statusBarStyle} />

      <View
        style={[
          styles.screen,
          { backgroundColor: theme.surface.card },
          {
            paddingTop: isWide ? 28 : Math.max(insets.top, 14),
            paddingBottom: isWide ? 28 : Math.max(insets.bottom, 14),
          },
        ]}
      >
        <View
          style={[
            styles.backgroundGlow,
            styles.backgroundGlowCoral,
            {
              backgroundColor: "transparent",
              boxShadow: `0 0 340px 144px ${theme.onboarding.backgroundGlowCoral}`,
              pointerEvents: "none",
            },
          ]}
        />
        <View
          style={[
            styles.backgroundGlow,
            styles.backgroundGlowViolet,
            {
              backgroundColor: "transparent",
              boxShadow: `0 0 360px 156px ${theme.onboarding.backgroundGlowViolet}`,
              pointerEvents: "none",
            },
          ]}
        />

        <PhoneShell
          compactStyle={styles.phoneShellCompact}
          style={styles.phoneShell}
          wideShadow={theme.onboarding.shadow}
          wideStyle={styles.phoneShellWide}
        >
          <View style={styles.topBar}>
            <AppBar
              onBackPress={
                !showRecommendation && questionIndex === 0
                  ? undefined
                  : handleBack
              }
            />

            <View
              style={[
                styles.progressTrack,
                { backgroundColor: theme.onboarding.pageIndicatorInactive },
              ]}
            >
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: "#BFE4B1",
                    width: progressWidth,
                  },
                ]}
              />
            </View>
          </View>

          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scrollContent}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            {!showRecommendation ? (
              <View style={styles.contentBlock}>
                <View style={styles.questionHeader}>
                  <View style={styles.questionPill}>
                    <Text style={styles.questionPillText}>
                      {t("interactiveQuiz.questionCounter", {
                        current: questionIndex + 1,
                        total: questions.length,
                      })}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.questionTitle,
                      { color: theme.text.primary },
                    ]}
                  >
                    {t(question.titleKey)}
                  </Text>
                </View>

                <View style={styles.optionsList}>
                  {question.options.map((option, optionIndex) => (
                    <QuizOptionCard
                      key={option.key}
                      index={optionIndex + 1}
                      isSelected={selectedAnswerKey === option.key}
                      onPress={() => {
                        selectAnswer(option.key);
                      }}
                      subtitle={t(option.subtitleKey)}
                      theme={theme}
                      title={t(option.titleKey)}
                    />
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.contentBlock}>
                <View style={styles.questionHeader}>
                  <View style={[styles.questionPill, styles.questionPillCoral]}>
                    <Text
                      style={[
                        styles.questionPillText,
                        styles.questionPillTextCoral,
                      ]}
                    >
                      {t("interactiveQuiz.recommendation.pill")}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.questionTitle,
                      { color: theme.text.primary },
                    ]}
                  >
                    {t("interactiveQuiz.recommendation.title")}
                  </Text>
                  <Text
                    style={[
                      styles.supportingText,
                      { color: theme.text.secondary },
                    ]}
                  >
                    {t("interactiveQuiz.recommendation.intro")}
                  </Text>
                </View>

                <QuizRecommendationCard
                  description={t(recommendation.descriptionKey)}
                  eyebrow={t("interactiveQuiz.recommendation.eyebrow")}
                  label={t(recommendation.labelKey)}
                  summary={t(recommendation.summaryKey)}
                  theme={theme}
                />
              </View>
            )}
          </ScrollView>

          <View style={styles.ctaWrap}>
            <AppButton
              disabled={!showRecommendation && !selectedAnswerKey}
              fullWidth={true}
              glow={true}
              iconRight={
                showRecommendation || !selectedAnswerKey ? undefined : (
                  <AppIcon
                    family="ion"
                    name="arrow-forward"
                    size={18}
                    tone="inverted"
                  />
                )
              }
              onPress={handleContinue}
              size="md"
              style={styles.ctaButton}
            >
              {showRecommendation
                ? t("interactiveQuiz.cta.enterApp")
                : questionIndex === questions.length - 1
                  ? t("interactiveQuiz.cta.seeRecommendation")
                  : !selectedAnswerKey
                    ? t("interactiveQuiz.cta.chooseAnswerFirst")
                    : t("common.continue")}
            </AppButton>
          </View>
        </PhoneShell>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundGlow: {
    backgroundColor: "transparent",
    borderRadius: 999,
    position: "absolute",
  },
  backgroundGlowCoral: {
    bottom: 168,
    height: 0,
    left: 26,
    width: 0,
  },
  backgroundGlowViolet: {
    height: 0,
    right: 36,
    top: 78,
    width: 0,
  },
  contentBlock: {
    gap: 18,
  },
  ctaButton: {
    alignSelf: "stretch",
  },
  ctaWrap: {
    paddingTop: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  optionsList: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  phoneShell: {
    minHeight: 760,
  },
  phoneShellCompact: {
    borderRadius: 0,
    flex: 1,
    minHeight: undefined,
    paddingBottom: 18,
    paddingTop: Spacing.two,
  },
  phoneShellWide: {
    borderRadius: 42,
    minHeight: 860,
    paddingBottom: 28,
    paddingTop: 18,
  },
  progressFill: {
    borderRadius: 999,
    height: "100%",
  },
  progressTrack: {
    borderRadius: 999,
    height: 8,
    overflow: "hidden",
  },
  questionHeader: {
    gap: 12,
    paddingHorizontal: Spacing.three,
  },
  questionPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(151, 226, 230, 0.2)",
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  questionPillCoral: {
    backgroundColor: "rgba(240, 107, 97, 0.18)",
  },
  questionPillText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 12,
    color: BudgetinPalette.mint,
  },
  questionPillTextCoral: {
    color: "#FFB5AF",
  },
  questionTitle: {
    fontFamily: Fonts.display,
    fontSize: 34,
    letterSpacing: -0.8,
    lineHeight: 37,
    textTransform: "uppercase",
  },
  screen: {
    flex: 1,
    overflow: "hidden",
  },
  scrollContent: {
    flexGrow: 1,
    gap: 18,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  supportingText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },
  topBar: {
    gap: 14,
    paddingHorizontal: Spacing.three,
    paddingBottom: 16,
    paddingTop: 4,
  },
});
