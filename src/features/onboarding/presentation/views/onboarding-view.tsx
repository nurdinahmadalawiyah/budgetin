import { router, Stack } from "expo-router";
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
import { BudgetinPalette, BudgetinTheme } from "@/core/theme/theme";
import { OnboardingHeroArt } from "@/features/onboarding/presentation/components/onboarding-hero-art";
import { OnboardingSlide } from "@/features/onboarding/presentation/components/onboarding-art.types";

const slides: OnboardingSlide[] = [
  {
    art: "cashflow",
    title: "Budget kamu, tapi lebih waras.",
    copy: "Catat cashflow, pilih metode budgeting yang cocok, lalu app bantu setup kategori otomatis dari income kamu.",
    accent: BudgetinPalette.ink,
    accentSoft: BudgetinPalette.sage,
    accentMuted: BudgetinPalette.mint,
  },
  {
    art: "quiz",
    title: "Quiz dulu, baru budgeting.",
    copy: "Jawab 5 pertanyaan soal spending, impulsif, goals, comfort level, dan risk appetite.",
    accent: BudgetinPalette.coral,
    accentSoft: "#FCE2DE",
    accentMuted: "#F5A69F",
  },
  {
    art: "gold",
    title: "Emas juga ikut ke-plan.",
    copy: "Track gram Antam, UBS, atau perhiasan. Goal bisa berbentuk uang maupun target gram.",
    accent: BudgetinPalette.violet,
    accentSoft: "#E7E8FF",
    accentMuted: "#B9BCFF",
  },
];

export function OnboardingView() {
  const [index, setIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const slide = slides[index];
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
    router.replace("/(tabs)");
  };

  const handleRightPress = () => {
    if (!isLastSlide) {
      goToSlide(index + 1);
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      <View
        style={[
          styles.screen,
          styles.screenContent,
          isWide ? styles.screenContentWide : styles.screenContentCompact,
          {
            paddingTop: isWide ? 28 : Math.max(insets.top, 16),
            paddingBottom: isWide ? 28 : Math.max(insets.bottom, 16),
          },
        ]}
      >
        {isWide ? (
          <View style={styles.brandPanel}>
            <View style={styles.brandPill}>
              <View style={styles.brandDot} />
              <Text style={styles.brandPillText}>Budgetin onboarding</Text>
            </View>
            <Text style={styles.brandTitle}>Budgetin</Text>
            <Text style={styles.brandCopy}>
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
          ]}
        >
          <View style={styles.topBar}>
            <View style={styles.pageIndicatorRow}>
              {slides.map((item, dotIndex) => (
                <View
                  key={item.title}
                  style={[
                    styles.pageIndicatorTrack,
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
                  <OnboardingHeroArt slide={item} />
                  <View style={styles.textBlock}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.copy}>{item.copy}</Text>
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
              Skip
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
    backgroundColor: BudgetinTheme.surface.card,
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
    backgroundColor: BudgetinTheme.surface.muted,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: BudgetinPalette.ink,
  },
  brandPillText: {
    color: "#4d463d",
    fontSize: 13,
    fontWeight: "600",
  },
  brandTitle: {
    color: BudgetinTheme.text.primary,
    fontSize: 54,
    lineHeight: 58,
    fontWeight: "800",
    letterSpacing: -1.6,
  },
  brandCopy: {
    color: BudgetinTheme.text.secondary,
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
    backgroundColor: BudgetinTheme.surface.card,
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
    boxShadow: "0 18px 50px rgba(88, 68, 38, 0.16)",
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
    backgroundColor: "#d9d0c4",
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
    gap: 14,
    paddingHorizontal: 8,
  },
  title: {
    color: BudgetinTheme.text.primary,
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "800",
    letterSpacing: -1,
    textAlign: "left",
  },
  copy: {
    color: BudgetinTheme.text.secondary,
    fontSize: 16,
    lineHeight: 25,
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
