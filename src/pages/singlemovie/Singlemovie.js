import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GoStar } from 'react-icons/go';
//import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import './Singlemovie.css';
const url = 'http://localhost:3000/films/';

export default function Singlemovie() {
  const { id } = useParams();
  //const { data } = useContext(TkimoviesContext);

  const [loading, setLoading] = useState(false);
  const [film, setFilm] = useState(null);
  //const { data, error, ispending } = useFetch(`${url}${id}`);
  // const { title, img, year, rating, genre, cast, trailer, description } = film;

  useEffect(() => {
    setLoading(true);
    async function getsinglemovie() {
      try {
        const response = await fetch(`${url}${id}`);
        const json = await response.json();
        setFilm(json);
        console.log(film);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getsinglemovie();
  }, [id]);

  return (
    <section className="section">
      {film && (
        <>
          <div className="singlemovieimg">
            <img src={film.img} alt={film.title} />
          </div>
          <div>
            <div className="movie-info">
              <p className="singlemovietitle">{film.title}</p>
              <p>
                <span className="keys">year:&nbsp;</span>
                {film.year}
              </p>
              <p>
                <span className="keys">rating:&nbsp;</span>
                {film.rating} <GoStar style={{ color: 'crimson' }} />
              </p>
              <p>
                <span className="keys wide">genre:</span>

                {film.genre.map((type) => {
                  return <span> {type},</span>;
                })}
              </p>
              <p className="actors">
                <span className="keys">cast:</span>

                {film.cast.map((actor) => {
                  return <span> {actor},</span>;
                })}
              </p>
              <p>
                <span className="keys">trailer:&nbsp;</span>
                <a className="trailer" href={film.trailer}>
                  watch
                </a>
              </p>
              <p>
                <span className="keys plot">plot:&nbsp;</span>
                {film.description}
              </p>

              <button className="available">Available At</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
