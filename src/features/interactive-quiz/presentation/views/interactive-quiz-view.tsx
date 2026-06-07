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
import { AppButton } from "@/core/components/ui/app-button";
import { AppIcon } from "@/core/components/ui/app-icon";
import { useAppStore } from "@/core/store";
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
  subtitle: string;
  title: string;
};

type QuizQuestion = {
  id: string;
  options: QuizOption[];
  title: string;
};

type Recommendation = {
  description: string;
  label: string;
  summary: string;
  id: string;
};

const questions: QuizQuestion[] = [
  {
    id: "expense-tracking",
    title: "BAGAIMANA CARA KAMU BIASANYA MENGATUR PENGELUARAN?",
    options: [
      {
        key: "track-all",
        method: "zero-based",
        subtitle: "Sadar arus pergi ke mana",
        title: "Catat detail setiap pengeluaran",
      },
      {
        key: "focus-biggest",
        method: "priority-based",
        subtitle: "Lebih fokus ke prioritas besar",
        title: "Bagi income ke kategori besar",
      },
      {
        key: "allocate-all",
        method: "anti-impulse",
        subtitle: "Kontrol penuh dari awal",
        title: "Setiap rupiah harus ada alokasi",
      },
      {
        key: "goal-first",
        method: "flexible",
        subtitle: "Goal jadi pusat budgeting",
        title: "Nabung khusus untuk tujuan",
      },
      {
        key: "freedom-first",
        method: "freedom",
        subtitle: "Long game mode",
        title: "Hemat demi kebebasan finansial",
      },
    ],
  },
  {
    id: "promo-response",
    title: "KALAU ADA PROMO ATAU FLASH SALE, BIASANYA KAMU...",
    options: [
      {
        key: "rarely-tempted",
        method: "anti-impulse",
        subtitle: "Disiplin itu kamu banget",
        title: "Tahan diri, jarang tergoda",
      },
      {
        key: "often-buy",
        method: "zero-based",
        subtitle: "Budget detail bantu rem",
        title: "Kadang tergoda, masih kontrol",
      },
      {
        key: "very-tempted",
        method: "priority-based",
        subtitle: "Butuh filter prioritas",
        title: "Sering tergoda",
      },
      {
        key: "compare-to-goal",
        method: "flexible",
        subtitle: "Tujuan tetap nomor satu",
        title: "Lihat dulu diarahkan ke goal",
      },
      {
        key: "investment-first",
        method: "freedom",
        subtitle: "Mindset future-first",
        title: "Tidak tergoda, fokus investasi",
      },
    ],
  },
  {
    id: "main-priority",
    title: "APA PRIORITAS UTAMA KAMU SEKARANG?",
    options: [
      {
        key: "daily-control",
        method: "zero-based",
        subtitle: "Biar cepat kelihatan polanya",
        title: "Kontrol cashflow harian",
      },
      {
        key: "needs-vs-wants",
        method: "priority-based",
        subtitle: "Mau hidup rapi tapi tetap enjoy",
        title: "Balance kebutuhan dan keinginan",
      },
      {
        key: "every-rupiah",
        method: "anti-impulse",
        subtitle: "Tidak ada yang nganggur",
        title: "Disiplin alokasi tiap rupiah",
      },
      {
        key: "special-goals",
        method: "flexible",
        subtitle: "Target spesifik dulu",
        title: "Dana khusus nikah/gadget/liburan",
      },
      {
        key: "long-term",
        method: "freedom",
        subtitle: "Agresif mendorong aset",
        title: "Kebebasan finansial jangka panjang",
      },
    ],
  },
  {
    id: "comfort-style",
    title: "KAMU LEBIH NYAMAN DENGAN METODE...",
    options: [
      {
        key: "simple-fast",
        method: "priority-based",
        subtitle: "Tidak ribet",
        title: "Sederhana dan cepat",
      },
      {
        key: "detail-disciplined",
        method: "zero-based",
        subtitle: "Checklist bikin tenang",
        title: "Detail dan disiplin",
      },
      {
        key: "every-rupiah-task",
        method: "anti-impulse",
        subtitle: "Full allocation mode",
        title: "Setiap rupiah ada tugas",
      },
      {
        key: "goal-target",
        method: "flexible",
        subtitle: "Goal-driven",
        title: "Fleksibel tapi target jelas",
      },
      {
        key: "future-extreme",
        method: "freedom",
        subtitle: "Advanced mode",
        title: "Hemat ekstrem demi masa depan",
      },
    ],
  },
  {
    id: "financial-focus",
    title: "FOKUS UTAMA KAMU DALAM KEUANGAN ADALAH...",
    options: [
      {
        key: "cut-daily",
        method: "zero-based",
        subtitle: "Mulai dari detail kecil",
        title: "Mengurangi pengeluaran harian",
      },
      {
        key: "short-goal",
        method: "flexible",
        subtitle: "Progress terasa cepat",
        title: "Nabung untuk tujuan pendek",
      },
      {
        key: "balance-life",
        method: "priority-based",
        subtitle: "Stabil dulu",
        title: "Menyeimbangkan hidup dan tabungan",
      },
      {
        key: "full-control",
        method: "anti-impulse",
        subtitle: "Precision budgeting",
        title: "Kontrol penuh setiap rupiah",
      },
      {
        key: "passive-income",
        method: "freedom",
        subtitle: "Financial freedom",
        title: "Investasi besar untuk pensiun dini",
      },
    ],
  },
];

