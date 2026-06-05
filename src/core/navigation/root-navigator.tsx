import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppTabs } from '@/core/navigation/app-tabs';
import { RootStackParamList } from '@/core/navigation/types';
import { useHasCompletedOnboarding } from '@/core/store';
import { OnboardingScreen } from '@/screens/onboarding-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const hasCompletedOnboarding = useHasCompletedOnboarding();

  return (
    <Stack.Navigator
      initialRouteName={hasCompletedOnboarding ? 'MainTabs' : 'Onboarding'}
      screenOptions={{ headerShown: false }}>
      {!hasCompletedOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : null}
      <Stack.Screen name="MainTabs" component={AppTabs} />
    </Stack.Navigator>
  );
}
