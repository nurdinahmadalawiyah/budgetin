import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
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
import { useLocale } from "@/core/i18n";
import { useAppStore, useBudgetingMethodId, useHasCompletedInteractiveQuiz } from "@/core/store";
import { useBudgetinTheme } from "@/core/theme/hooks/use-budgetin-theme";
import { BudgetinPalette, Fonts, Spacing } from "@/core/theme/theme";
import { BUDGETING_METHOD_NAME_KEYS } from "@/features/interactive-quiz/data/budgeting-method-keys";
import { MonthlyIncomeCard } from "@/features/budget-preview/components/monthly-income-card";

type BudgetPreviewViewProps = {
  onFinish: () => void;
};

export function BudgetPreviewView({ onFinish }: BudgetPreviewViewProps) {
  const [income, setIncome] = useState(0);

  const { t } = useLocale();

  const hasCompletedInteractiveQuiz = useHasCompletedInteractiveQuiz();
  const setHasCompletedInteractiveQuiz = useAppStore(
    (state) => state.setHasCompletedInteractiveQuiz,
  );
  const budgetingMethodId = useBudgetingMethodId();

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const theme = useBudgetinTheme();
  const isWide = width >= 900;

  const handleContinue = () => {
    onFinish();
  };

  const handleBack = () => {
    if (hasCompletedInteractiveQuiz) {
      setHasCompletedInteractiveQuiz(false);
    }
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
            <AppBar onBackPress={handleBack} />
          </View>

          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scrollContent}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            <View style={styles.contentBlock}>
              <View style={styles.sectionHeader}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>Auto-Budget Setup</Text>
                </View>

                <Text style={[styles.title, { color: theme.text.primary }]}>
                  Masukin Income Bulanan.
                </Text>

                <Text style={[styles.supportingText, { color: theme.text.secondary }]}>
                  Biar auto-budget kamu pas, masukin dulu income bulanan. Metode kamu:{" "}
                  <Text style={styles.textMethod}>{t(BUDGETING_METHOD_NAME_KEYS[budgetingMethodId ?? ""] ?? "")}</Text>.
                </Text>
              </View>

              <View style={styles.bodyContent}>
                <MonthlyIncomeCard value={income} onChange={setIncome} />
              </View>
            </View>
          </ScrollView>

          <View style={styles.ctaWrap}>
            <AppButton
              fullWidth={true}
              glow={true}
              onPress={handleContinue}
              size="md"
              style={styles.ctaButton}
              disabled={income === 0}
            >
              Lihat auto-budget preview <AppIcon name="arrow-forward" style={{ marginLeft: 8, color: theme.brand.ivory }} size={18} />
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
  bodyContent: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  contentBlock: {
    gap: 18,
  },
  ctaButton: {
    alignSelf: "stretch",
  },
  ctaWrap: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
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
  pill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(151, 226, 230, 0.2)",
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  pillText: {
    color: BudgetinPalette.mint,
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 12,
  },
  scrollContent: {
    flexGrow: 1,
    gap: 18,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    gap: 12,
    paddingHorizontal: Spacing.three,
  },
  screen: {
    flex: 1,
    overflow: "hidden",
  },
  supportingText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    lineHeight: 21,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 34,
    letterSpacing: -0.8,
    lineHeight: 37,
    textTransform: "uppercase",
  },
  topBar: {
    gap: 14,
    paddingBottom: 16,
    paddingHorizontal: Spacing.three,
    paddingTop: 4,
  },
  textMethod: {
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
