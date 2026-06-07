import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PhoneShell } from "@/core/components/layout/phone-shell";
import { useLocale } from "@/core/i18n";
import { AppButton } from "@/core/components/ui/app-button";
import { useBudgetinTheme } from "@/core/theme/hooks/use-budgetin-theme";
import { BudgetinPalette, Fonts, Spacing } from "@/core/theme/theme";
import { OnboardingSlide } from "@/features/onboarding/presentation/components/onboarding-art.types";
import { OnboardingHeroArt } from "@/features/onboarding/presentation/components/onboarding-hero-art";

type OnboardingViewProps = {
  onFinish: () => void;
};

export function OnboardingView({ onFinish }: OnboardingViewProps) {
  const [index, setIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { t } = useLocale();
  const theme = useBudgetinTheme();
  const slides: OnboardingSlide[] = useMemo(
    () => [
      {
        art: "cashflow",
        title: t("onboarding.slides.cashflow.title"),
        copy: t("onboarding.slides.cashflow.copy"),
        accent: BudgetinPalette.coral,
        accentSoft: theme.onboarding.cashBlobSoft,
        accentMuted: theme.onboarding.cashTileMuted,
      },
      {
        art: "quiz",
        title: t("onboarding.slides.quiz.title"),
        copy: t("onboarding.slides.quiz.copy"),
        accent: BudgetinPalette.violet,
        accentSoft: theme.onboarding.quizBlobSoft,
        accentMuted: theme.onboarding.quizChoiceMuted,
      },
      {
        art: "gold",
        title: t("onboarding.slides.gold.title"),
        copy: t("onboarding.slides.gold.copy"),
        accent: BudgetinPalette.gold,
        accentSoft: theme.onboarding.goldBlobSoft,
        accentMuted: theme.onboarding.goldBarSmall,
      },
    ],
    [t, theme],
  );
  const isLastSlide = index === slides.length - 1;
  const isWide = width >= 900;
  const handleCarouselLayout = (event: LayoutChangeEvent) => {
    setCarouselWidth(event.nativeEvent.layout.width);
  };

  const goToSlide = useCallback(
    (nextIndex: number) => {
      const clampedIndex = Math.max(0, Math.min(slides.length - 1, nextIndex));
      setIndex(clampedIndex);
    },
    [slides.length],
  );

  useEffect(() => {
    if (carouselWidth <= 0) {
      return;
    }

    scrollRef.current?.scrollTo({
      x: index * carouselWidth,
      animated: true,
    });
  }, [carouselWidth, index]);

  const handleMomentumScrollEnd = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    if (carouselWidth <= 0) return;

    const nextIndex = Math.round(
      event.nativeEvent.contentOffset.x / carouselWidth,
    );
    setIndex(Math.max(0, Math.min(slides.length - 1, nextIndex)));
  };

  const handleLeftPress = () => {
    if (isLastSlide) {
      goToSlide(index - 1);
      return;
    }

    onFinish();
  };

  const handleRightPress = () => {
    if (!isLastSlide) {
      goToSlide(index + 1);
      return;
    }

    onFinish();
  };

  const webPanResponder = useMemo(
    () =>
      Platform.OS === "web"
        ? PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) =>
              Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
              Math.abs(gestureState.dx) > 8,
            onPanResponderRelease: (_, gestureState) => {
              const threshold = Math.max(48, carouselWidth * 0.14);

              if (gestureState.dx <= -threshold && index < slides.length - 1) {
                goToSlide(index + 1);
                return;
              }

              if (gestureState.dx >= threshold && index > 0) {
                goToSlide(index - 1);
              }
            },
          })
        : null,
    [carouselWidth, goToSlide, index, slides.length],
  );

  return (
    <>
      <StatusBar style={theme.statusBarStyle} />

      <View
        style={[
          styles.screen,
          styles.screenContent,
          isWide ? styles.screenContentWide : styles.screenContentCompact,
          { backgroundColor: theme.surface.card },
          {
            paddingTop: isWide ? 28 : Math.max(insets.top, 16),
            paddingBottom: isWide ? 28 : Math.max(insets.bottom, 16),
          },
        ]}
      >
        <View
          style={[
            styles.backgroundGlow,
            styles.backgroundGlowMint,
            {
              backgroundColor: "transparent",
              boxShadow: `0 0 280px 118px ${theme.onboarding.backgroundGlowMint}`,
              pointerEvents: "none",
            },
          ]}
        />
        <View
          style={[
            styles.backgroundGlow,
            styles.backgroundGlowViolet,
            {
              backgroundColor: "transparent",
              boxShadow: `0 0 300px 128px ${theme.onboarding.backgroundGlowViolet}`,
              pointerEvents: "none",
            },
          ]}
        />
        <View
          style={[
            styles.backgroundGlow,
            styles.backgroundGlowCoral,
            {
              backgroundColor: "transparent",
              boxShadow: `0 0 280px 118px ${theme.onboarding.backgroundGlowCoral}`,
              pointerEvents: "none",
            },
          ]}
        />

        <PhoneShell
          compactStyle={styles.phoneShellCompact}
          style={styles.phoneShell}
          wideShadow={theme.onboarding.shadow}
          wideStyle={styles.phoneShellWide}
        >
          <View style={styles.topBar}>
            <View style={styles.pageIndicatorRow}>
              {slides.map((item, dotIndex) => (
                <View
                  key={item.title}
                  style={[
                    styles.pageIndicatorTrack,
                    { backgroundColor: theme.onboarding.pageIndicatorInactive },
                    dotIndex === index
                      ? [
                          styles.pageIndicatorTrackActive,
                          { backgroundColor: BudgetinPalette.coral },
                        ]
                      : null,
                  ]}
                />
              ))}
            </View>
          </View>

          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            bounces={false}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            onLayout={handleCarouselLayout}
            scrollEnabled={Platform.OS !== "web"}
            style={styles.carousel}
            contentContainerStyle={styles.carouselContent}
            {...(webPanResponder ? webPanResponder.panHandlers : {})}
          >
            {slides.map((item) => (
              <View
                key={item.title}
                style={[
                  styles.slidePage,
                  carouselWidth > 0 ? { width: carouselWidth } : null,
                ]}
              >
                <View style={styles.mainContent}>
                  <OnboardingHeroArt slide={item} theme={theme} />
                  <View style={styles.textBlock}>
                    <Text style={[styles.title, { color: theme.text.primary }]}>
                      {item.title}
                    </Text>
                    <Text
                      style={[styles.copy, { color: theme.text.secondary }]}
                    >
                      {item.copy}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.bottomDock}>
            <AppButton
              variant="text"
              size="md"
              tone="stone"
              onPress={handleLeftPress}
            >
              {isLastSlide ? t("common.back") : t("common.skip")}
            </AppButton>

            <AppButton
              icon="arrow-forward"
              size="md"
              glow={true}
              onPress={handleRightPress}
            />
          </View>
        </PhoneShell>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContent: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 28,
    paddingHorizontal: 0,
  },
  backgroundGlow: {
    position: "absolute",
    borderRadius: 999,
    opacity: 1,
  },
  backgroundGlowMint: {
    width: 0,
    height: 0,
    left: 28,
    top: 146,
  },
  backgroundGlowViolet: {
    width: 0,
    height: 0,
    right: 66,
    top: 92,
  },
  backgroundGlowCoral: {
    width: 0,
    height: 0,
    right: 52,
    bottom: 46,
  },
  screenContentCompact: {
    alignItems: "stretch",
  },
  screenContentWide: {
    alignItems: "center",
    justifyContent: "center",
  },
  phoneShell: {
    minHeight: 760,
  },
  phoneShellCompact: {
    flex: 1,
    minHeight: undefined,
    borderRadius: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  phoneShellWide: {
    minHeight: 860,
    borderRadius: 42,
    paddingHorizontal: 28,
    paddingTop: 22,
    paddingBottom: 28,
  },
  topBar: {
    alignItems: "stretch",
    paddingTop: 8,
    paddingBottom: 14,
  },
  pageIndicatorRow: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  pageIndicatorTrack: {
    flex: 1,
    height: 6,
    borderRadius: 999,
  },
  pageIndicatorTrackActive: {
    backgroundColor: BudgetinPalette.ink,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    gap: 28,
  },
  carousel: {
    flex: 1,
  },
  carouselContent: {
    flexGrow: 1,
  },
  slidePage: {
    flex: 1,
  },
  textBlock: {
    alignItems: "flex-start",
    gap: Spacing.one,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -1.2,
    paddingBottom: 4,
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
  bottomDock: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
