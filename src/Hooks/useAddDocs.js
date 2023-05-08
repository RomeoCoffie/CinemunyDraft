import { useEffect, useState } from 'react';
import { db } from '../components/firebase/config';
import { Timestamp, collection, addDoc } from 'firebase/firestore';
//import { async } from '@firebase/util';

export const useAddDocs = (c) => {
  const [response, setResonpse] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [theDocument, setTheDocment] = useState(null);

  //Only dispatch if not cancelled
  /* const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  }; */

  //collection Ref
  let ref = collection(db, c);
  //add a document
  const addDocument = async (doc) => {
    setIsPending(true);
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, { ...doc, createdAt });
      setResonpse(addedDocument);

      /* addDoc(ref, { ...doc, createdAt }).then((docRef) => {
        setResonpse(docRef.id);
      }); */

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        console.log(error);
      }

      console.log(response);
    } catch (error) {
      setIsPending(false);
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, response };
};
