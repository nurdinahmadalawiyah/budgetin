import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/core/navigation/types';
import { useAppStore } from '@/core/store';
import { AuthView } from '@/features/auth/presentation/views/auth-view';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export function AuthScreen({ navigation }: Props) {
  const signInAsGuest = useAppStore((state) => state.signInAsGuest);
  const signInWithGoogle = useAppStore((state) => state.signInWithGoogle);

  const goToMainTabs = () => {
    navigation.replace('MainTabs');
  };

  const handleContinueAsGuest = () => {
    signInAsGuest();
    goToMainTabs();
  };

  const handleContinueWithGoogle = () => {
    signInWithGoogle();
    goToMainTabs();
  };

  return (
    <AuthView
      onContinueAsGuest={handleContinueAsGuest}
      onContinueWithGoogle={handleContinueWithGoogle}
    />
  );
}
