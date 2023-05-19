import React, { useEffect, useContext } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';
//import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
//import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { GoStar } from 'react-icons/go';
//import Movie from './movie';

import { Helmet } from 'react-helmet';
//import useFetch from '../../Hooks/useFetch';

import './movies.css';
//import { Container } from '@mui/material';

export default function Movies() {
  const { movieIndex, filteredMovies, setActivePage } = useContext(
    TkimoviesContext
  );
  const navigate = useNavigate();

  //setting active page
  useEffect(() => {
    setActivePage('movies');
    window.scrollTo(0, 261);

    /*  window.scroll({
      top: 200,
      left: 200,
      behavior: 'smooth',
    }); */
  }, []);

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
        <div style={{ marginTop: '5.5rem' }}>
          <Sidebar />
        </div>

        <div className="movie-head ">
          <h2>{movieIndex || 'Movie Timeline'}</h2>
        </div>

        <article className="movies-container">
          {filteredMovies &&
            filteredMovies.map((movie, index) => {
              const { id, title, movieImgUrl, rating, year } = movie;

              return (
                <div className="movie" key={id}>
                  <ul key={id} className="movie-ul">
                    <li key={index} className="movie-li">
                      <p className="rate-p">
                        {rating}{' '}
                        <GoStar
                          style={{
                            color: 'crimson',
                          }}
                        />
                      </p>
                      <button
                        onClick={() => navigate(`/movies/${movie.id}`)}
                        className="rate-button"
                      >
                        <ThumbDownIcon
                          sx={{
                            fontSize: 13,
                          }}
                        />
                        <ThumbUpIcon
                          sx={{
                            fontSize: 13,
                          }}
                        />
                      </button>
                      <div className="filmage-div">
                        <Link to={`/movies/${movie.id}`}>
                          <img
                            src={movieImgUrl}
                            alt={title}
                            className="movie-poster"
                          />
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="movie-footer">
                        <div>
                          <p className="movie-title">{title}</p>
                        </div>

                        <div className="movie-misc">
                          <p
                            style={{
                              display: 'inline-block',
                            }}
                          >
                            {year}&nbsp;
                          </p>

                          <Link className="link" to={`/movies/${movie.id}`}>
                            more...
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
        </article>
      </main>
    </section>
  );
}
