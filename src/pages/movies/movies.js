import React from 'react';
import { useContext } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { Link } from 'react-router-dom';
import { GoStar } from 'react-icons/go';
//import useFetch from '../../Hooks/useFetch';

import './movies.css';

export default function Movies() {
  const { films } = useContext(TkimoviesContext);

  //const { data, error, ispending } = useFetch('http://localhost:3000/films');

  return (
    <section>
      <main>
        <h2 className="movie-head ">Movies</h2>
        <div className="underline"></div>
        <article className="movies-container">
          {films &&
            films.map((movie) => {
              const { id, title, img, rating } = movie;

              return (
                <div className="movie">
                  <ul>
                    <li>
                      <img src={img} alt={title} />
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
