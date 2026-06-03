import { createStore } from '@/core/store/create-store';

export type AppBootstrapStatus = 'idle' | 'loading' | 'ready' | 'error';

type AppStoreState = {
  bootstrapError: string | null;
  bootstrapStatus: AppBootstrapStatus;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (value: boolean) => void;
  startBootstrap: () => void;
  finishBootstrap: () => void;
  failBootstrap: (message: string) => void;
  resetBootstrap: () => void;
};

export const useAppStore = createStore<AppStoreState>('app-store', (set) => ({
  bootstrapError: null,
  bootstrapStatus: 'idle',
  hasCompletedOnboarding: false,
  setHasCompletedOnboarding: (value) => {
    set({ hasCompletedOnboarding: value });
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
