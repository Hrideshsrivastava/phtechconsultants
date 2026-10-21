// Same Firebase project as the main site; values come from the Worker's build variables.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// Firebase is loaded only when a registration is submitted, keeping the first page load light.
export const saveRegistration = async (data) => {
  const [{ initializeApp, getApps }, { getFirestore, addDoc, collection, serverTimestamp }] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore')
  ]);
  const app = getApps()[0] || initializeApp(firebaseConfig);
  await addDoc(collection(getFirestore(app), 'employabilityRegistrations'), {
    ...data,
    createdAt: serverTimestamp()
  });
};
