import { initializeApp } from 'firebase/app';
import { getFirestore, get } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyCfcJ_5I41U9-svPq2K38kgkQZOT6joHyc',
  authDomain: 'takling-movies.firebaseapp.com',
  projectId: 'takling-movies',
  storageBucket: 'takling-movies.appspot.com',
  messagingSenderId: '587059069553',
  appId: '1:587059069553:web:b9779571b229d14f6ad1d0',
};

/* const app = initializeApp({
  projectId: 'takling-movies',
  apiKey: 'AIzaSyCfcJ_5I41U9-svPq2K38kgkQZOT6joHyc',
  authDomain: 'takling-movies.firebaseapp.com',
}); */

//initializes firebase
initializeApp(firebaseConfig);

//init firestore
const db = getFirestore();

//init getAuth
const auth = getAuth();

//init firebase storage
const storage = getStorage();

//init firebase funtions
/* const functions = getFunctions(app); */

export { db, auth, storage };
