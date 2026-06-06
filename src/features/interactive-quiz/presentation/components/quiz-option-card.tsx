import { useEffect, useState } from "react";
import { Animated, Platform, Pressable, StyleSheet, View } from "react-native";

import {
  BudgetinPalette,
  BudgetinThemeTokens,
  Fonts,
  Spacing,
} from "@/core/theme/theme";

function withOpacity(hexColor: string, opacity: number) {
  const normalized = hexColor.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function mixColors(firstHex: string, secondHex: string, ratio: number) {
  const normalize = (hexColor: string) => {
    const normalized = hexColor.replace("#", "");

    return normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  };
  const first = normalize(firstHex);
  const second = normalize(secondHex);
  const blend = (start: number, end: number) =>
    Math.round(start + (end - start) * ratio);
  const red = blend(
    parseInt(first.slice(0, 2), 16),
    parseInt(second.slice(0, 2), 16),
  );
  const green = blend(
    parseInt(first.slice(2, 4), 16),
    parseInt(second.slice(2, 4), 16),
  );
  const blue = blend(
    parseInt(first.slice(4, 6), 16),
    parseInt(second.slice(4, 6), 16),
  );

  return `rgb(${red}, ${green}, ${blue})`;
}

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
        <Animated.View style={[styles.backgroundLayer, { borderColor }]} />
        <Animated.View
          style={[
            styles.backgroundLayer,
            styles.gradientLayer,
            gradientCardStyle,
            { opacity: selectedOpacity },
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundLayer,
            styles.glassFallbackLayer,
            { opacity: unselectedOpacity },
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundLayer,
            styles.glassTintLayer,
            manualGlassTintStyle,
            { opacity: unselectedOpacity },
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundLayer,
            styles.glassHighlightLayer,
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

const styles = StyleSheet.create({
  backgroundLayer: {
    ...StyleSheet.absoluteFill,
    borderRadius: 18,
  },
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
  glassFallbackLayer: {
    backgroundColor: withOpacity(BudgetinPalette.ivory, 0.07),
    boxShadow: `inset 0 1px 0 ${withOpacity(BudgetinPalette.ivory, 0.12)}, inset 0 -1px 0 ${withOpacity(BudgetinPalette.ink, 0.12)}`,
  },
  glassHighlightLayer: {
    backgroundColor: "transparent",
    boxShadow: `inset 0 1px 0 ${withOpacity(BudgetinPalette.ivory, 0.08)}`,
  },
  glassTintLayer: {
    backgroundColor: "transparent",
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

const manualGlassTintStyle =
  Platform.OS === "web"
    ? ({
        backgroundImage: `linear-gradient(135deg, ${withOpacity(BudgetinPalette.ivory, 0.015)} 0%, ${withOpacity(BudgetinPalette.ivory, 0.03)} 48%, ${withOpacity(BudgetinPalette.ink, 0.015)} 100%)`,
      } as const)
    : ({
        experimental_backgroundImage: `linear-gradient(135deg, ${withOpacity(BudgetinPalette.ivory, 0.015)} 0%, ${withOpacity(BudgetinPalette.ivory, 0.03)} 48%, ${withOpacity(BudgetinPalette.ink, 0.015)} 100%)`,
      } as const);

const gradientCardStyle =
  Platform.OS === "web"
    ? ({
        backgroundImage: `linear-gradient(90deg, ${mixColors(BudgetinPalette.coral, BudgetinPalette.ivory, 0.14)} 0%, ${BudgetinPalette.coral} 44%, ${mixColors(BudgetinPalette.coral, BudgetinPalette.ink, 0.12)} 100%)`,
      } as const)
    : ({
        experimental_backgroundImage: `linear-gradient(90deg, ${mixColors(BudgetinPalette.coral, BudgetinPalette.ivory, 0.14)} 0%, ${BudgetinPalette.coral} 44%, ${mixColors(BudgetinPalette.coral, BudgetinPalette.ink, 0.12)} 100%)`,
      } as const);
