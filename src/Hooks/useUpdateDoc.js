import { useEffect, useState } from 'react';
import { db } from '../components/firebase/config';
import {
  //Timestamp,
  //collection,
  updateDoc,
  doc,
  //deleteDoc,
} from 'firebase/firestore';
//import { async } from '@firebase/util';

export const useUpdateDoc = (c, response) => {
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
  const updatingRef = doc(db, c, response);
  //add a document
  const updateGroup = async (doc, imgUrl) => {
    setIsPending(true);
    try {
      //const createdAt = Timestamp.fromDate(new Date());
      // const addedDocument = await addDoc(ref, { ...doc, createdAt });

      await updateDoc(updatingRef, {
        img: imgUrl,
      });

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

  console.log(response);

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { updateGroup, isPending, error };
};
