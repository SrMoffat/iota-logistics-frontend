import { AppProps } from 'next/app';
import { useState, useEffect, Suspense, lazy } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '../contexts';
import { ItemProvider } from '../contexts';

import '../styles/global.css';

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

export default function App({ Component, pageProps }: AppProps) {
  const [showDevtools, setShowDevtools] = useState(false)

  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])
  return (
    <AuthProvider>
      <ItemProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
          {showDevtools && (
            <Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </Suspense>
          )}
        </QueryClientProvider>
      </ItemProvider>
    </AuthProvider>
  )
}
