import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { auth } from '../components/firebase/config';
import { AuthContext } from '../context/authcontext/AuthContext';
import { db } from '../components/firebase/config';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

//firebase imports
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
//import { async } from '@firebase/util';

export default function useSignup() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const bio = 'update your Bio';
  const favMovie = 'your favorite movie';
  const location = { label: 'country', value: 'N/A' };
  const gender = 'Gender';

  const { dispatch } = useContext(AuthContext);

  const signup = async (email, password, displayName) => {
    const quiz = [
      { percent: 0, level: 'beginner', score: 0, display: displayName },
    ];
    setError(null);
    setIsPending(false);

    try {
      //signup
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      dispatch({ type: 'LOGIN', payload: res.user }); // we logg the user in after creation
      const createdAt = Timestamp.fromDate(new Date());

      if (!res) {
        throw new Error('Could not complete signup');
      }

      //add display name to user
      await updateProfile(res.user, { ...res.user, displayName });

      //creating a user document
      await setDoc(doc(db, 'users', res.user.uid), {
        online: true,
        displayName,
        location,
        gender,
        bio,
        quiz,
        favMovie,
        createdAt,
      });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, signup, isPending };
}
