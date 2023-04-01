import React, { useState, useEffect, createContext, useContext } from 'react';
//import { useFetch } from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

import { indices, showDices } from '../../data/datalinks';
import {
  arrayRemove,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  Timestamp,
  arrayUnion,
} from 'firebase/firestore';
import { useCollection } from '../../Hooks/useCollection';
//import { db } from '../../components/firebase/config';
import { AuthContext } from '../authcontext/AuthContext';
//import { useNavigate } from 'react-router-dom';

const TkimoviesContext = createContext();

//Provider, Consumer -TkimoviesContext.Provider

const TkimoviesProvider = ({ children }) => {
  const { documents: news } = useCollection('Posts', ['createdAt', 'desc']);
  const { documents: content } = useCollection('movies', ['createdAt', 'desc']);
  const { documents: shows } = useCollection('shows', ['createdAt', 'desc']);
  const { documents: users } = useCollection('users', ['createdAt', 'desc']);
  const { user } = useContext(AuthContext);
  const [waiting, setWaiting] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [movieIndex, setMovieIndex] = useState([]); //indexof films category
  const [films, setFilms] = useState([]);
  const [posts, setPosts] = useState(null);
  //const [ifmaRates, setIfmaRates] = useState(null);
  const [addLinks, setAddLinks] = useState(false);
  const [rating, setRating] = useState(0);

  const [theShows, setTheShows] = useState([]);
  const [theUsers, setTheUsers] = useState([]);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [filteredShows, setFilteredShows] = useState(null);
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    if (content) {
      const results = content.filter((doc) => doc.contentType === 'movie');
      setFilteredMovies(results);

      /* const results2 = content.filter((doc) => doc.contentType === 'series');
      setTheShows(results2); */
    }
    if (shows) {
      setTheShows(shows);
    }
    if (users) {
      setTheUsers(users);
    }
    /* setLoading(true);
    setWaiting(false);
    const ref = collection(db, 'movies');

    try {
      getDocs(ref).then((snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setMyFilms(results);
        setLoading(false);
        setWaiting(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setWaiting(true);
    } */
    console.log(content, filteredMovies);

    //if sidebar button or index is activated by user
    if (movieIndex && content) {
      const results = content.filter((doc) => doc.contentType === 'movie');
      console.log(results, movieIndex);

      setFilteredMovies(
        results.filter((film) => film.contentIndex.includes(movieIndex))
      );
    }

    if (movieIndex && shows) {
      setTheShows(
        shows.filter((show) => show.contentIndex.includes(movieIndex))
      );
    }
  }, [movieIndex, content]);

  //IFMA ratings by IFMA followers
  const handleRating = (theRef) => {
    if (user) {
      const rateId = `${Math.random()},${user.uid}`;

      const ratingToAdd = {
        createdAt: Timestamp.fromDate(new Date()),
        ourRate: rating,
        rater: user.uid,
        display: user.displayName,
        img: user.photoURL,
        ratingId: rateId,
      };
      updateDoc(theRef, {
        ifmaRating: arrayUnion(ratingToAdd),
      });

      setShowRating(false);
    } else {
      // navigate('/login'); use a modal
      console.log('login to rate');
    }
  };

  return (
    <TkimoviesContext.Provider
      value={{
        films,
        movieIndex,
        setMovieIndex,
        indices,
        showDices,
        news,
        posts,
        setPosts,
        theShows,
        showLinksModal,
        setShowLinksModal,
        filteredMovies,
        theShows,
        handleRating,
        showRating,
        setShowRating,
        addLinks,
        setAddLinks,
        users,
        rating,
        setRating,
      }}
    >
      {children}
    </TkimoviesContext.Provider>
  );
};

export { TkimoviesProvider, TkimoviesContext };
