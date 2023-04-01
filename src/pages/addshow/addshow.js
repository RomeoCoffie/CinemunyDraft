import React, { useContext, useEffect } from 'react';
import { useState, useRef } from 'react';

//import { db } from '../../components/firebase/config';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { useCollection } from '../../Hooks/useCollection';
import { useFiresotre } from '../../Hooks/useFirestore';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { getDownloadURL, ref } from '@firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../components/firebase/config';
import { AiOutlinePlus } from 'react-icons/ai';
import { urlPatterns } from '../../data/datalinks';

import './addshow.css';

export default function Addshow() {
  const [title, setTitle] = useState(null);
  const [showStatus, setShowStatus] = useState('ongoing');
  const [desc, setDesc] = useState(null);
  const [director, setDirector] = useState([]);
  const [rating, setRating] = useState(1);
  const [seasons, setSeasons] = useState(1);
  const [year, setYear] = useState(2022);
  const [endYear, setEndYear] = useState('2022');
  const optionsInput = useRef(null);
  const castInput = useRef(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [thumbnail, setThumbnail] = useState([]);
  const [movieImgUrl, setMovieImgUrl] = useState(null);
  const [progress, setProgress] = useState(null);
  const [cast, setCast] = useState([]);
  const [newOption, setNewOption] = useState();
  const [newCast, setNewCast] = useState(null);
  const [genre, setGenre] = useState([]);
  const [newGenre, setNewGenre] = useState(null);
  const [ifmaRating, setIfmaRating] = useState([]);
  const genreInput = useRef(null);
  const inputClear = useRef(null);
  const [youtubeLinkError, setyoutubeLinkError] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [contentIndex, setContentIndex] = useState(null);
  /* const [newDirector, setNewDirector] = useState();
   const [genre, setGenre] = useState([]);
   
   
   const optionsInput = useRef(null);
 
  
  const [question, setQuestion] = useState();
  const [option, setOption] = useState([]);
  const [newOption, setNewOption] = useState();
  const [correctAnswer, setCorrectAnswer] = useState(); */
  //const { documents: shows } = useCollection('shows');

  const { addDocument, response } = useFiresotre('shows');
  const { authIsReady, user } = useContext(AuthContext);
  //const { person, setPerson } = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let person = user.uid;
    setInputError(null);
    setyoutubeLinkError(null);
    const createdAt = Timestamp.fromDate(new Date());

    /* if (!rating < 10 || !rating > 1) {
      setInputError('rating must be between 1-10');
      return;
    }
 */

    console.log(movieImgUrl);
    if (movieImgUrl) {
      if (!trailer || !trailer.match(urlPatterns.youtube)) {
        setyoutubeLinkError('Enter Valid Youtube url');
        return;
      }

      addDocument({
        person,
        title,
        director,
        rating,
        seasons,
        year,
        endYear,
        showStatus,
        desc,
        movieImgUrl,
        cast,
        genre,
        ifmaRating,
        createdAt,
        trailer,
        contentIndex,
      });
    } else {
      setInputError('Check inputs and submit  again');
      return;
    }

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

  //handle cast input
  const addCast = (e, setCast) => {
    e.preventDefault();
    const ops = newCast.trim();

    if (ops && !cast.includes(ops)) {
      setCast((prevOption) => [...prevOption, ops]);
    }
    setNewCast('');
    castInput.current.focus();
  };

  //handle cast input
  const addGenre = (e, setGenre) => {
    e.preventDefault();
    const ops = newGenre.trim();

    if (ops && !genre.includes(ops)) {
      setGenre((prevOption) => [...prevOption, ops]);
    }
    setNewGenre('');
    genreInput.current.focus();
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

      if (selected.size > 900000) {
        setThumbnailError('Selected file size must be less than 500kb');
        return;
      }

      // Create the file metadata
      /* @type {any} */
      const metadata = {
        contentType: selected.type,
        customMetadata: {
          title: title,
          description: desc,
          year: year,
        },
      };

      const storageRef = ref(storage, `/shows/${title}/${selected.name}`);
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
    setYear(2022);
    setEndYear(2022);
    setSeasons(1);
    setDirector('');
    setRating(1);
    setDesc('');
    setCast('');
    setGenre('');

    setTrailer('');
    setContentIndex('');

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
      <h3 className="title">Add Show</h3>
      <div></div>
      <form className="form-container" onSubmit={handleSubmit}>
        {inputError && <p style={{ color: 'red' }}>{inputError}</p>}

        <span>Title:</span>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <br />

        <span>Description:</span>
        <textarea
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          required
        />

        <span>Developed by:</span>
        <input
          type="text"
          className={`${director.length < 1 ? 'track-input' : 'track-input1'}`}
          onChange={(e) => setNewOption(e.target.value)}
          value={newOption}
          ref={optionsInput}
        />
        <button onClick={(e) => addOptions(e, setDirector)}>
          <AiOutlinePlus />
        </button>
        {director &&
          director.map((dir) => {
            return <span className="genre">{dir},&nbsp;</span>;
          })}

        <span>Cast:</span>
        <input
          type="text"
          className={`${cast.length < 1 ? 'track-input' : 'track-input1'}`}
          onChange={(e) => setNewCast(e.target.value)}
          value={newCast}
          ref={castInput}
        />
        <button onClick={(e) => addCast(e, setCast)}>
          <AiOutlinePlus />
        </button>
        {cast &&
          cast.map((gen) => {
            return <span className="genre">{gen},&nbsp;</span>;
          })}

        <span>Genre:</span>
        <input
          type="text"
          className={`${genre.length < 1 ? 'track-input' : 'track-input1'}`}
          onChange={(e) => setNewGenre(e.target.value)}
          value={newGenre}
          ref={genreInput}
        />
        <button onClick={(e) => addGenre(e, setGenre)}>
          <AiOutlinePlus />
        </button>
        {genre &&
          genre.map((gen) => {
            return <span className="genre">{gen},&nbsp;</span>;
          })}

        <span>Rating:</span>
        <input
          type="number"
          onChange={(e) => setRating(e.target.value)}
          value={rating}
          required
        />
        <span>Number of Seasons:</span>
        <input
          type="number"
          onChange={(e) => setSeasons(e.target.value)}
          value={seasons}
          required
        />

        <span> Start Year:</span>
        <input
          type="number"
          onChange={(e) => setYear(e.target.value)}
          value={year}
          required
        />
        <select
          className="form-input"
          required
          value={showStatus}
          onChange={(e) => setShowStatus(e.target.value)}
        >
          <option value="showing">on-going</option>
          <option value="completed">comepleted</option>
        </select>

        {showStatus === 'completed' && (
          <div>
            <span> End Year:</span>
            <input
              type="number"
              onChange={(e) => setEndYear(e.target.value)}
              value={endYear}
              required
            />
          </div>
        )}

        {youtubeLinkError && <p style={{ color: 'red' }}>{youtubeLinkError}</p>}
        <span>Youtube:</span>

        <input
          className={`${youtubeLinkError ? 'invalid-link' : 'valid-link'}`}
          type="text"
          onChange={(e) => {
            setTrailer(e.target.value);
          }}
          value={trailer}
        />
        <span>Keywords:</span>
        <input
          type="text"
          onChange={(e) => setContentIndex(e.target.value)}
          value={contentIndex}
          required
        />
        <span>Add Image:</span>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required
          ref={inputClear}
        />

        {thumbnailError && <p style={{ color: 'red' }}>{thumbnailError}</p>}

        <br />

        <button className="btn">submit</button>
      </form>
      {/* </main> */}
    </main>
  );
}
