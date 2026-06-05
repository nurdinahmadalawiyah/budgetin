import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppTabs } from '@/core/navigation/app-tabs';
import { RootStackParamList } from '@/core/navigation/types';
import { useHasActiveSession, useHasCompletedOnboarding } from '@/core/store';
import { AuthScreen } from '@/screens/auth-screen';
import { OnboardingScreen } from '@/screens/onboarding-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const hasCompletedOnboarding = useHasCompletedOnboarding();
  const hasActiveSession = useHasActiveSession();

  const initialRouteName = !hasCompletedOnboarding
    ? 'Onboarding'
    : hasActiveSession
      ? 'MainTabs'
      : 'Auth';

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}>
      {!hasCompletedOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : null}
      {hasCompletedOnboarding && !hasActiveSession ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : null}
      <Stack.Screen name="MainTabs" component={AppTabs} />
    </Stack.Navigator>
  );
}
