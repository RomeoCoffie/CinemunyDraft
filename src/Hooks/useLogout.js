import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { auth } from '../components/firebase/config';
import { AuthContext } from '../context/authcontext/AuthContext';
import { signOut } from 'firebase/auth';

export default function useLogout() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //signup
      await signOut(auth);
      dispatch({ type: 'LOGOUT' }); //dispatch logout action, no need for payload user is out.

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
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
  return { error, logout, isPending };
}
