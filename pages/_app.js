import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '@stripe/stripe-js';

import { Toaster } from 'components/toaster';
import { Progress } from 'components/progress';
import { AuthProvider } from 'hooks/useAuth';
import { useProgressStore } from 'store';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

const queryClient = new QueryClient();

// Record a pageview when route changes
Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

function App({ Component, pageProps }) {
  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
  const isAnimating = useProgressStore((state) => state.isAnimating);

  const router = useRouter();

  // Initialize Fathom when the app loads
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load('BRJGSOKD', {
        url: 'https://twentyseven-lucky.leappage.com/script.js',
        includedDomains: ['*.leappage.com'],
      });
      Fathom.trackPageview();
    }
  }, []);

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router, setIsAnimating]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Progress isAnimating={isAnimating} />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
