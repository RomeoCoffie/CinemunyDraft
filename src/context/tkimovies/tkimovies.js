import React, { useState, useEffect, createContext } from 'react';
//import { useFetch } from '../../Hooks/useFetch';
import useFetch from '../../Hooks/useFetch';
import { indices } from '../../data/datalinks';
import { useCollection } from '../../Hooks/useCollection';
import { collection, getDocs } from 'firebase/firestore';

const TkimoviesContext = createContext();

//Provider, Consumer -TkimoviesContext.Provider

const TkimoviesProvider = ({ children }) => {
  const { data, error, ispending } = useFetch('http://localhost:3000/films');
  const { documents: news } = useCollection('Posts');

  const [movieIndex, setMovieIndex] = useState([]);
  const [films, setFilms] = useState([]);
  const [posts, setPosts] = useState(null);

  //const { id, text, index } = indices;

  /* function userMovies(cine, muny) {
    for (let i = 0; cine.length >= i; i++) {
      if (cine[i] === [i]) {
        return ;
      }
    }
    return num > 1;
  } */

  useEffect(() => {
    if (data) {
      setFilms(data);

      //console.log(movieIndex, films);
    }
    if (movieIndex && data) {
      /*  const filtering = data.filter((film) => film.index === movieIndex);
      setFilms(filtering); */
      setFilms(data.filter((film) => film.index.includes(movieIndex)));
    }
  }, [movieIndex, data]);

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
      }}
    >
      {children}
    </TkimoviesContext.Provider>
  );
};

export { TkimoviesProvider, TkimoviesContext };
