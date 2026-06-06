import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PhoneShell } from "@/core/components/layout/phone-shell";
import { useLocale } from "@/core/i18n";
import { AppButton } from "@/core/components/ui/app-button";
import { useBudgetinTheme } from "@/core/theme/hooks/use-budgetin-theme";
import { Fonts, Spacing } from "@/core/theme/theme";
import { AuthHeroArt } from "@/features/auth/presentation/components/auth-hero-art";

type AuthViewProps = {
  onContinueAsGuest: () => void;
  onContinueWithGoogle: () => void;
};

export function AuthView({
  onContinueAsGuest,
  onContinueWithGoogle,
}: AuthViewProps) {
  const insets = useSafeAreaInsets();
  const theme = useBudgetinTheme();
  const { t } = useLocale();
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <>
      <StatusBar style={theme.statusBarStyle} />

      <View
        style={[
          styles.screen,
          styles.screenContent,
          isWide ? styles.screenContentWide : styles.screenContentCompact,
          {
            backgroundColor: theme.surface.canvas,
            paddingTop: Math.max(insets.top, 20),
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}
      >
        <View
          style={[
            styles.glow,
            styles.glowTop,
            {
              backgroundColor: "rgba(108, 112, 246, 0.10)",
              boxShadow: "0 0 150px 64px rgba(108, 112, 246, 0.16)",
            },
          ]}
        />
        <View
          style={[
            styles.glow,
            styles.glowBottom,
            {
              backgroundColor: "rgba(240, 107, 97, 0.08)",
              boxShadow: "0 0 120px 52px rgba(240, 107, 97, 0.12)",
            },
          ]}
        />
        <View
          style={[
            styles.glow,
            styles.glowCenter,
            {
              backgroundColor: "rgba(155, 217, 229, 0.05)",
              boxShadow: "0 0 110px 40px rgba(155, 217, 229, 0.08)",
            },
          ]}
        />

        <PhoneShell
          compactStyle={styles.phoneShellCompact}
          style={styles.phoneShell}
          wideShadow={theme.onboarding.shadow}
          wideStyle={styles.phoneShellWide}
        >
          <View style={[styles.content, isWide ? styles.contentWide : null]}>
            <View style={styles.heroSection}>
              <AuthHeroArt />
            </View>

            <View style={styles.footerSection}>
              <View style={styles.copyBlock}>
                <Text style={[styles.title, { color: theme.text.primary }]}>
                  {t("auth.title")}
                </Text>
                <Text style={[styles.copy, { color: theme.text.secondary }]}>
                  {t("auth.subtitle")}
                </Text>
              </View>

              <AppButton
                fullWidth
                iconLeft={
                  <View style={styles.googleBadge}>
                    <Image
                      contentFit="contain"
                      source={require("@/assets/icons/google-icon.svg")}
                      style={styles.googleIcon}
                    />
                  </View>
                }
                onPress={onContinueWithGoogle}
                size="md"
                variant="solid"
                tone="ivory"
                glow
              >
                {t("auth.continueWithGoogle")}
              </AppButton>

              <AppButton
                onPress={onContinueAsGuest}
                variant="text"
                size="sm"
                tone="stone"
              >
                {t("auth.continueAsGuest")}
              </AppButton>
            </View>
          </View>
        </PhoneShell>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: "hidden",
  },
  screenContent: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 28,
    paddingHorizontal: 0,
  },
  screenContentCompact: {
    alignItems: "stretch",
  },
  screenContentWide: {
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    borderRadius: 999,
    pointerEvents: "none",
    position: "absolute",
  },
  glowTop: {
    height: 150,
    right: 24,
    top: 72,
    width: 150,
  },
  glowBottom: {
    bottom: 92,
    height: 132,
    left: 22,
    width: 132,
  },
  glowCenter: {
    height: 110,
    left: "28%",
    top: "34%",
    width: 110,
  },
  phoneShell: {
    minHeight: 760,
  },
  phoneShellCompact: {
    borderRadius: 0,
    flex: 1,
    minHeight: undefined,
    paddingBottom: 16,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  phoneShellWide: {
    borderRadius: 42,
    minHeight: 860,
    paddingBottom: 28,
    paddingHorizontal: 28,
    paddingTop: 22,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentWide: {
    alignItems: "center",
    justifyContent: "center",
  },
  heroSection: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: 360,
  },
  footerSection: {
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },
  copyBlock: {
    alignItems: "flex-start",
    gap: Spacing.one,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 34,
    letterSpacing: -1.2,
    lineHeight: 52,
    textAlign: "left",
    textTransform: "uppercase",
  },
  copy: {
    fontFamily: Fonts.body,
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: -0.3,
    textAlign: "left",
    maxWidth: 320,
  },
  googleBadge: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  googleIcon: {
    height: 18,
    width: 18,
  },
});
