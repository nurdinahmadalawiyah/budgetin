import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/core/navigation/types';
import { useAppStore } from '@/core/store';
import { OnboardingView } from '@/features/onboarding/presentation/views/onboarding-view';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: Props) {
  const setHasCompletedOnboarding = useAppStore((state) => state.setHasCompletedOnboarding);

  const handleFinish = () => {
    setHasCompletedOnboarding(true);
    navigation.replace('MainTabs');
  };

  return <OnboardingView onFinish={handleFinish} />;
}
