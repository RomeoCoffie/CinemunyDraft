import React, { useState, useEffect, createContext } from 'react';
//import { useFetch } from '../../Hooks/useFetch';
import useFetch from '../../Hooks/useFetch';
import { indices } from '../../data/datalinks';

const TkimoviesContext = createContext();

//Provider, Consumer -TkimoviesContext.Provider

const TkimoviesProvider = ({ children }) => {
  const { data, error, ispending } = useFetch('http://localhost:3000/films');

  const [movieIndex, setMovieIndex] = useState([]);
  const [films, setFilms] = useState([]);

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

      /* console.log(indices, indices[2], indices[1], 'hi');
      setFilms(() => data.filter((index) => index.include[movieIndex]));
      console.log(films); if indices were arrays*/
    }
  }, [movieIndex, data]);

  return (
    <TkimoviesContext.Provider
      value={{ films, movieIndex, setMovieIndex, indices }}
    >
      {children}
    </TkimoviesContext.Provider>
  );
};

export { TkimoviesProvider, TkimoviesContext };
