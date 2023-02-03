import { useEffect, useRef, useState } from 'react';
import { db } from '../components/firebase/config';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';

export const useCollection = (c, _orderBy) => {
  const [documents, setDocuments] = useState('');
  const [error, setError] = useState('');

  //wrapping the _query in a useRef to avoid an infinite
  //loop since is a reference type and will be different on every call
  //const myQuery = useRef(_query).current;

  const orderByQuery = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, c);
    /* 
    if (myQuery) {
      ref = query(ref, where(...myQuery));
    } */

    if (orderByQuery) {
      ref = query(ref, orderBy(...orderByQuery));
    }

    //real time listening
    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });

    return () => unsub(); //  cleanup function to unsubscribe when compo umounts
  }, [c, orderByQuery]);
  return { documents, error };
};
