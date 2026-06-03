export type SlideArt = 'cashflow' | 'quiz' | 'gold';

export type OnboardingSlide = {
  art: SlideArt;
  title: string;
  copy: string;
  accent: string;
  accentSoft: string;
  accentMuted: string;
};
