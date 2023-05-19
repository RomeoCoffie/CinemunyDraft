import React, { useEffect } from 'react';
import { useContext } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import Sidebar from '../../components/sidebar/sidebar';
import { Link } from 'react-router-dom';
import { GoStar } from 'react-icons/go';
import { Helmet } from 'react-helmet';
import Container from '@mui/material/Container';

import './tvshows.css';

export default function Tvshows() {
  //const [shows, setShows] = useState([]);
  const { theShows, showIndex, activePage, setActivePage } = useContext(
    TkimoviesContext
  );

  //setting active page
  useEffect(() => {
    setActivePage('tvshows');
    window.scrollTo(0, 261);
  }, []);

  console.log(theShows);

  return (
    <section>
      <main>
        <Container>
          <div style={{ marginTop: '5.5rem' }}>
            <Sidebar />
          </div>
          <div className="show-head">
            <h2>{showIndex || 'Tv-Shows'}</h2>
            <Helmet>
              <title> Tv Shows</title>
            </Helmet>
          </div>
        </Container>

        <article className="tvshows-container">
          {theShows &&
            theShows.map((show) => {
              const { title, movieImgUrl, rating } = show;
              return (
                <div className="tvshow" key={show.id}>
                  <ul>
                    <li>
                      <Link className="link" to={`/tvshows/${show.id}`}>
                        <img
                          src={movieImgUrl}
                          className="show-poster"
                          alt={title}
                        />
                      </Link>

                      <div className="tvshow-footer">
                        <p className="tvshow-title">{title}</p>
                        <p>
                          {rating} <GoStar style={{ color: 'crimson' }} />
                        </p>
                        <span>
                          {/* <p style={{ display: 'inline-block' }}>{year}&nbsp;</p> */}

                          <Link className="link" to={`/tvshows/${show.id}`}>
                            more...
                          </Link>
                        </span>
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
