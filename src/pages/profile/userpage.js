import React, { useContext, useEffect, useState } from 'react';

//Hooks & Components & Resources
import { useCollection } from '../../Hooks/useCollection';
import { AuthContext } from '../../context/authcontext/AuthContext';

import { updateDoc, doc } from 'firebase/firestore';
import { storage } from '../../components/firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../../components/firebase/config';
//import { QuizContext } from '../../context/quizcontext/Quizcontext';
//MUI Stuff
////import Skeleton from '@mui/material/Skeleton';
//import Stack from '@mui/material/Stack';
//import Card from '@mui/material/Card';

//Styles
import './user.css';
import Theuser from './theuser';

export default function Userpage() {
  const { documents: users } = useCollection('users');
  const { user } = useContext(AuthContext);
  // const { theUsers } = useContext(QuizContext);
  const [cinemunyUser, setCinemunyUser] = useState(null);

  const [profileThumbnail, setProfileThumbnail] = useState(null);
  const [changeImg, setChangeImg] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [progress, setProgress] = useState(null);

  // const [lastScoreIndex, setLastScoreIndex] = useState(null);

  //filterout current user to get details
  useEffect(() => {
    if (users) {
      // console.log(users);
      const candidate = users.filter((person) => person.id === user.uid);
      setCinemunyUser(candidate);
    }
  }, [users]);

  //use to update userprofile in firebase
  const auth = getAuth();
  //update user profile-image
  const handleFileChange = async (e) => {
    e.preventDefault();
    console.log('select file');
    setProfileThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (selected) {
      if (!selected.type.includes('image')) {
        setThumbnailError('Selected file size must be an image');

        return;
      }

      if (selected.size > 9000000) {
        setThumbnailError('Selected file size must be less than 500kb');
        console.log('huge file');
        return;
      }

      const storageRef = ref(storage, `/users/${user.uid}/${selected.name}`);
      const storageUpload = uploadBytesResumable(storageRef, selected);
      storageUpload.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
          console.log('upload is' + prog + '% done');
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(storageUpload.snapshot.ref).then((url) => {
            setProfileThumbnail(url);
            updateProfile(auth.currentUser, {
              photoURL: url,
            })
              .then(() => {
                console.log('profile udpated');
              })
              .catch((error) => {
                console.log(error);
              });
            console.log(url, profileThumbnail);
          });
        }
      );
      setChangeImg(false);
      //add to url to user
      console.log(storageRef);
    }
  };

  //Update image in users record
  useEffect(() => {
    if (profileThumbnail) {
      const editRef = doc(db, 'users', user.uid);

      try {
        updateDoc(editRef, {
          photoURL: profileThumbnail,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [profileThumbnail]);

  /* if (cinemunyUser || award) {
    console.log(
      cinemunyUser[0].location.value,
      lastScoreIndex,
      lastLevel,
      user.photoURL
    );
  } */

  return (
    <section className="profile-section">
      <h1> Out put user details</h1>
      {/*       <Theuser
        cinemunyUser={cinemunyUser}
        changeImg={changeImg}
        setChangeImg={setChangeImg}
        user={user}
        handleFileChange={handleFileChange}
        userQuiz={userQuiz}
      ></Theuser> */}
    </section>
  );
}
