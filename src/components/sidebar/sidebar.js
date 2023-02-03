import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
//import { indices } from '../../data/datalinks';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';

import './sidebar.css';

export default function Sidebar() {
  const { data, movieIndex, setMovieIndex, indices } =
    useContext(TkimoviesContext);

  const navigate = useNavigate();

  const filterMovies = (filmindex) => {
    setMovieIndex(filmindex);

    //navigate('/movies');
  };

  return (
    <section>
      <main>
        <div className="sidebar">
          <ul className="links-buttons">
            {indices.map((indie, indi) => {
              const { id, text, index } = indie;

              //console.log(indie.index);

              return (
                <li className="index-li">
                  <button
                    onClick={(e) => {
                      console.log(e.target.name);
                      // let newIndex = [...movieIndex];
                      // newIndex[indi] = indie.index;
                      let newIndex = e.target.name;
                      /* setMovieIndex(newIndex); take note*/
                      filterMovies(newIndex);
                    }}
                    key={id}
                    className="index-btn"
                    name={index}
                  >
                    {text}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </section>
  );
}
