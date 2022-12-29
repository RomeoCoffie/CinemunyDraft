import React, { useContext, useEffect } from 'react';
import { useState, useRef } from 'react';
import useFetch from '../../Hooks/useFetch';
import { db } from '../../components/firebase/config';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { useCollection } from '../../Hooks/useCollection';
import { useFiresotre } from '../../Hooks/useFirestore';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { getDownloadURL, ref } from '@firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../components/firebase/config';

import './addmovie.css';

export default function Addmovie() {
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [director, setDirector] = useState([]);
  const [rating, setRating] = useState();
  const [year, setYear] = useState(0);
  const optionsInput = useRef(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [thumbnail, setThumbnail] = useState([]);
  const [movieImgUrl, setMovieImgUrl] = useState(null);
  const [progress, setProgress] = useState(null);
  const [newOption, setNewOption] = useState();
  const inputClear = useRef(null);
  /* const [newDirector, setNewDirector] = useState();
   const [writer, setWriter] = useState([]);
   const [newWrite, setNewWriter] = useState();
   
   const optionsInput = useRef(null);
  const [cast, setCast] = useState([]);
  const [newCast, setNewCast] = useState();
  const [question, setQuestion] = useState();
  const [option, setOption] = useState([]);
  const [newOption, setNewOption] = useState();
  const [correctAnswer, setCorrectAnswer] = useState(); */
  const { documents: movies } = useCollection('movies');

  const { addDocument, response } = useFiresotre('movies');
  const { authIsReady, user } = useContext(AuthContext);
  //const { person, setPerson } = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let person = user.uid;

    console.log(movieImgUrl);
    if (movieImgUrl) {
      addDocument({ person, title, director, rating, year, desc, movieImgUrl });
    } else {
      addDocument({ person, title, director, rating, year, desc });
    }

    // console.log(response);

    //console.log(person);

    /* let ref = collection(db, 'questions');

    const createdAt = Timestamp.fromDate(new Date());
    myquestions.forEach((question) => {
      addDoc(ref, { ...question, createdAt });
      //addDocument(question);
    }); */

    //console.log(question, option, correctAnswer);
    resetFields();
  };

  //handle options input
  const addOptions = (e, setoptions) => {
    e.preventDefault();
    const ops = newOption.trim();

    if (ops && !director.includes(ops)) {
      setoptions((prevOption) => [...prevOption, ops]);
    }
    setNewOption('');

    optionsInput.current.focus();
  };

  //handle image upload if question has an image
  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (selected) {
      if (!selected.type.includes('image')) {
        setThumbnailError('Selected file size must be an image');
        return;
      }

      if (selected.size > 500000) {
        setThumbnailError('Selected file size must be less than 500kb');
        return;
      }

      // Create the file metadata
      /* @type {any} */
      const metadata = {
        contentType: selected.type,
        customMetadata: {
          gener: 'action',
          year: '2022',
        },
      };

      const storageRef = ref(storage, `/movies/${selected.name}`);
      const storageUpload = uploadBytesResumable(
        storageRef,
        selected,
        metadata
      );

      storageUpload.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
          console.log('upload is' + progress + '% done');
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(storageUpload.snapshot.ref).then((url) => {
            setMovieImgUrl(url);
            console.log(url, movieImgUrl);
          });
        }
      );
    }

    return;
  };

  //reseting fields after submission
  const resetFields = () => {
    setTitle('');
    setYear('');
    setDirector('');
    setRating('');
    setDesc('');

    inputClear.current.value = '';
  };

  // console.log(questionImgUrl);
  console.log(thumbnail);

  //Getting documents from firebase collection
  // useEffect(() => {
  /* if (thesequestions) {
      setTitle(thesequestions);
    } */
  /* const ref = collection(db, 'movies');

    getDocs(ref).then((snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setTitle(results);
    }); */
  //}, [thesequestions]);

  return (
    <main className="addmovie-section">
      {/*  <main className="addmovie-main"> */}
      {/* <p className="salute">Hi,&nbsp;{user?.name}</p> */}
      <h3 className="title">Add Film</h3>
      <form className="form-container" onSubmit={handleSubmit}>
        <p>Title:</p>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <br />

        <p>Description:</p>
        <textarea
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          required
        />

        <p>Add Image:</p>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required
          ref={inputClear}
        />

        {thumbnailError && <p style={{ color: 'red' }}>{thumbnailError}</p>}

        <p>Directors:</p>
        <input
          type="text"
          onChange={(e) => setNewOption(e.target.value)}
          value={newOption}
          ref={optionsInput}
        />
        <button
          className="btnoptions"
          onClick={(e) => addOptions(e, setDirector)}
        >
          add
        </button>

        <p>Rating:</p>
        <input
          type="text"
          onChange={(e) => setRating(e.target.value)}
          value={rating}
          required
        />

        <p>Year:</p>
        <input
          type="text"
          onChange={(e) => setYear(e.target.value)}
          value={year}
          required
        />

        <br />

        <button className="btn">submit</button>
      </form>
      {/* </main> */}
    </main>
  );
}
