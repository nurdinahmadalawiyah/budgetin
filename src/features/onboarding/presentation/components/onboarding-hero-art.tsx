import { BudgetinThemeTokens } from '@/core/theme/theme';

import { CashflowArt } from './cashflow-art';
import { GoldArt } from './gold-art';
import { QuizArt } from './quiz-art';
import { OnboardingSlide } from './onboarding-art.types';

export function OnboardingHeroArt({
  slide,
  theme,
}: {
  slide: OnboardingSlide;
  theme: BudgetinThemeTokens;
}) {
  switch (slide.art) {
    case 'cashflow':
      return <CashflowArt slide={slide} theme={theme} />;
    case 'quiz':
      return <QuizArt slide={slide} theme={theme} />;
    case 'gold':
      return <GoldArt slide={slide} theme={theme} />;
    default:
      return null;
  }
}
