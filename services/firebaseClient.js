import { initializeApp } from 'firebase/app';

const CLIENT_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIRE_API,
  authDomain: process.env.NEXT_PUBLIC_FIRE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT,
  storageBucket: process.env.NEXT_PUBLIC_FIRE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRE_SENDER,
  appID: process.env.NEXT_PUBLIC_FIRE_APP,
};

const firebaseClient = initializeApp(CLIENT_CONFIG);

export { firebaseClient };
