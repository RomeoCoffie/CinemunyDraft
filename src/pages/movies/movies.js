import React, { useEffect } from 'react';
import { useContext } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { Link } from 'react-router-dom';
import { GoStar } from 'react-icons/go';
//import Movie from './movie';

import { Helmet } from 'react-helmet';
//import useFetch from '../../Hooks/useFetch';

import './movies.css';

export default function Movies() {
  const { films, movieIndex, filteredMovies } = useContext(TkimoviesContext);

  useEffect(() => {
    console.log(films, filteredMovies);
  }, [filteredMovies]);

  return (
    <section>
      <main>
        <Helmet>
          <title> Movies</title>
          <meta
            name="description"
            content="Explore movies selected by film Gurus"
          />
        </Helmet>
        <div className="movie-head ">
          <h2>{movieIndex} Movies</h2>
        </div>

        <article className="movies-container">
          {filteredMovies &&
            filteredMovies.map((movie) => {
              const { id, title, movieImgUrl, rating, year } = movie;

              return (
                <div className="movie">
                  <ul>
                    <li>
                      <p>
                        {rating} <GoStar style={{ color: 'crimson' }} />
                      </p>
                      <img src={movieImgUrl} alt={title} />
                    </li>
                    <div className="movie-footer">
                      <div>
                        <p className="movie-title">{title}</p>
                      </div>

                      <span>
                        <p style={{ display: 'inline-block' }}>{year}&nbsp;</p>

                        <Link className="link" to={`/movies/${movie.id}`}>
                          more...
                        </Link>
                      </span>
                    </div>
                  </ul>
                </div>
              );
            })}
        </article>
      </main>
    </section>
  );
}
