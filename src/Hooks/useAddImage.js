import { useEffect, useState, useRef } from 'react';
import { storage } from '../components/firebase/config';
import { getDownloadURL, ref } from '@firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';
import {
  Timestamp,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { async } from '@firebase/util';

export const useAddImage = (file) => {
  const [progress, setProgress] = useState(null);
  const [imgUrl, setimgUrl] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const myfile = useRef(file).current;

  useEffect(() => {
    const Addimage = async () => {
      // const storageRef = ref(storage, urlPath);
      //const storageRef = ref(storage, `/questionsImages/${selected.name}`);
      const storageRef = ref(storage, `/questionsImages/${myfile.name}`);

      try {
        const storageUpload = uploadBytesResumable(storageRef, myfile).on(
          'state_changed',
          (snapshot) => {
            let prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
            console.log('upload is' + progress + '% done');
          },
          (err) => {
            if (!isCancelled) {
              setError(err);
              console.log(err);
            }
          },
          async () => {
            await getDownloadURL(storageUpload.snapshot.ref).then((url) => {
              setimgUrl(url);
              console.log(imgUrl);
            });
          }
        );
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          console.log(err);
        }
      }
    };
    return () => setIsCancelled(true);
  }, [myfile]);

  return { progress, imgUrl, error };
};
