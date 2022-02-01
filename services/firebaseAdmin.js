import * as firebaseAdmin from 'firebase-admin';

import serviceAccount from './googleServiceAccount.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

export { firebaseAdmin };
