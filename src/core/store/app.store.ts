import { createStore } from '@/core/store/create-store';

export type AppBootstrapStatus = 'idle' | 'loading' | 'ready' | 'error';
export type AppSessionMode = 'guest' | 'google' | null;

type AppStoreState = {
  bootstrapError: string | null;
  bootstrapStatus: AppBootstrapStatus;
  hasCompletedOnboarding: boolean;
  hasCompletedInteractiveQuiz: boolean;
  hasCompletedBudgetPreview: boolean;
  sessionMode: AppSessionMode;
  setHasCompletedInteractiveQuiz: (value: boolean) => void;
  setHasCompletedOnboarding: (value: boolean) => void;
  setHasCompletedBudgetPreview: (value: boolean) => void;
  signInAsGuest: () => void;
  signInWithGoogle: () => void;
  signOut: () => void;
  startBootstrap: () => void;
  finishBootstrap: () => void;
  failBootstrap: (message: string) => void;
  resetBootstrap: () => void;
  
  /*
  TODO: This is Temporary State, Must move to database if done development
  */
  budgetingMethod: string | null;
  setBudgetingMethod: (value: string) => void;
};

export const useAppStore = createStore<AppStoreState>('app-store', (set) => ({
  bootstrapError: null,
  bootstrapStatus: 'idle',
  hasCompletedOnboarding: false,
  hasCompletedInteractiveQuiz: false,
  hasCompletedBudgetPreview: false,
  sessionMode: null,
  setHasCompletedInteractiveQuiz: (value) => {
    set({ hasCompletedInteractiveQuiz: value });
  },
  setHasCompletedOnboarding: (value) => {
    set({ hasCompletedOnboarding: value });
  },
  setHasCompletedBudgetPreview: (value) => {
    set({ hasCompletedBudgetPreview: value });
  },
  signInAsGuest: () => {
    set({ sessionMode: 'guest' });
  },
  signInWithGoogle: () => {
    set({ sessionMode: 'google' });
  },
  signOut: () => {
    set({ sessionMode: null });
  },
  startBootstrap: () => {
    set({
      bootstrapError: null,
      bootstrapStatus: 'loading',
    });
  },
  finishBootstrap: () => {
    set({
      bootstrapError: null,
      bootstrapStatus: 'ready',
    });
  },
  failBootstrap: (message) => {
    set({
      bootstrapError: message,
      bootstrapStatus: 'error',
    });
  },
  resetBootstrap: () => {
    set({
      bootstrapError: null,
      bootstrapStatus: 'idle',
    });
  },
  budgetingMethod: null,
  setBudgetingMethod: (value) => {
    set({ budgetingMethod: value });
  },
}));

export const appStore = {
  getState: useAppStore.getState,
  subscribe: useAppStore.subscribe,
};

export function useBootstrapStatus() {
  return useAppStore((state) => state.bootstrapStatus);
}

export function useBootstrapError() {
  return useAppStore((state) => state.bootstrapError);
}

export function useHasCompletedOnboarding() {
  return useAppStore((state) => state.hasCompletedOnboarding);
}

export function useHasCompletedInteractiveQuiz() {
  return useAppStore((state) => state.hasCompletedInteractiveQuiz);
}

export function useHasCompletedBudgetPreview() {
  return useAppStore((state) => state.hasCompletedBudgetPreview);
}

export function useHasActiveSession() {
  return useAppStore((state) => state.sessionMode !== null);
}

export function useBudgetingMethod() {
  return useAppStore((state) => state.budgetingMethod);
}