import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

//import { db } from '../../components/firebase/config';
import { Timestamp } from 'firebase/firestore';
import { useFiresotre } from '../../Hooks/useFirestore';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { getDownloadURL, ref } from '@firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../components/firebase/config';
import { AiOutlinePlus } from 'react-icons/ai';
import { urlPatterns, genreList, keywordsListTv } from '../../data/datalinks';
import { useCollection } from '../../Hooks/useCollection';

import './addshow.css';
import { Container } from '@mui/material';

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
  const [contentIndex, setContentIndex] = useState([]);
  const [newKeyword, setNewKeyword] = useState(null);
  const keywordInput = useRef(null);
  const { addDocument } = useFiresotre('shows');
  const { documents: shows } = useCollection('shows');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ifExist, setIfExist] = useState(false);
  const [alreadExisting, setalreadyExisting] = useState(null);

  //Checking if  movie already exist
  useEffect(() => {
    if (shows && title) {
      const fileExist = shows.filter((show) => show.title === title);
      setalreadyExisting(fileExist);
    }
    if (alreadExisting && alreadExisting.length > 0) {
      setIfExist(true);
      console.log(alreadExisting);
    }
  }, [shows, title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let person = user.uid;
    setInputError(null);
    setyoutubeLinkError(null);
    const createdAt = Timestamp.fromDate(new Date());

    console.log(movieImgUrl);
    if (movieImgUrl) {
      if (rating > 10 || rating < 1) {
        setInputError('rating must be between 1-10');
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
    const ops = newGenre.trim().toLowerCase();

    if (ops && !genre.includes(ops)) {
      setGenre((prevOption) => [...prevOption, ops]);
    }
    setNewGenre('');
    genreInput.current.focus();
  };

  //Handle Keywords input
  const addKeywords = (e) => {
    e.preventDefault();
    const ops = newKeyword.trim().toLowerCase();

    if (ops && !contentIndex.includes(ops)) {
      setContentIndex((prevOption) => [...prevOption, ops]);
    }
    setNewKeyword('');
    keywordInput.current.focus();
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

    inputClear.current.value = '';
    navigate('/tvshows');
  };

  // console.log(questionImgUrl);

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
      {/*  <main className="addmovie-main"> */}
      {/* <p className="salute">Hi,&nbsp;{user?.name}</p> */}
      <h3 className="title">Add Show</h3>
      <div></div>
      <form className="form-container" onSubmit={handleSubmit}>
        {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
        {alreadExisting && alreadExisting.length > 0 && (
          <p style={{ color: 'red' }}>
            show may already exist&nbsp;{alreadExisting[0].title} and
            starring&nbsp;
            {(alreadExisting[0].cast[0], alreadExisting[0].cast[1])}
          </p>
        )}

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
        <Multiselect
          isObject={false}
          onRemove={(e) => setGenre(e)}
          onSelect={(e) => setGenre(e)}
          options={genreList}
        />

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
        <Multiselect
          isObject={false}
          selectedValues={[]}
          /*  onKeyPressFn={(e) => console.log(e.target.value)} */
          onRemove={(e) => setContentIndex(e)}
          // onSearch={(e) => console.log(e.target.value)}
          onSelect={(e) => setContentIndex(e)}
          options={keywordsListTv}
        />

        {title && desc && contentIndex.length > 1 && (
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
              <span style={{ color: 'red' }}>progress: &nbsp;{progress}%</span>
            )}
          </div>
        )}

        {thumbnailError && <p style={{ color: 'red' }}>{thumbnailError}</p>}

        <br />

        <button className="btn">submit</button>
      </form>
      {/* </main> */}
    </Container>
  );
}
