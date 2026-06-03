import { CashflowArt } from './cashflow-art';
import { GoldArt } from './gold-art';
import { QuizArt } from './quiz-art';
import { OnboardingSlide } from './onboarding-art.types';

export function OnboardingHeroArt({ slide }: { slide: OnboardingSlide }) {
  switch (slide.art) {
    case 'cashflow':
      return <CashflowArt slide={slide} />;
    case 'quiz':
      return <QuizArt slide={slide} />;
    case 'gold':
      return <GoldArt slide={slide} />;
    default:
      return null;
  }
}
