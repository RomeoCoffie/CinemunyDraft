import React, { useState, useRef, useEffect, useContext } from 'react';
import Multiselect from 'multiselect-react-dropdown';
//import useFetch from '../../Hooks/useFetch';
//import { db } from '../../components/firebase/config';
import { useNavigate } from 'react-router-dom';
//my Hooks
import { useCollection } from '../../Hooks/useCollection';
import { useFiresotre } from '../../Hooks/useFirestore';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { storage } from '../../components/firebase/config';
//firebase libs
import { getDownloadURL, ref } from '@firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';
import { Timestamp } from 'firebase/firestore';

//Icons
import { AiOutlinePlus } from 'react-icons/ai';

//MUI
import Container from '@mui/material/Container';
//Resource
import { urlPatterns } from '../../data/datalinks';
import { genreList, keywordsList } from '../../data/datalinks';

import './addmovie.css';

export default function Addmovie() {
  const [title, setTitle] = useState(null);
  const [contentType, setContentType] = useState('movie');
  const [desc, setDesc] = useState(null);
  const [director, setDirector] = useState([]);
  const [rating, setRating] = useState(1);
  const [year, setYear] = useState(2022);
  const optionsInput = useRef(null);
  const castInput = useRef(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [thumbnail, setThumbnail] = useState([]);
  const [movieImgUrl, setMovieImgUrl] = useState(null);
  const [progress, setProgress] = useState(null);
  const [cast, setCast] = useState([]);
  const [newOption, setNewOption] = useState(null);
  const [newCast, setNewCast] = useState(null);
  const [genre, setGenre] = useState([]);
  // const [newGenre, setNewGenre] = useState(null);
  const [ifmaRating, setIfmaRating] = useState([]);
  // const genreInput = useRef(null);
  const inputClear = useRef(null);
  const [youtubeLinkError, setyoutubeLinkError] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [contentIndex, setContentIndex] = useState([]);
  // const [newKeyword, setNewKeyword] = useState(null);
  //const keywordInput = useRef(null);
  const [ifExist, setIfExist] = useState(false);
  const [alreadExisting, setalreadyExisting] = useState(null);

  const { documents: movies } = useCollection('movies');

  const { addDocument } = useFiresotre('movies');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //Checking if  movie already exist
  useEffect(() => {
    if (movies && title) {
      const fileExist = movies.filter((film) => film.title === title);
      setalreadyExisting(fileExist);
    }
    if (alreadExisting && alreadExisting.length > 0) {
      setIfExist(true);
      console.log(alreadExisting);
    }
  }, [movies, title]);

  //Submitting movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    let person = user.uid;
    setInputError(null);
    setyoutubeLinkError(null);
    const createdAt = Timestamp.fromDate(new Date());

    /* if (ifExist) {
      setInputError('Movie already exist');
      return; //unsure about this
    }
 */
    console.log(movieImgUrl);
    if (movieImgUrl) {
      if (rating > 10 || rating < 3) {
        setInputError('rating must be between 3-10');
        return;
      }

      if (!contentType) {
        setInputError('You must select Content Type');
        return;
      }

      if (!trailer || !trailer.match(urlPatterns.youtube)) {
        setyoutubeLinkError('Enter Valid Youtube url');
        return;
      }

      addDocument({
        person,
        title,
        director,
        rating,
        year,
        desc,
        movieImgUrl,
        contentType,
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
    if (newOption && newOption.length > 0) {
      const ops = newOption.trim();

      if (ops && !director.includes(ops)) {
        setoptions((prevOption) => [...prevOption, ops]);
      }
    }
    setNewOption('');
    optionsInput.current.focus();
  };

  //handle cast input
  const addCast = (e, setCast) => {
    e.preventDefault();
    if (newCast && newCast.length > 0) {
      const ops = newCast.trim();

      if (ops && !cast.includes(ops)) {
        setCast((prevOption) => [...prevOption, ops]);
      }
    }
    setNewCast('');
    castInput.current.focus();
  };

  //handle movie poster upload
  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (selected) {
      if (!selected.type.includes('image')) {
        setThumbnailError('Selected file size must be an image');
        return;
      }

      if (selected.size > 9999999) {
        setThumbnailError('Selected file size must be less than 1Mb');
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

      const storageRef = ref(storage, `/movies/${title}/${selected.name}`);
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
    setDirector('');
    setRating(1);
    setDesc('');
    setCast('');
    setGenre('');
    setContentType('movie');
    setTrailer('');
    setContentIndex('');
    inputClear.current.value = '';
    navigate('/movies');
  };

  // console.log(questionImgUrl);
  //console.log(thumbnail, contentIndex);

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
    <Container sx={{ padding: 0, marginBottom: 15 }}>
      <div>
        <h3 className="title">Add Film</h3>
      </div>
      <div>
        <form className="form-container" onSubmit={handleSubmit}>
          {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
          {alreadExisting && alreadExisting.length > 0 && (
            <p style={{ color: 'red' }}>
              Film may already exist&nbsp;{alreadExisting[0].title} and
              starring&nbsp;
              {(alreadExisting[0].cast[0], alreadExisting[0].cast[1])}
            </p>
          )}
          <span>Type</span>
          <select
            className="form-input"
            required
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="movie">movie</option>
            <option value="series">series/tv-show</option>
          </select>
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

          <span>Director(s):</span>
          <input
            type="text"
            className={`${
              director.length < 1 ? 'track-input' : 'track-input1'
            }`}
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
          <Multiselect
            isObject={false}
            onRemove={(e) => setGenre(e)}
            onSelect={(e) => setGenre(e)}
            options={genreList}
          />

          <span>Rating:</span>
          <input
            type="number"
            min="1"
            max="10"
            step="any"
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            required
          />

          <span>Year:</span>
          <input
            type="date"
            onChange={(e) => setYear(e.target.value)}
            value={year}
            required
          />

          {youtubeLinkError && (
            <p style={{ color: 'red' }}>{youtubeLinkError}</p>
          )}
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
          <Multiselect
            isObject={false}
            selectedValues={[]}
            /*  onKeyPressFn={(e) => console.log(e.target.value)} */
            onRemove={(e) => setContentIndex(e)}
            // onSearch={(e) => console.log(e.target.value)}
            onSelect={(e) => setContentIndex(e)}
            options={keywordsList}
          />

          {/*  <input
            type="text"
            className={`${genre.length < 1 ? 'track-input' : 'track-input1'}`}
            onChange={(e) => setNewKeyword(e.target.value)}
            value={newKeyword}
            ref={keywordInput}
          />
          <button onClick={addKeywords}>
            <AiOutlinePlus />
          </button>
          {contentIndex &&
            contentIndex.map((indi) => {
              return <span className="genre">{indi},&nbsp;</span>;
            })} */}

          {title && desc && contentIndex.length > 0 && (
            <div>
              <span>Add Image:</span>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
                ref={inputClear}
              />
              {progress && (
                <span style={{ color: 'red' }}>
                  progress: &nbsp;{progress}%
                </span>
              )}
            </div>
          )}

          {thumbnailError && <p style={{ color: 'red' }}>{thumbnailError}</p>}

          <br />

          <button className="btn">submit</button>
        </form>
      </div>

      {/* </main> */}
    </Container>
  );
}
