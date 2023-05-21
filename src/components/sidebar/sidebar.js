import React, { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { Container } from '@mui/system';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Chip } from '@mui/material';

import './sidebar.css';

export default function Sidebar() {
  const {
    movieIndex,
    setMovieIndex,
    indices,
    showDices,
    badSearch,
    handleSearch,
    searchFilmText,
    setSearchFilmText,
    searchSeriesText,
    setSearchSeriesText,
    showIndex,
    setShowIndex,
    activePage,
  } = useContext(TkimoviesContext);

  //const [activeUrl, setActiveUrl] = useState(null);

  //const navigate = useNavigate();

  //gets the active url to display movie or tv show sidebar
  /*  useEffect(() => {
    setActiveUrl(window.location.href);
    //console.log(activeUrl);
  }, [movieIndex, window.location.href, showIndex]); */

  //sets the movieindex to filter the movies/tv shows by
  /*  const filterMovies = (filmindex) => {
    setMovieIndex(filmindex);
    //navigates user to movie/tv page after from singlepages
    if (activeUrl && activeUrl.includes('movies/')) {
      navigate('/movies');
    } else if (activeUrl.includes('tvshows/')) {
      navigate('/tvshows');
    }
  };
 */
  return (
    <section className="side-main">
      <Container>
        {activePage && activePage === 'movies' && (
          <main className="side-main">
            <div className="search">
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                sx={{ backgroundColor: 'white' }}
                value={searchFilmText}
                onChange={(e) => setSearchFilmText(e.target.value)}
              />
              <Button onClick={handleSearch} variant="contained">
                <SearchIcon />
              </Button>
            </div>
            {badSearch && <span style={{ display: 'block' }}>{badSearch}</span>}

            {indices.map((indie) => {
              const { id, text, index } = indie;

              return (
                <Chip
                  label={text}
                  size="small"
                  style={{ margin: 2, backgroundColor: 'white' }}
                  key={id}
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setMovieIndex(index);
                  }}
                />
              );
            })}
          </main>
        )}

        {activePage && activePage === 'tvshows' && (
          <main>
            <div className="search">
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={searchSeriesText}
                sx={{ backgroundColor: 'white' }}
                onChange={(e) => setSearchSeriesText(e.target.value)}
              />
              <Button onClick={handleSearch} variant="contained">
                <SearchIcon />
              </Button>
            </div>
            {badSearch && <span>{badSearch}</span>}
            <div className="sidebar">
              <ul className="links-buttons">
                {showDices.map((indie) => {
                  const { id, text, index } = indie;

                  //console.log(indie.index);

                  return (
                    <li className="index-li" key={id}>
                      <Chip
                        label={text}
                        size="small"
                        style={{ margin: 2, backgroundColor: 'white' }}
                        key={id}
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          setShowIndex(index);
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
