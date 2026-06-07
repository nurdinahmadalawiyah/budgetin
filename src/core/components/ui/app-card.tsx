import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useBudgetinTheme } from '@/core/theme/hooks/use-budgetin-theme';
import { BudgetinThemeTokens, Spacing } from '@/core/theme/theme';

type CardVariant = 'default' | 'muted' | 'glass';

export type AppCardProps = {
  children: ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  padding?: keyof typeof Spacing;
  borderRadius?: number;
  /**
   * Warna glow transparan di pojok kanan atas card.
   * Gunakan withOpacity() untuk kontrol transparansi.
   * Contoh: glowColor={withOpacity(BudgetinPalette.mint, 0.5)}
   */
  glowColor?: string;
};

function getBackgroundColor(variant: CardVariant, theme: BudgetinThemeTokens) {
  if (variant === 'muted') return theme.surface.muted;
  if (variant === 'glass') return 'rgba(255, 255, 255, 0.07)';
  return theme.surface.card;
}

export function AppCard({
  children,
  variant = 'default',
  style,
  padding = 'three',
  borderRadius = 20,
  glowColor,
}: AppCardProps) {
  const theme = useBudgetinTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: getBackgroundColor(variant, theme),
          borderRadius,
          padding: Spacing[padding],
        },
        style,
      ]}
    >
      {glowColor ? (
        <View
          pointerEvents="none"
          style={[
            styles.glowDot,
            {
              backgroundColor: 'transparent',
              boxShadow: `0 0 80px 50px ${glowColor}`,
            },
          ]}
        />
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  glowDot: {
    borderRadius: 999,
    height: 0,
    position: 'absolute',
    right: 24,
    top: 16,
    width: 0,
  },
});
