import type { AppProps } from 'next/app';

import { ReduxProvider } from '../redux-provider';
import { State } from '../redux/store';

export default function App({ Component, pageProps }: AppProps<{ state: State }>) {
  return (
    <ReduxProvider preloadedState={pageProps.state}>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
