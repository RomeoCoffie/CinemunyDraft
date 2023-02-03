import React, { useEffect } from 'react';
import { useContext } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { Link } from 'react-router-dom';
import { GoStar } from 'react-icons/go';
//import useFetch from '../../Hooks/useFetch';

import './movies.css';
import { Helmet } from 'react-helmet';

export default function Movies() {
  const { films, movieIndex, myFilms } = useContext(TkimoviesContext);

  useEffect(() => {
    console.log(myFilms, films);
  }, [myFilms]);

  //const { data, error, ispending } = useFetch('http://localhost:3000/films');

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
          {films &&
            films.map((movie) => {
              const { id, title, movieImgUrl, rating } = movie;

              return (
                <div className="movie">
                  <ul>
                    <li>
                      <img src={movieImgUrl} alt={title} />
                    </li>
                    <div className="movie-footer">
                      <p className="movie-title">{title}</p>
                      <p>
                        {rating} <GoStar style={{ color: 'crimson' }} />
                      </p>
                      <span>
                        {/* <p style={{ display: 'inline-block' }}>{year}&nbsp;</p> */}

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
