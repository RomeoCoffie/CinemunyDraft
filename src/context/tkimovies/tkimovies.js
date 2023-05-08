import React, { useState, useEffect, createContext, useContext } from 'react';
//import { useFetch } from '../../Hooks/useFetch';
import { indices, showDices } from '../../data/datalinks';
import { updateDoc, Timestamp, arrayUnion } from 'firebase/firestore';
import { useCollection } from '../../Hooks/useCollection';
//import { db } from '../../components/firebase/config';
import { AuthContext } from '../authcontext/AuthContext';
//import { useNavigate } from 'react-router-dom';

const TkimoviesContext = createContext();

//Provider, Consumer -TkimoviesContext.Provider

const TkimoviesProvider = ({ children }) => {
  //resources from firebase
  const { documents: news } = useCollection('Posts', ['createdAt', 'desc']);
  const { documents: movies } = useCollection('movies', ['createdAt', 'desc']);
  const { documents: shows } = useCollection('shows', ['createdAt', 'desc']);
  const { documents: users } = useCollection('users', ['createdAt', 'desc']);
  const { documents: commentss } = useCollection('comments', [
    'createdAt',
    'asc',
  ]);
  const { user } = useContext(AuthContext);
  //variables for this context
  const [waiting, setWaiting] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [movieIndex, setMovieIndex] = useState(null); //indexof films category
  const [showIndex, setShowIndex] = useState(null); //indexof films category
  //const [films, setFilms] = useState([]);
  const [posts, setPosts] = useState(null);
  //const [ifmaRates, setIfmaRates] = useState(null);
  const [addLinks, setAddLinks] = useState(false);
  const [rating, setRating] = useState(0);
  //const [commentss, setCommentss] = useState(null);
  const [theShows, setTheShows] = useState([]);
  const [theUsers, setTheUsers] = useState([]);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [activePage, setActivePage] = useState(null);
  //const [filteredShows, setFilteredShows] = useState(null);
  const [showRating, setShowRating] = useState(false);
  //search functionality variables
  const [searchFilmText, setSearchFilmText] = useState('');
  const [searchSeriesText, setSearchSeriesText] = useState('');
  const [searcResults, setSearchResults] = useState(null);
  const [badSearch, setBadSearch] = useState('');

  //handlesearch click
  const handleSearch = () => {
    setBadSearch('');
    if (searchFilmText && searchFilmText.length > 0 && movies) {
      setSearchResults(
        movies.filter((film) =>
          film.title.toLowerCase().includes(searchFilmText.toLowerCase())
        )
      );
    } else {
      console.log('No such film was found');
    }

    if (searchSeriesText && shows) {
      setSearchResults(
        shows.filter((show) =>
          show.title.toLowerCase().includes(searchSeriesText.toLowerCase())
        )
      );
    } else {
      console.log('No such film was found');
    }
  };

  //console.log(searcResults);

  useEffect(() => {
    //Checking if there is a search
    if (
      searcResults &&
      searcResults.length > 0 &&
      window.location.href.includes('movie')
    ) {
      setFilteredMovies(searcResults);
      setSearchFilmText('');
    }
    if (
      searcResults &&
      searcResults.length < 1 &&
      window.location.href.includes('movie')
    ) {
      setBadSearch('Film Not Found');
    }

    if (
      searcResults &&
      searcResults.length > 1 &&
      window.location.href.includes('tvshow')
    ) {
      setTheShows(searcResults);
      setSearchSeriesText('');
    }
    if (
      searcResults &&
      searcResults.length < 1 &&
      window.location.href.includes('tvshow')
    ) {
      setBadSearch('Series Not Found');
    }

    return () => {
      setSearchResults(null);
    };
  }, [searchFilmText, searchSeriesText, searcResults]);

  //fetching resources
  useEffect(() => {
    setBadSearch(null);
    if (movies && !searcResults) {
      setFilteredMovies(movies);
    }
    if (shows && !searcResults) {
      setTheShows(shows);
    }
    if (users) {
      setTheUsers(users);
    }

    console.log(movies, filteredMovies);

    //if sidebar button or index is activated by user
    if (movieIndex && movies) {
      /* const results = content.filter((doc) => doc.contentType === 'movie');
      console.log(results, movieIndex); */

      setFilteredMovies(
        movies.filter(
          (film) =>
            film.contentIndex.includes(movieIndex) ||
            film.genre.includes(movieIndex)
        )
      );
      console.log(filteredMovies);
    }

    /* if (comments) {
      setCommentss(comments);
    } */
  }, [movieIndex, movies, showIndex]);

  //filtering shows in by keywords
  useEffect(() => {
    if (showIndex && shows) {
      setTheShows(
        shows.filter(
          (show) =>
            show.contentIndex.includes(showIndex) ||
            show.genre.includes(showIndex)
        )
      );
    }
  }, [showIndex]);

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
        handleRating,
        showRating,
        setShowRating,
        addLinks,
        setAddLinks,
        users,
        rating,
        setRating,
        movies,
        handleSearch,
        searchFilmText,
        setSearchFilmText,
        searchSeriesText,
        setSearchSeriesText,
        badSearch,
        commentss,
        showIndex,
        setShowIndex,
        activePage,
        setActivePage,
      }}
    >
      {children}
    </TkimoviesContext.Provider>
  );
};

export { TkimoviesProvider, TkimoviesContext };
