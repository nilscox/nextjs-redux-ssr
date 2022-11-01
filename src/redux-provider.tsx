import { useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { inMemoryDependencies } from './redux/in-memory-dependencies';

import { AppStore, createStore, Dependencies, State } from './redux/store';

declare global {
  interface Window {
    dependencies: Dependencies;
    store: AppStore;
  }
}

const dependencies: Dependencies = {
  ...inMemoryDependencies,
};

type ReduxProviderProps = {
  preloadedState: State;
  children: React.ReactNode;
};

export const ReduxProvider = ({ preloadedState, children }: ReduxProviderProps) => {
  // prevent re-creating a store when changing page in development
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const store = useMemo(() => createStore(dependencies, preloadedState), []);

  useEffect(() => {
    window.store = store;
    window.dependencies = dependencies;
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
};
