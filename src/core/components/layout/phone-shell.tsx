import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, useWindowDimensions } from 'react-native';

type PhoneShellProps = {
  children: ReactNode;
  compactStyle?: StyleProp<ViewStyle>;
  largeBreakpoint?: number;
  maxWidth?: number;
  mediumBreakpoint?: number;
  mediumWidth?: number;
  style?: StyleProp<ViewStyle>;
  wideShadow?: string;
  wideStyle?: StyleProp<ViewStyle>;
  wideWidth?: number;
};

export function PhoneShell({
  children,
  compactStyle,
  largeBreakpoint = 1200,
  maxWidth = 430,
  mediumBreakpoint = 900,
  mediumWidth = 460,
  style,
  wideShadow,
  wideStyle,
  wideWidth = 500,
}: PhoneShellProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= mediumBreakpoint;

  const shellWidth =
    width >= largeBreakpoint ? wideWidth : width >= mediumBreakpoint ? mediumWidth : undefined;

  return (
    <View
      style={[
        styles.base,
        { maxWidth },
        style,
        isWide ? wideStyle : compactStyle,
        shellWidth ? { width: shellWidth } : null,
        isWide && wideShadow ? { boxShadow: wideShadow } : null,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
