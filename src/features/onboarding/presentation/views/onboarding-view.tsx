import { StatusBar } from "expo-status-bar";
import { useMemo, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppButton } from "@/core/components/ui/app-button";
import { useBudgetinTheme } from "@/core/theme/hooks/use-budgetin-theme";
import { BudgetinPalette, Fonts } from "@/core/theme/theme";
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
  const theme = useBudgetinTheme();
  const slides: OnboardingSlide[] = useMemo(
    () => [
      {
        art: "cashflow",
        title: "BUDGET KAMU, TAPI LEBIH WARAS.",
        copy: "Catat cashflow, pilih metode budgeting yang cocok, lalu app bantu setup kategori otomatis dari income kamu.",
        accent: BudgetinPalette.coral,
        accentSoft: theme.onboarding.cashBlobSoft,
        accentMuted: theme.onboarding.cashTileMuted,
      },
      {
        art: "quiz",
        title: "QUIZ DULU, BARU BUDGETING.",
        copy: "Jawab 5 pertanyaan soal spending, impulsif, goals, comfort level, dan risk appetite.",
        accent: BudgetinPalette.violet,
        accentSoft: theme.onboarding.quizBlobSoft,
        accentMuted: theme.onboarding.quizChoiceMuted,
      },
      {
        art: "gold",
        title: "EMAS JUGA IKUT KE-PLAN.",
        copy: "Track gram Antam, UBS, atau perhiasan. Goal bisa berbentuk uang maupun target gram.",
        accent: BudgetinPalette.gold,
        accentSoft: theme.onboarding.goldBlobSoft,
        accentMuted: theme.onboarding.goldBarSmall,
      },
    ],
    [theme],
  );
  const isLastSlide = index === slides.length - 1;
  const isWide = width >= 900;
  const shellWidth = useMemo(() => {
    if (width >= 1200) return 440;
    if (width >= 900) return 400;
    return undefined;
  }, [width]);

  const handleCarouselLayout = (event: LayoutChangeEvent) => {
    setCarouselWidth(event.nativeEvent.layout.width);
  };

  const goToSlide = (nextIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(slides.length - 1, nextIndex));
    setIndex(clampedIndex);

    if (carouselWidth > 0) {
      scrollRef.current?.scrollTo({
        x: clampedIndex * carouselWidth,
        animated: true,
      });
    }
  };

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
          pointerEvents="none"
          style={[
            styles.backgroundGlow,
            styles.backgroundGlowMint,
            {
              backgroundColor: theme.onboarding.backgroundGlowMint,
              boxShadow: `0 0 120px 36px ${theme.onboarding.backgroundGlowMint}`,
            },
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.backgroundGlow,
            styles.backgroundGlowViolet,
            {
              backgroundColor: theme.onboarding.backgroundGlowViolet,
              boxShadow: `0 0 140px 42px ${theme.onboarding.backgroundGlowViolet}`,
            },
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.backgroundGlow,
            styles.backgroundGlowCoral,
            {
              backgroundColor: theme.onboarding.backgroundGlowCoral,
              boxShadow: `0 0 120px 34px ${theme.onboarding.backgroundGlowCoral}`,
            },
          ]}
        />

        {isWide ? (
          <View style={styles.brandPanel}>
            <View
              style={[
                styles.brandPill,
                { backgroundColor: theme.onboarding.brandPill },
              ]}
            >
              <View
                style={[
                  styles.brandDot,
                  { backgroundColor: theme.text.primary },
                ]}
              />
              <Text
                style={[styles.brandPillText, { color: theme.text.secondary }]}
              >
                Budgetin onboarding
              </Text>
            </View>
            <Text style={[styles.brandTitle, { color: theme.text.primary }]}>
              Budgetin
            </Text>
            <Text style={[styles.brandCopy, { color: theme.text.secondary }]}>
              Onboarding ini mengikuti prototype HTML kamu, tapi dibangun ulang
              dengan pola layout native supaya lebih nyaman dipelajari di Expo
              Router.
            </Text>
            <View style={styles.paletteRow}>
              <View
                style={[
                  styles.paletteSwatch,
                  { backgroundColor: BudgetinPalette.sage },
                ]}
              />
              <View
                style={[
                  styles.paletteSwatch,
                  { backgroundColor: BudgetinPalette.ink },
                ]}
              />
              <View
                style={[
                  styles.paletteSwatch,
                  { backgroundColor: BudgetinPalette.coral },
                ]}
              />
              <View
                style={[
                  styles.paletteSwatch,
                  { backgroundColor: BudgetinPalette.violet },
                ]}
              />
              <View
                style={[
                  styles.paletteSwatch,
                  { backgroundColor: BudgetinPalette.mint },
                ]}
              />
            </View>
          </View>
        ) : null}

        <View
          style={[
            styles.phoneShell,
            isWide ? styles.phoneShellWide : styles.phoneShellCompact,
            shellWidth ? { width: shellWidth } : null,
            {
              backgroundColor: "transparent",
              boxShadow: isWide ? theme.onboarding.shadow : undefined,
            },
          ]}
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
            style={styles.carousel}
            contentContainerStyle={styles.carouselContent}
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
              {isLastSlide ? "Back" : "Skip"}
            </AppButton>

            <AppButton
              icon="arrow-forward"
              size="md"
              glow={true}
              onPress={handleRightPress}
            />
          </View>
        </View>
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
    opacity: 0.9,
  },
  backgroundGlowMint: {
    width: 140,
    height: 140,
    left: 8,
    top: 120,
  },
  backgroundGlowViolet: {
    width: 150,
    height: 150,
    right: 40,
    top: 70,
  },
  backgroundGlowCoral: {
    width: 130,
    height: 130,
    right: 30,
    bottom: 24,
  },
  screenContentCompact: {
    alignItems: "stretch",
  },
  screenContentWide: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  brandPanel: {
    maxWidth: 360,
    gap: 18,
  },
  brandPill: {
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  brandPillText: {
    fontSize: 13,
    fontWeight: "600",
  },
  brandTitle: {
    fontSize: 54,
    lineHeight: 58,
    fontWeight: "800",
    letterSpacing: -1.6,
  },
  brandCopy: {
    fontSize: 17,
    lineHeight: 27,
  },
  paletteRow: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 12,
  },
  paletteSwatch: {
    width: 28,
    height: 28,
    borderRadius: 999,
  },
  phoneShell: {
    alignSelf: "center",
    minHeight: 760,
    width: "100%",
    maxWidth: 430,
    justifyContent: "space-between",
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
    borderRadius: 38,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 24,
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
    gap: 4,
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
