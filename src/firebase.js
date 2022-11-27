import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAAlzrlcxHNHnnf5Y3IZWwtrbxq4KlI9IU",
//   authDomain: "rps101-28ebd.firebaseapp.com",
//   databaseURL: "https://rps101-28ebd-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "rps101-28ebd",
//   storageBucket: "rps101-28ebd.appspot.com",
//   messagingSenderId: "1041848605174",
//   appId: "1:1041848605174:web:6567bc613f638eb1698fd7"
// };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);