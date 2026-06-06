import type { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { AppButton } from "../ui/app-button";

type AppBarProps = {
  onBackPress?: () => void;
  rightSlot?: ReactNode;
  showBackButton?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function AppBar({
  onBackPress,
  rightSlot,
  showBackButton = true,
  style,
}: AppBarProps) {
  const isBackDisabled = !onBackPress;

  return (
    <View style={[styles.container, style]}>
      {showBackButton ? (
        <AppButton
          accessibilityLabel="Kembali"
          disabled={isBackDisabled}
          glow={false}
          tone="ivory"
          onPress={onBackPress}
          size="sm"
          icon="chevron-back"
        />
      ) : (
        <View style={styles.backButtonSpacer} />
      )}

      <View style={styles.rightSlot}>
        {rightSlot ?? <View style={styles.backButtonSpacer} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  backButtonSpacer: {
    height: 28,
    width: 28,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightSlot: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 28,
  },
});
