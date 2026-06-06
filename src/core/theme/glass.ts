import { Platform, StyleSheet } from "react-native";

import { BudgetinPalette } from "@/core/theme/theme";

export function withOpacity(hexColor: string, opacity: number) {
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

export function mixColors(firstHex: string, secondHex: string, ratio: number) {
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

export function createGlassCardStyles(borderRadius = 20) {
  return StyleSheet.create({
    backgroundLayer: {
      ...StyleSheet.absoluteFill,
      borderRadius,
    },
    baseLayer: {
      backgroundColor: withOpacity(BudgetinPalette.ivory, 0.07),
      boxShadow: `inset 0 1px 0 ${withOpacity(BudgetinPalette.ivory, 0.12)}, inset 0 -1px 0 ${withOpacity(BudgetinPalette.ink, 0.12)}`,
    },
    highlightLayer: {
      backgroundColor: "transparent",
      boxShadow: `inset 0 1px 0 ${withOpacity(BudgetinPalette.ivory, 0.08)}`,
    },
    tintLayer: {
      backgroundColor: "transparent",
    },
  });
}

export const budgetinGlassTintStyle =
  Platform.OS === "web"
    ? ({
        backgroundImage: `linear-gradient(135deg, ${withOpacity(BudgetinPalette.ivory, 0.015)} 0%, ${withOpacity(BudgetinPalette.ivory, 0.03)} 48%, ${withOpacity(BudgetinPalette.ink, 0.015)} 100%)`,
      } as const)
    : ({
        experimental_backgroundImage: `linear-gradient(135deg, ${withOpacity(BudgetinPalette.ivory, 0.015)} 0%, ${withOpacity(BudgetinPalette.ivory, 0.03)} 48%, ${withOpacity(BudgetinPalette.ink, 0.015)} 100%)`,
      } as const);
