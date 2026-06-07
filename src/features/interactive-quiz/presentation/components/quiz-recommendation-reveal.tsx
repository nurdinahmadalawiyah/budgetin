import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useBudgetinTheme } from "@/core/theme/hooks/use-budgetin-theme";
import { budgetinGlassTintStyle, createGlassCardStyles } from "@/core/theme/glass";
import { Fonts, Spacing } from "@/core/theme/theme";

export type QuizProfileId =
  | "anti-impulse"
  | "flexible"
  | "freedom"
  | "priority-based"
  | "zero-based";

type QuizRecommendationRevealProps = {
  description: string;
  onSwitchMethod: () => void;
  pillLabel: string;
  profileId: QuizProfileId;
  subtitle: string;
  switchLabel: string;
  switchPrompt: string;
  title: string;
};

const glassStyles = createGlassCardStyles(34);

const profileVisualMap: Record<
  QuizProfileId,
  {
    badge: number;
    themeKey:
      | "antiImpulse"
      | "flexible"
      | "freedom"
      | "priorityBased"
      | "zeroBased";
  }
> = {
  "anti-impulse": {
    badge: require("@/assets/badges/badge_zen_accountant.svg"),
    themeKey: "antiImpulse",
  },
  flexible: {
    badge: require("@/assets/badges/badge_goal_crusher.svg"),
    themeKey: "flexible",
  },
  freedom: {
    badge: require("@/assets/badges/badge_freedom_fighter.svg"),
    themeKey: "freedom",
  },
  "priority-based": {
    badge: require("@/assets/badges/badge_balanced_harmonist.svg"),
    themeKey: "priorityBased",
  },
  "zero-based": {
    badge: require("@/assets/badges/badge_money_architect.svg"),
    themeKey: "zeroBased",
  },
};

export function QuizRecommendationReveal({
  description,
  onSwitchMethod,
  pillLabel,
  profileId,
  subtitle,
  switchLabel,
  switchPrompt,
  title,
}: QuizRecommendationRevealProps) {
  const theme = useBudgetinTheme();
  const visual = profileVisualMap[profileId];
  const profileTheme = theme.interactiveQuiz.profileVisuals[visual.themeKey];

  return (
    <View style={styles.container}>
      <View style={[styles.heroCard, { boxShadow: profileTheme.shadow }]}>
        <View
          style={[
            glassStyles.backgroundLayer,
            styles.heroGradientBase,
            { backgroundColor: theme.interactiveQuiz.recommendationCardBase },
            createHeroGradientStyle(profileTheme.gradient),
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.heroGlow,
            {
              backgroundColor: profileTheme.glow,
              boxShadow: `0 0 130px 44px ${profileTheme.glow}`,
            },
          ]}
        />
        <View style={[glassStyles.backgroundLayer, glassStyles.tintLayer, budgetinGlassTintStyle]} />

        <Image contentFit="contain" source={visual.badge} style={styles.badge} />

        <View style={styles.heroText}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{pillLabel}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.copyBlock}>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchPrompt}>{switchPrompt}</Text>
          <Pressable onPress={onSwitchMethod}>
            <Text style={styles.switchLabel}>{switchLabel}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function createHeroGradientStyle(colors: readonly [string, string, string]) {
  return {
    experimental_backgroundImage: `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 58%, ${colors[2]} 100%)`,
    backgroundImage: `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 58%, ${colors[2]} 100%)`,
  } as const;
}

const styles = StyleSheet.create({
  badge: {
    height: 122,
    marginTop: 26,
    width: 122,
    zIndex: 1,
  },
  container: {
    flex: 1,
    gap: 18,
    paddingHorizontal: Spacing.three,
  },
  copyBlock: {
    gap: 14,
  },
  description: {
    color: "rgba(255, 246, 236, 0.74)",
    fontFamily: Fonts.body,
    fontSize: 15,
    lineHeight: 29,
  },
  heroCard: {
    alignItems: "center",
    borderRadius: 34,
    minHeight: 344,
    overflow: "hidden",
    position: "relative",
  },
  heroGlow: {
    borderRadius: 999,
    height: 110,
    position: "absolute",
    top: 84,
    width: 110,
  },
  heroGradientBase: {
    backgroundColor: "#1F1B19",
  },
  heroText: {
    alignItems: "center",
    gap: 10,
    marginTop: 18,
    paddingBottom: 26,
    paddingHorizontal: 22,
    zIndex: 1,
  },
  pill: {
    backgroundColor: "rgba(255, 249, 241, 0.20)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pillText: {
    color: "#FFF9F1",
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 14,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "rgba(255, 246, 236, 0.88)",
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },
  switchLabel: {
    color: "#A8E3FF",
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 18,
    textDecorationLine: "underline",
  },
  switchPrompt: {
    color: "rgba(255, 246, 236, 0.62)",
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 18,
  },
  switchRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  title: {
    color: "#FFF9F1",
    fontFamily: Fonts.display,
    fontSize: 42,
    letterSpacing: -0.6,
    lineHeight: 42,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
