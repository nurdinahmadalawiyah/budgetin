import { useEffect, useState } from "react";
import { Animated, Platform, Pressable, StyleSheet, View } from "react-native";

import {
  budgetinGlassTintStyle,
  createGlassCardStyles,
  mixColors,
  withOpacity,
} from "@/core/theme/glass";
import {
  BudgetinPalette,
  BudgetinThemeTokens,
  Fonts,
  Spacing,
} from "@/core/theme/theme";

type QuizOptionCardProps = {
  index: number;
  isSelected: boolean;
  onPress: () => void;
  subtitle: string;
  theme: BudgetinThemeTokens;
  title: string;
};

export function QuizOptionCard({
  index,
  isSelected,
  onPress,
  subtitle,
  theme,
  title,
}: QuizOptionCardProps) {
  const [selectionProgress] = useState(
    () => new Animated.Value(isSelected ? 1 : 0),
  );

  useEffect(() => {
    Animated.timing(selectionProgress, {
      toValue: isSelected ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [isSelected, selectionProgress]);

  const borderColor = selectionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      withOpacity(BudgetinPalette.ivory, 0.07),
      withOpacity(BudgetinPalette.ivory, 0.44),
    ],
  });
  const selectedOpacity = selectionProgress;
  const unselectedOpacity = selectionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const badgeBackgroundColor = selectionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      withOpacity(BudgetinPalette.ivory, 0.96),
      BudgetinPalette.ivory,
    ],
  });
  const indexColor = selectionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.text.inverted, BudgetinPalette.ink],
  });
  const titleColor = selectionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.text.primary, BudgetinPalette.ivory],
  });
  const subtitleColor = selectionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      theme.text.secondary,
      withOpacity(BudgetinPalette.ivory, 0.78),
    ],
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardOuter,
        {
          boxShadow: isSelected
            ? `0 14px 28px ${withOpacity(BudgetinPalette.coral, 0.22)}`
            : `0 8px 18px ${withOpacity(BudgetinPalette.ink, 0.12)}`,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
      ]}
    >
      <View style={[styles.card]}>
        <Animated.View style={[glassCardStyles.backgroundLayer, { borderColor }]} />
        <Animated.View
          style={[
            glassCardStyles.backgroundLayer,
            styles.gradientLayer,
            gradientCardStyle,
            { opacity: selectedOpacity },
          ]}
        />
        <Animated.View
          style={[
            glassCardStyles.backgroundLayer,
            glassCardStyles.baseLayer,
            { opacity: unselectedOpacity },
          ]}
        />
        <Animated.View
          style={[
            glassCardStyles.backgroundLayer,
            glassCardStyles.tintLayer,
            manualGlassTintStyle,
            { opacity: unselectedOpacity },
          ]}
        />
        <Animated.View
          style={[
            glassCardStyles.backgroundLayer,
            glassCardStyles.highlightLayer,
            { opacity: unselectedOpacity },
          ]}
        />

        <Animated.View
          style={[styles.indexBadge, { backgroundColor: badgeBackgroundColor }]}
        >
          <Animated.Text style={[styles.indexText, { color: indexColor }]}>
            {index}
          </Animated.Text>
        </Animated.View>

        <View style={styles.textBlock}>
          <Animated.Text style={[styles.title, { color: titleColor }]}>
            {title}
          </Animated.Text>
          <Animated.Text style={[styles.subtitle, { color: subtitleColor }]}>
            {subtitle}
          </Animated.Text>
        </View>
      </View>
    </Pressable>
  );
}

const glassCardStyles = createGlassCardStyles(20);

const styles = StyleSheet.create({
  cardOuter: {
    borderRadius: 20,
    marginHorizontal: Spacing.half,
    marginVertical: Spacing.half,
  },
  card: {
    alignItems: "center",
    borderColor: withOpacity(BudgetinPalette.ivory, 0.07),
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    overflow: "hidden",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    position: "relative",
  },
  gradientLayer: {
    backgroundColor: BudgetinPalette.coral,
  },
  indexBadge: {
    alignItems: "center",
    borderRadius: 999,
    height: 40,
    justifyContent: "center",
    width: 40,
    zIndex: 1,
  },
  indexText: {
    fontFamily: Fonts.body,
    fontSize: 18,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 18,
  },
  textBlock: {
    flex: 1,
    gap: 2,
    zIndex: 1,
  },
  title: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 20,
  },
});

const gradientCardStyle =
  Platform.OS === "web"
    ? ({
        backgroundImage: `linear-gradient(90deg, ${mixColors(BudgetinPalette.coral, BudgetinPalette.ivory, 0.14)} 0%, ${BudgetinPalette.coral} 44%, ${mixColors(BudgetinPalette.coral, BudgetinPalette.ink, 0.12)} 100%)`,
      } as const)
    : ({
        experimental_backgroundImage: `linear-gradient(90deg, ${mixColors(BudgetinPalette.coral, BudgetinPalette.ivory, 0.14)} 0%, ${BudgetinPalette.coral} 44%, ${mixColors(BudgetinPalette.coral, BudgetinPalette.ink, 0.12)} 100%)`,
      } as const);

const manualGlassTintStyle = budgetinGlassTintStyle;
