import { useEffect } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import "@stripe/stripe-js";

import { Toaster } from "components/toaster";
import { Progress } from "components/progress";
import { AuthProvider } from "hooks/useAuth";
import { useProgressStore } from "store";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
  const isAnimating = useProgressStore((state) => state.isAnimating);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Progress isAnimating={isAnimating} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
