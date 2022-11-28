import { initializeApp } from 'firebase/app';
import { ref, update, getDatabase, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const updateUserData = (player) => {
  update(ref(db, 'users/' + player.name), {
    username: player.name,
    points: player.points,
    rank: player.rank,
  })
  .catch(error => console.log(error));
}

export const writeUserData = (name) => {
  set(ref(db, 'users/' + name), {
    username: name,
    points: 0,
    rank: 'Beginner',
  })
  .catch(error => console.log(error));
}

export const readUserData = (setPreviousNames) => {
  onValue(ref(db, 'users/'), (snapshot) => {
    const data = snapshot.val();
    setPreviousNames(data);
  })
};