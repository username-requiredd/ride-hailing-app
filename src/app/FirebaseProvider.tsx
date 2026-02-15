'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { AuthProvider, FirebaseAppProvider } from 'reactfire';
import { PropsWithChildren } from 'react';
import { firebaseConfig } from '@/lib/firebase';

function FirebaseProvider({ children }: PropsWithChildren) {
  const firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(firebaseApp);

  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <AuthProvider sdk={auth}>{children}</AuthProvider>
    </FirebaseAppProvider>
  );
}

export default FirebaseProvider;
