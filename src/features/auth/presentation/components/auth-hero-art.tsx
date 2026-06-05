import { Platform, StyleSheet, Text, View } from "react-native";

import { BudgetinPalette, Fonts } from "@/core/theme/theme";

export function AuthHeroArt() {
  return (
    <View style={styles.wrap}>
      <View style={styles.glowCore} />
      <View style={[styles.card, gradientCardStyle]}>
        <View style={styles.badgePercent}>
          <Text style={styles.badgeText}>%</Text>
        </View>
        <View style={styles.badgeCurrency}>
          <Text style={styles.badgeCurrencyText}>Rp</Text>
        </View>
        <Text style={styles.cardTitle}>SMART{"\n"}BUDGET</Text>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
      </View>
    </View>
  );
}

const gradientCardStyle =
  Platform.OS === "web"
    ? ({
        backgroundImage:
          `linear-gradient(155deg, ${BudgetinPalette.violet} 8%, ${BudgetinPalette.iris} 48%, ${BudgetinPalette.coral} 100%)`,
      } as const)
    : ({
        experimental_backgroundImage:
          `linear-gradient(155deg, ${BudgetinPalette.violet} 8%, ${BudgetinPalette.iris} 48%, ${BudgetinPalette.coral} 100%)`,
      } as const);

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 360,
    position: "relative",
  },
  glowCore: {
    backgroundColor: "rgba(112, 139, 255, 0.22)",
    borderRadius: 220,
    boxShadow: "0 0 130px 45px rgba(108, 112, 246, 0.28)",
    height: 220,
    position: "absolute",
    top: 34,
    width: 220,
  },
  card: {
    backgroundColor: "#7D78F0",
    borderColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 36,
    borderWidth: 1,
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.28)",
    height: 260,
    justifyContent: "space-between",
    paddingBottom: 24,
    paddingHorizontal: 26,
    paddingTop: 34,
    transform: [{ rotate: "-6deg" }],
    width: 210,
  },
  cardTitle: {
    color: "#FFF8EC",
    fontFamily: Fonts.display,
    fontSize: 28,
    letterSpacing: 0.8,
    lineHeight: 30,
    textTransform: "uppercase",
  },
  badgePercent: {
    alignItems: "center",
    backgroundColor: BudgetinPalette.mint,
    borderColor: "transparent",
    borderRadius: 34,
    borderWidth: 6,
    height: 68,
    justifyContent: "center",
    position: "absolute",
    right: -18,
    top: -18,
    width: 68,
  },
  badgeCurrency: {
    alignItems: "center",
    backgroundColor: BudgetinPalette.ivory,
    borderColor: "transparent",
    borderRadius: 34,
    borderWidth: 6,
    bottom: -22,
    height: 68,
    justifyContent: "center",
    left: -18,
    position: "absolute",
    width: 68,
  },
  badgeText: {
    color: "#171717",
    fontSize: 24,
    fontWeight: "900",
  },
  badgeCurrencyText: {
    color: "#171717",
    fontSize: 18,
    fontWeight: "900",
  },
  progressTrack: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 246, 236, 0.22)",
    borderRadius: 999,
    height: 12,
    overflow: "hidden",
    width: 84,
  },
  progressFill: {
    backgroundColor: "rgba(255, 246, 236, 0.42)",
    borderRadius: 999,
    height: "100%",
    width: "78%",
  },
});
