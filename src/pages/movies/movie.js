import React from 'react';
import { Link } from 'react-router-dom';
import { GoStar } from 'react-icons/go';
import Container from '@mui/material/Container';
//import { useNavigate } from 'react-router-dom';

import './movies.css';

export default function Movie({ movie }) {
  // const navigate = useNavigate();
  const { id, title, movieImgUrl, rating, year } = movie;
  return (
    <Container>
      <ul className="movie" key={id}>
        <li>
          <li>
            <p>
              {rating} <GoStar style={{ color: 'crimson' }} />
            </p>
          </li>
          <li>
            <Link to={`/movies/${movie.id}`}>
              <img src={movieImgUrl} alt={id} key={id} />
            </Link>
          </li>

          <div className="movie-footer">
            <p className="movie-title">{title}</p>

            <span>
              <p style={{ display: 'inline-block' }}>{year}&nbsp;</p>

              <Link className="link" to={`/movies/${movie.id}`}>
                more...
              </Link>
            </span>
          </div>
        </li>
      </ul>
    </Container>
  );
}
