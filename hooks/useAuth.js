import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import { setCookie, destroyCookie } from 'nookies';

export const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIRE_API,
  authDomain: process.env.NEXT_PUBLIC_FIRE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT,
  storageBucket: process.env.NEXT_PUBLIC_FIRE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRE_SENDER,
  appID: process.env.NEXT_PUBLIC_FIRE_APP,
});

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }, props) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  const router = useRouter();

  const auth = getAuth();

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const tokenResult = await rawUser.getIdTokenResult();
      const user = await formatUser(tokenResult);
      setUser(user);
      setToken(tokenResult.token);
      setCookie(null, 'lptoken', tokenResult.token, {
        maxAge: 3600,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
    } else {
      setUser(null);
      setToken(null);
      destroyCookie(null, 'lptoken', {
        path: '/',
      });
      destroyCookie(null, 'lprefresh', {
        path: '/',
      });
    }
  };

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      await handleUser(user);
    });
    return () => unsubscribe();
  }, []);

  // // Refresh the token every 10 minutes
  // useEffect(() => {
  //   const handle = setInterval(async () => {
  //     const user = auth.currentUser;
  //     if (user) {
  //       const token = await user.getIdToken(true);
  //       setToken(token);
  //       setCookie(null, 'lptoken', token, {
  //         maxAge: 3600,
  //         secure: true,
  //         sameSite: 'strict',
  //         path: '/',
  //       });
  //     }
  //   }, 10 * 60 * 1000);
  //   return () => clearInterval(handle);
  // }, []);

  const login = async (email, password, tenantId, redirect) => {
    auth.tenantId = tenantId;
    const response = await signInWithEmailAndPassword(auth, email, password);

    // Set refresh token cookie
    if (response._tokenResponse.refreshToken) {
      setCookie(null, 'lprefresh', response._tokenResponse.refreshToken, {
        maxAge: 604800, // 7 days
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
    }

    // Set user
    if (response.user) {
      await handleUser(response.user);
      if (redirect) {
        router.push(redirect);
      }
    }
  };

  const logout = async (redirect) => {
    await signOut(auth);
    await handleUser(false);
    if (redirect) {
      router.push(redirect);
    }
  };

  const resetPassword = async (email, tenantId) => {
    auth.tenantId = tenantId;
    await sendPasswordResetEmail(auth, email);
    return true;
  };

  const confirmReset = async (code, password, tenantId) => {
    auth.tenantId = tenantId;
    await confirmPasswordReset(auth, code, password);
    return true;
  };

  const getToken = async () => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(true);
      return token;
    }
  };

  // The user object and auth methods
  const values = {
    user,
    token,
    login,
    logout,
    resetPassword,
    confirmReset,
    getToken,
  };

  return (
    <AuthContext.Provider value={values} {...props}>
      {children}
    </AuthContext.Provider>
  );
};

const formatUser = async (user) => {
  return {
    uid: user.claims.user_id,
    email: user.claims.email,
    name: user.claims.name,
    role: user.claims.role,
    photoUrl: user.claims.picture,
    tenantId: user.claims.firebase.tenant,
    tenantMongoId: user.claims.tenant_mongo_id,
  };
};
