import React, { useState, useEffect, createContext } from 'react';
//import { useFetch } from '../../Hooks/useFetch';
import useFetch from '../../Hooks/useFetch';
import { indices } from '../../data/datalinks';
import { useCollection } from '../../Hooks/useCollection';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../components/firebase/config';

const TkimoviesContext = createContext();

//Provider, Consumer -TkimoviesContext.Provider

const TkimoviesProvider = ({ children }) => {
  /*  const { data, error, ispending } = useFetch('http://localhost:3000/films'); */
  const { documents: news } = useCollection('Posts', ['createdAt', 'desc']);
  const { documents: content } = useCollection('movies', ['createdAt', 'desc']);

  const [movieIndex, setMovieIndex] = useState([]);
  const [films, setFilms] = useState([]);
  const [posts, setPosts] = useState(null);
  const [waiting, setWaiting] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [myFilms, setMyFilms] = useState([]);
  const [showLinksModal, setShowLinksModal] = useState(false);

  useEffect(() => {
    if (content) {
      setMyFilms(content);
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
    console.log(content);

    if (movieIndex && content) {
      /*  const filtering = data.filter((film) => film.index === movieIndex);
      setFilms(filtering); */
      setFilms(
        content.filter((film) => film.contentIndex.includes(movieIndex))
      );
    }
  }, [movieIndex, content]);

  return (
    <TkimoviesContext.Provider
      value={{
        films,
        movieIndex,
        setMovieIndex,
        indices,
        news,
        posts,
        setPosts,
        myFilms,
        showLinksModal,
        setShowLinksModal,
      }}
    >
      {children}
    </TkimoviesContext.Provider>
  );
};

export { TkimoviesProvider, TkimoviesContext };
