import { initializeApp } from 'firebase/app';
import { getFirestore, get } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCfcJ_5I41U9-svPq2K38kgkQZOT6joHyc',
  authDomain: 'takling-movies.firebaseapp.com',
  projectId: 'takling-movies',
  storageBucket: 'takling-movies.appspot.com',
  messagingSenderId: '587059069553',
  appId: '1:587059069553:web:b9779571b229d14f6ad1d0',
};

//initializes firebase
initializeApp(firebaseConfig);

//init firestore
const db = getFirestore();

//init getAuth
const auth = getAuth();

//init firebase storage
const storage = getStorage();

export { db, auth, storage };
