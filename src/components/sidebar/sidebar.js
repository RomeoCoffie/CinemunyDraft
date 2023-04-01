import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { Container } from '@mui/system';

//import './sidebar.css';
import { Chip } from '@mui/material';

export default function Sidebar() {
  const { movieIndex, setMovieIndex, indices, showDices } = useContext(
    TkimoviesContext
  );
  const [activeUrl, setActiveUrl] = useState(null);

  const navigate = useNavigate();

  //gets the active url to display movie or tv show sidebar
  useEffect(() => {
    setActiveUrl(window.location.href);
    //console.log(activeUrl);
  }, [movieIndex, window.location.href]);

  //sets the movieindex to filter the movies/tv shows by
  const filterMovies = (filmindex) => {
    setMovieIndex(filmindex);
    //navigates user to movie/tv page after from singlepages
    if (activeUrl.includes('movies/')) {
      navigate('/movies');
    } else if (activeUrl.includes('tvshows/')) {
      navigate('/tvshows');
    }
  };

  return (
    <section className="side-main">
      <Container>
        {activeUrl && activeUrl.includes('movies') && (
          <main className="side-main">
            <div className="sidebar">
              {indices.map((indie) => {
                const { id, text, index } = indie;

                //console.log(indie.index);

                return (
                  <Chip
                    label={text}
                    size="small"
                    style={{ margin: 2, backgroundColor: 'white' }}
                    key={id}
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      filterMovies(index);
                    }}
                  />
                );
              })}
            </div>
          </main>
        )}
        {activeUrl && activeUrl.includes('tvshows') && (
          <main>
            <div className="sidebar">
              <ul className="links-buttons">
                {showDices.map((indie) => {
                  const { id, text, index } = indie;

                  //console.log(indie.index);

                  return (
                    <li className="index-li">
                      <Chip
                        label={text}
                        size="small"
                        style={{ margin: 2, backgroundColor: 'white' }}
                        key={id}
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          filterMovies(index);
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </main>
        )}
      </Container>
    </section>
  );
}
