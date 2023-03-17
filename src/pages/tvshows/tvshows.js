import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { Link } from 'react-router-dom';
import { GoStar } from 'react-icons/go';
import { Helmet } from 'react-helmet';

import './tvshows.css';

export default function Tvshows() {
  //const { data } = useContext(TkimoviesContext);
  //const { data, error, ispending } = useFetch('http://localhost:3000/series');
  const [loading, setLoading] = useState(false);
  const url = 'http://localhost:3000/series';
  const [shows, setShows] = useState([]);
  const { theShows, movieIndex } = useContext(TkimoviesContext);

  console.log(theShows);

  /*  useEffect(() => {
    setLoading(true);
    async function getvshows() {
      try {
        const response = await fetch(`${url}`);
        const json = await response.json();
        setShows(json);
        console.log(shows);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getvshows();
  }, [url]); */

  return (
    <section>
      <main>
        <h2 className="tvshow-head ">Tv-Shows</h2>
        <Helmet>
          <title>Tv Shows</title>
        </Helmet>

        <article className="tvshows-container">
          {theShows &&
            theShows.map((show) => {
              const { title, movieImgUrl, rating } = show;
              return (
                <div className="tvshow">
                  <ul>
                    <li>
                      <img src={movieImgUrl} alt={title} />
                    </li>

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
                  </ul>
                </div>
              );
            })}
        </article>
      </main>
    </section>
  );
}
