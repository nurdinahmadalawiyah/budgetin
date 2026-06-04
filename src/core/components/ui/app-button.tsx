import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { AppIcon, IconFamily, IconTone } from '@/core/components/ui/app-icon';
import { BudgetinPalette, BudgetinTheme, Spacing } from '@/core/theme/theme';

type ButtonTone = keyof typeof BudgetinPalette;
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

const sizeStyles = {
  sm: { minHeight: 48, paddingHorizontal: 20, borderRadius: 24, fontSize: 16, lineHeight: 20 },
  md: { minHeight: 56, paddingHorizontal: 24, borderRadius: 28, fontSize: 18, lineHeight: 22 },
  lg: { minHeight: 72, paddingHorizontal: 32, borderRadius: 36, fontSize: 20, lineHeight: 24 },
} as const;

const iconSizes = {
  sm: 18,
  md: 20,
  lg: 22,
} as const;

function getToneColor(tone: ButtonTone) {
  return BudgetinPalette[tone];
}

function getReadableTextColor(tone: ButtonTone) {
  return tone === 'sage' || tone === 'mint' || tone === 'stone'
    ? BudgetinTheme.text.primary
    : BudgetinTheme.text.inverted;
}

function getPressedFillColor(tone: ButtonTone) {
  if (tone === 'ink') return 'rgba(21, 21, 21, 0.14)';
  if (tone === 'sage') return 'rgba(212, 222, 217, 0.38)';
  if (tone === 'mint') return 'rgba(155, 217, 229, 0.32)';
  if (tone === 'stone') return 'rgba(161, 159, 151, 0.24)';
  if (tone === 'coral') return 'rgba(240, 107, 97, 0.18)';
  if (tone === 'violet') return 'rgba(108, 112, 246, 0.18)';

  return BudgetinPalette[tone];
}

function getPressedTextColor(tone: ButtonTone) {
  return tone === 'ink' ? BudgetinTheme.text.primary : BudgetinPalette[tone];
}

export type AppButtonProps = Omit<PressableProps, 'style'> & {
  children?: ReactNode;
  fullWidth?: boolean;
  glow?: boolean;
  icon?: string;
  iconColor?: string;
  iconFamily?: IconFamily;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconTone?: IconTone;
  loading?: boolean;
  size?: ButtonSize;
  style?: ViewStyle;
  tone?: ButtonTone;
  variant?: ButtonVariant;
};

export function AppButton({
  android_ripple,
  children,
  disabled = false,
  fullWidth = false,
  glow = false,
  icon,
  iconColor,
  iconFamily = 'ion',
  iconLeft,
  iconRight,
  iconTone,
  loading = false,
  size = 'lg',
  style,
  tone = 'coral',
  variant = 'solid',
  ...pressableProps
}: AppButtonProps) {
  const isDisabled = disabled || loading;
  const hasLabel = children !== undefined && children !== null && children !== false;
  const isIconOnly = !hasLabel;
  const sizeStyle = sizeStyles[size];
  const iconSize = iconSizes[size];
  const toneColor = getToneColor(tone);
  const solidTextColor = getReadableTextColor(tone);
  const pressedFillColor = getPressedFillColor(tone);

  const variantStyle =
    variant === 'solid'
      ? {
          backgroundColor: toneColor,
          borderColor: toneColor,
          textColor: solidTextColor,
        }
      : variant === 'outline'
        ? {
            backgroundColor: 'transparent',
            borderColor: toneColor,
            textColor: toneColor,
          }
        : variant === 'text'
          ? {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              textColor: toneColor,
            }
        : {
            backgroundColor: BudgetinTheme.surface.muted,
            borderColor: 'transparent',
            textColor: BudgetinTheme.text.primary,
          };
  const resolvedPrefixIcon =
    iconLeft ??
    (icon ? (
      <AppIcon
        family={iconFamily}
        name={icon}
        size={iconSize}
        color={iconColor}
        tone={iconTone ?? (variant === 'solid' ? 'inverted' : tone)}
      />
    ) : null);
  const isTextVariant = variant === 'text';
  const usesNativeTextRipple = isTextVariant && Platform.OS === 'android';
  const containerStyle: ViewStyle = {
    minHeight: sizeStyle.minHeight,
    minWidth: isIconOnly ? sizeStyle.minHeight : undefined,
    borderRadius: sizeStyle.borderRadius,
    width: fullWidth ? '100%' : undefined,
  };

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        glow && variant === 'solid' ? styles.glow : null,
        isDisabled ? styles.disabled : null,
        style,
      ]}>
      <Pressable
        android_ripple={
          usesNativeTextRipple
            ? (android_ripple ?? {
                color: pressedFillColor,
                borderless: false,
                foreground: false,
              })
            : android_ripple
        }
        accessibilityRole="button"
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.base,
          {
            minHeight: sizeStyle.minHeight,
            minWidth: isIconOnly ? sizeStyle.minHeight : undefined,
            paddingHorizontal: isIconOnly ? 0 : sizeStyle.paddingHorizontal,
            borderRadius: sizeStyle.borderRadius,
            backgroundColor:
              pressed && isTextVariant && !usesNativeTextRipple
                ? pressedFillColor
                : variantStyle.backgroundColor,
            borderColor:
              pressed && isTextVariant && !usesNativeTextRipple
                ? pressedFillColor
                : variantStyle.borderColor,
          },
          pressed
            ? isTextVariant
              ? usesNativeTextRipple
                ? styles.textPressedNative
                : styles.textPressed
              : styles.pressed
            : null,
        ]}
        {...pressableProps}>
        {({ pressed }) => (
          <View style={styles.content}>
            {loading ? (
              <ActivityIndicator
                color={
                  pressed && isTextVariant && !usesNativeTextRipple
                    ? getPressedTextColor(tone)
                    : variantStyle.textColor
                }
              />
            ) : (
              <>
                {resolvedPrefixIcon ? <View style={styles.icon}>{resolvedPrefixIcon}</View> : null}
                {hasLabel ? (
                  <Text
                    style={[
                      styles.label,
                      {
                        color:
                          pressed && isTextVariant && !usesNativeTextRipple
                            ? getPressedTextColor(tone)
                            : variantStyle.textColor,
                        fontSize: sizeStyle.fontSize,
                        lineHeight: sizeStyle.lineHeight,
                      },
                    ]}>
                    {children}
                  </Text>
                ) : null}
                {iconRight ? <View style={styles.icon}>{iconRight}</View> : null}
              </>
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  base: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
    justifyContent: 'center',
  },
  label: {
    fontWeight: '800',
    textAlign: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    boxShadow: '0 18px 40px rgba(240, 107, 97, 0.28)',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  textPressed: {
    opacity: 0.96,
  },
  textPressedNative: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.55,
  },
});
