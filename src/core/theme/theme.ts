/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export const BudgetinPalette = {
  sage: '#D4DED9',
  ink: '#151515',
  ivory: '#FFFFFF',
  coral: '#F06B61',
  violet: '#6C70F6',
  iris: '#8D84F4',
  mint: '#9BD9E5',
  stone: '#A19F97',
  gold: '#D8B56A',
} as const;

export const BudgetinThemes = {
  light: {
    brand: BudgetinPalette,
    surface: {
      canvas: '#F7F2EB',
      card: '#FFF9F1',
      muted: '#ECE4D8',
    },
    text: {
      primary: BudgetinPalette.ink,
      secondary: '#5F584F',
      inverted: '#FFF9F1',
    },
    onboarding: {
      brandPill: '#ECE4D8',
      pageIndicatorInactive: '#D9D0C4',
      shadow: '0 18px 50px rgba(88, 68, 38, 0.16)',
      backgroundGlowMint: 'rgba(155, 217, 229, 0.18)',
      backgroundGlowViolet: 'rgba(108, 112, 246, 0.14)',
      backgroundGlowCoral: 'rgba(240, 107, 97, 0.14)',
      cardShadow: '0 10px 28px rgba(0, 0, 0, 0.08)',
      goldPillShadow: '0 8px 18px rgba(138, 100, 23, 0.12)',
      cashBlobSoft: '#FBE7E2',
      cashTileStrong: '#F4D0CB',
      cashTileMuted: '#E8B0A9',
      summaryCard: '#EEF4F1',
      quizBlobSoft: '#ECE9FF',
      quizChoiceActive: '#F1EEFF',
      quizChoiceMuted: '#B7B2F4',
      quizChoiceLine: '#CBC7FF',
      quizChoiceLineAlt: '#DAD7FF',
      goldBlobSoft: '#F7EFCF',
      goldBarMedium: '#D8B56A',
      goldBarSmall: '#E8D5A1',
      goldPill: '#FBF4E1',
    },
    statusBarStyle: 'dark',
  },
  dark: {
    brand: BudgetinPalette,
    surface: {
      canvas: '#12100F',
      card: '#1A1816',
      muted: '#2A2724',
    },
    text: {
      primary: '#FFF6EC',
      secondary: '#C3BBB1',
      inverted: BudgetinPalette.ink,
    },
    onboarding: {
      brandPill: '#2A2724',
      pageIndicatorInactive: '#49443D',
      shadow: '0 18px 50px rgba(0, 0, 0, 0.34)',
      backgroundGlowMint: 'rgba(155, 217, 229, 0.14)',
      backgroundGlowViolet: 'rgba(108, 112, 246, 0.2)',
      backgroundGlowCoral: 'rgba(240, 107, 97, 0.18)',
      cardShadow: '0 10px 28px rgba(0, 0, 0, 0.24)',
      goldPillShadow: '0 8px 18px rgba(0, 0, 0, 0.28)',
      cashBlobSoft: '#3E2724',
      cashTileStrong: '#5A3733',
      cashTileMuted: '#8F5A52',
      summaryCard: '#232927',
      quizBlobSoft: '#25263B',
      quizChoiceActive: '#2B2D45',
      quizChoiceMuted: '#6A6EB8',
      quizChoiceLine: '#868AF5',
      quizChoiceLineAlt: '#A5A8FF',
      goldBlobSoft: '#3B3018',
      goldBarMedium: '#D8B56A',
      goldBarSmall: '#8E7541',
      goldPill: '#312714',
    },
    statusBarStyle: 'light',
  },
} as const;

export type BudgetinThemeTokens = (typeof BudgetinThemes)[keyof typeof BudgetinThemes];

export const BudgetinTheme = BudgetinThemes.light;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** Built-in display face */
    display: 'Impact',
    body: 'DMSans_700Bold',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    display: 'sans-serif-black',
    body: 'DMSans_700Bold',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    display: 'Impact, "Arial Black", sans-serif',
    body: 'DMSans_700Bold',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
