import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppTabs } from "@/core/navigation/app-tabs";
import { RootStackParamList } from "@/core/navigation/types";
import {
  useAppStore,
  useHasActiveSession,
  useHasCompletedBudgetPreview,
  useHasCompletedInteractiveQuiz,
  useHasCompletedOnboarding,
} from "@/core/store";
import { AuthView } from "@/features/auth/presentation/views/auth-view";
import { BudgetPreviewView } from "@/features/budget-preview/views/budget-preview-view";
import { InteractiveQuizView } from "@/features/interactive-quiz/presentation/views/interactive-quiz-view";
import { OnboardingView } from "@/features/onboarding/presentation/views/onboarding-view";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const hasCompletedOnboarding = useHasCompletedOnboarding();
  const hasCompletedInteractiveQuiz = useHasCompletedInteractiveQuiz();
  const hasActiveSession = useHasActiveSession();
  const setHasCompletedInteractiveQuiz = useAppStore(
    (state) => state.setHasCompletedInteractiveQuiz,
  );
  const setHasCompletedOnboarding = useAppStore(
    (state) => state.setHasCompletedOnboarding,
  );
  const signInAsGuest = useAppStore((state) => state.signInAsGuest);
  const signInWithGoogle = useAppStore((state) => state.signInWithGoogle);

  const hasCompletedBudgetPreview = useHasCompletedBudgetPreview();
  const setHasCompletedBudgetPreview = useAppStore(
    (state) => state.setHasCompletedBudgetPreview,
  );

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

      {hasCompletedOnboarding && hasActiveSession && !hasCompletedInteractiveQuiz ? (
        <Stack.Group navigationKey="interactive-quiz-flow">
          <Stack.Screen name="InteractiveQuiz">
            {() => (
              <InteractiveQuizView
                onFinish={() => {
                  setHasCompletedInteractiveQuiz(true);
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Group>
      ) : null}

      {hasCompletedOnboarding && hasActiveSession && hasCompletedInteractiveQuiz && !hasCompletedBudgetPreview ? (
        <Stack.Group navigationKey="budget-preview-flow">
          <Stack.Screen name="BudgetPreview">
            {() => (
              <BudgetPreviewView 
                onFinish={() => {
                  setHasCompletedBudgetPreview(true);
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Group>
      ) : null}

      {hasCompletedOnboarding && hasActiveSession && hasCompletedInteractiveQuiz && hasCompletedBudgetPreview ? (
        <Stack.Group navigationKey="app-flow">
          <Stack.Screen name="MainTabs" component={AppTabs} />
        </Stack.Group>
      ) : null}
    </Stack.Navigator>
  );
}
