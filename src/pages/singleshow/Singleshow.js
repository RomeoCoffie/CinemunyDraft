import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GoStar } from 'react-icons/go';
//import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import './singleshow.css';
const url = 'http://localhost:3000/series/';

export default function Singleshow() {
  const { id } = useParams();
  //const { data } = useContext(TkimoviesContext);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(null);
  const [rating, setRating] = useState(0);

  //const { data, error, ispending } = useFetch(`${url}${id}`);
  // const { title, img, year, rating, genre, cast, trailer, description } = show;

  useEffect(() => {
    setLoading(true);
    async function getsingleshow() {
      try {
        const response = await fetch(`${url}${id}`);
        const json = await response.json();
        setShow(json);
        console.log(show);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getsingleshow();
  }, [id]);

  return (
    <section className="section">
      {show && (
        <div className="single-container">
          <div className="rate">
            <label htmlFor="rating">
              Rate This Tv Show, On a Scale of 1 -10
            </label>
          </div>

          <div>
            <select
              type="number"
              className="selectrate"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="singlemovieimg">
            <img src={show.img} alt={show.title} />
          </div>

          <div className="movie-data">
            <div className="movie-info">
              <p className="singlemovietitle">
                <span className="keys">title:&nbsp;</span>
                <span>{show.title}</span>
              </p>

              <p>
                <span className="keys">year:&nbsp;</span>
                <span>{show.year}</span>
              </p>

              <p>
                <span className="keys plot">plot:&nbsp;</span>
                {show.description}
              </p>

              <p>
                <span className="keys">rating:&nbsp;</span>
                <span className="values">
                  {show.rating} <GoStar style={{ color: 'crimson' }} />
                </span>
              </p>

              <p>
                <span className="keys">genre:</span>

                {show.genre.map((type) => {
                  return <span className="values"> {type},</span>;
                })}
              </p>
              <p className="actors">
                <span className="keys">cast:</span>

                {show.cast.map((actor) => {
                  return (
                    <span span className="values">
                      {actor},
                    </span>
                  );
                })}
              </p>
              <p>
                <span className="keys">trailer:&nbsp;</span>
                <a className="trailer" href={show.trailer}>
                  watch
                </a>
              </p>
            </div>
            <div className="download">
              <button className="available">Available At</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
