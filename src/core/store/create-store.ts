import { create, type StateCreator } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

export function createStore<TState>(
  name: string,
  initializer: StateCreator<TState, [], []>
) {
  return create<TState>()(
    devtools(subscribeWithSelector(initializer), {
      enabled: __DEV__,
      name,
    })
  );
}