const recommendations: Record<BudgetingMethod, Recommendation> = {
  "anti-impulse": {
    description:
      "Setiap pemasukan langsung dibagi jelas: kebutuhan, tabungan, sinking fund, dan spending limit. Cocok buat kamu yang ingin rem impulsif lebih kuat.",
    label: "Zero-Impulse Budget",
    summary:
      "Metode ini cocok kalau kamu tenang saat semua uang sudah punya tugas.",
    id: "anti-impulse",
  },
  flexible: {
    description:
      "Fokus utama ada pada target yang sedang dikejar. Kategori harian tetap ada, tapi pengambilan keputusan selalu dikembalikan ke goal terdekat.",
    label: "Goal-First Budget",
    summary:
      "Kamu terlihat nyaman kalau budgeting tetap luwes tapi tujuan besarnya jelas.",
    id: "flexible",
  },
  freedom: {
    description:
      "Budgeting dipakai untuk memperbesar porsi tabungan, investasi, dan runway hidup. Cocok kalau kamu rela hidup lebih lean demi percepatan target besar.",
    label: "Freedom Builder",
    summary: "Arahmu kuat ke aset dan kebebasan finansial jangka panjang.",
    id: "freedom",
  },
  "priority-based": {
    description:
      "Income dibagi ke beberapa bucket utama supaya keputusan belanja tetap ringan. Enak untuk dipakai konsisten tanpa merasa terlalu dikekang.",
    label: "Priority Buckets",
    summary:
      "Kamu butuh sistem yang simpel, cepat dibaca, dan tetap menjaga keseimbangan hidup.",
    id: "priority-based",
  },
  "zero-based": {
    description:
      "Setiap rupiah diberi peran dari awal bulan supaya sisa uang bukan misteri. Cocok untuk kamu yang suka detail, kontrol, dan evaluasi rutin.",
    label: "Zero-Based Budget",
    summary:
      "Kamu cenderung nyaman saat cashflow harian terlihat jelas dan terukur.",
    id: "zero-based",
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
  const theme = useBudgetinTheme();
  const isWide = width >= 900;
  const question = questions[questionIndex];
  const selectedAnswerKey = answers[question.id];
  const progress = (questionIndex + 1) / questions.length;
  const recommendation = useMemo(() => getRecommendation(answers), [answers]);
  const [progressAnimated] = useState(() => new Animated.Value(progress));
  const setBudgetingMethod = useAppStore((state) => state.setBudgetingMethod);

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
      console.log("showRecommendation", showRecommendation);
      setBudgetingMethod(recommendation.id);
      onFinish();
      return;
    }

    if (!selectedAnswerKey) {
      console.log("selectedAnswerKey", selectedAnswerKey);
      return;
    }

    if (questionIndex === questions.length - 1) {
      console.log("questionIndex === questions.length - 1", questionIndex === questions.length - 1);
      setShowRecommendation(true);
      return;
    }

    console.log("setQuestionIndex", setQuestionIndex);
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
                      Question {questionIndex + 1}/{questions.length}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.questionTitle,
                      { color: theme.text.primary },
                    ]}
                  >
                    {question.title}
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
                      subtitle={option.subtitle}
                      theme={theme}
                      title={option.title}
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
                      Hasil quiz kamu
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.questionTitle,
                      { color: theme.text.primary },
                    ]}
                  >
                    METODE BUDGETING YANG PALING COCOK BUAT KAMU.
                  </Text>
                  <Text
                    style={[
                      styles.supportingText,
                      { color: theme.text.secondary },
                    ]}
                  >
                    Dari jawabanmu, ini pola yang paling nyambung untuk bantu
                    atur cashflow tanpa terasa terlalu maksa.
                  </Text>
                </View>

                <QuizRecommendationCard
                  description={recommendation.description}
                  label={recommendation.label}
                  summary={recommendation.summary}
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
                ? "Masuk ke App"
                : questionIndex === questions.length - 1
                  ? "Lihat rekomendasi"
                  : !selectedAnswerKey
                    ? "Pilih jawaban dulu"
                    : "Lanjut"}
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
