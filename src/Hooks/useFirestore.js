import { useReducer, useEffect, useState } from 'react';
import { db } from '../components/firebase/config';
import {
  Timestamp,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { async } from '@firebase/util';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    case 'DELETE_DOCUMENT':
      return {
        isPending: false,
        document: null,
        success: true,
        error: false,
      };
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: true };

    default:
      return state;
  }
};

export const useFiresotre = (c) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const [theDocument, setTheDocment] = useState(null);

  //Only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //collection Ref
  let ref = collection(db, c);
  //add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, { ...doc, createdAt });

      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument.id,
      });

      console.log(addedDocument.id, theDocument);
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR' });
    }
  };

  //delete a document
  const deleteDocument = async (id) => {
    let ref = doc(db, c, id);
    dispatch({ type: 'IS_PENDING' });

    try {
      await deleteDoc(ref);
      dispatchIfNotCancelled({ type: 'DELETE_DOCUMENT' });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR' });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response, theDocument };
};
