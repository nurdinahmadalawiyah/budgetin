import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppTabs } from "@/core/navigation/app-tabs";
import { RootStackParamList } from "@/core/navigation/types";
import {
  useAppStore,
  useHasActiveSession,
  useHasCompletedOnboarding,
} from "@/core/store";
import { AuthView } from "@/features/auth/presentation/views/auth-view";
import { OnboardingView } from "@/features/onboarding/presentation/views/onboarding-view";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const hasCompletedOnboarding = useHasCompletedOnboarding();
  const hasActiveSession = useHasActiveSession();
  const setHasCompletedOnboarding = useAppStore(
    (state) => state.setHasCompletedOnboarding,
  );
  const signInAsGuest = useAppStore((state) => state.signInAsGuest);
  const signInWithGoogle = useAppStore((state) => state.signInWithGoogle);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!hasCompletedOnboarding ? (
        <Stack.Group navigationKey="onboarding-flow">
          <Stack.Screen name="Onboarding">
            {() => (
              <OnboardingView
                onFinish={() => {
                  setHasCompletedOnboarding(true);
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Group>
      ) : null}

      {hasCompletedOnboarding && !hasActiveSession ? (
        <Stack.Group navigationKey="auth-flow">
          <Stack.Screen name="Auth">
            {() => (
              <AuthView
                onContinueAsGuest={() => {
                  signInAsGuest();
                }}
                onContinueWithGoogle={() => {
                  signInWithGoogle();
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Group>
      ) : null}

      {hasCompletedOnboarding && hasActiveSession ? (
        <Stack.Group navigationKey="app-flow">
          <Stack.Screen name="MainTabs" component={AppTabs} />
        </Stack.Group>
      ) : null}
    </Stack.Navigator>
  );
}
