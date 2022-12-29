import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebase/config';
import { AuthContext } from '../context/authcontext/AuthContext';
import { useNavigate } from 'react-router';

export default function useLogin() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //login
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (!res && error) {
        throw new Error('Could not complete Login');
      }

      dispatch({ type: 'LOGIN', payload: res.user });
      navigate('/');
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
        //console.log(error.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { error, login, isPending };
}
