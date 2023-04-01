import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GoStar } from 'react-icons/go';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from '../../components/firebase/config';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { useCollection } from '../../Hooks/useCollection';
import { useFiresotre } from '../../Hooks/useFirestore';
import { urlPatterns } from '../../data/datalinks';
import { useNavigate } from 'react-router-dom';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { Grid } from '@mui/material';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import './Singlemovie.css';
import Linksmodal from './Linksmodal';
const url = 'http://localhost:3000/films/';

export default function Singlemovie() {
  const { id } = useParams();
  const theRef = doc(db, 'movies', id);
  const docRef = doc(db, 'movies', id);
  const { user } = useContext(AuthContext);

  const { deleteDocument, response } = useFiresotre('movies');
  const {
    handleRating,
    showRating,
    setShowRating,
    addLinks,
    setAddLinks,
    showLinksModal,
    setShowLinksModal,
    rating,
    setRating,
  } = useContext(TkimoviesContext);

  const [loading, setLoading] = useState(false);
  const [film, setFilm] = useState(null);
  const [ifmaRates, setIfmaRates] = useState(null);
  const [netflixLink, setNetflixLink] = useState(null);
  const [amazonLink, setAmazonLink] = useState(null);
  const [disneyLink, setDisneyLink] = useState(null);
  const [hboLink, setHboLink] = useState(null);
  const [ifmaLink, setIfmaLink] = useState(null);
  const [skyLink, setSkyLink] = useState(null);
  const [linkError, setLinkError] = useState(null);
  const [tkiLink, setTkiLink] = useState(null);
  const [wowLink, setWowLink] = useState(null);
  const [theLinks, setTheLinks] = useState(null);
  const [linkType, setLinkType] = useState(null);
  const navigate = useNavigate();

  //add movie links streams/downloads
  const addmovieLinks = async () => {
    const addRef = doc(db, 'movies', id);
    if (netflixLink && !netflixLink.match(urlPatterns.netflix)) {
      setLinkError('enter a valid Netflix Link');
      console.log(linkError);
      return;
    }

    if (amazonLink && !amazonLink.match(urlPatterns.amazon)) {
      setLinkError('enter a valid Amazon Link');
      console.log(linkError);
      return;
    }

    if (hboLink && !hboLink.match(urlPatterns.hbo)) {
      setLinkError('enter a valid Hbo Link');
      console.log(linkError);
      return;
    }

    if (disneyLink && !disneyLink.match(urlPatterns.disney)) {
      setLinkError('enter a valid Amazon Link');
      console.log(linkError);
      return;
    }

    if (skyLink && !skyLink.match(urlPatterns.sky)) {
      setLinkError('enter a valid Amazon Link');
      console.log(linkError);
      return;
    }

    if (ifmaLink && !ifmaLink.match(urlPatterns.ifma)) {
      setLinkError('enter a valid IFMA Link');
      console.log(linkError);
      return;
    }

    /* if (tkiLink && !tkiLink.match(urlPatterns.talkingmovies)) {
      setLinkError('enter a valid Talking Movies Link');
      console.log(linkError);
      return;
    } */
    //incase there already exist  some links we do this so we do not accidently replace them
    if (film.movieLinks) {
      const theLinks = {
        createdAt: Timestamp.fromDate(new Date()),
        netflix: netflixLink || film.movieLinks.netflix,
        amazon: amazonLink || film.movieLinks.amazon,
        ifma: ifmaLink || film.movieLinks.ifma,
        hbo: hboLink || film.movieLinks.hbo,
        wow: wowLink || film.movieLinks.sky,
        disney: disneyLink || film.movieLinks.disney,
        talkinmovies: tkiLink || film.movieLinks.talkinmovies,
        sky: skyLink || film.movieLinks.sky,
      };
      try {
        updateDoc(addRef, {
          movieLinks: theLinks,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      const theLinks = {
        createdAt: Timestamp.fromDate(new Date()),
        netflix: netflixLink,
        amazon: amazonLink,
        ifma: ifmaLink,
        hbo: hboLink,
        wow: wowLink,
        disney: disneyLink,
        talkinmovies: tkiLink,
        sky: skyLink,
      };
      try {
        updateDoc(addRef, {
          movieLinks: theLinks,
        });
      } catch (error) {
        console.log(error);
      }
    }

    setAddLinks(false);
  };

  // get single movie and check if user already rated this movie or not
  useEffect(() => {
    setLoading(true);

    getDoc(docRef).then((doc) => {
      if (doc.data().movieLinks) {
        setTheLinks(Object.entries(doc.data().movieLinks));
      }

      setFilm(doc.data());
      console.log(theLinks);

      if (user) {
        const alreadyRated = doc.data().ifmaRating.filter((rate) => {
          return rate.rater === user.uid;
        });

        console.log(alreadyRated);

        if (alreadyRated.length > 0) {
          setShowRating(false);
        } else {
          setShowRating(true);
        }
      }
    });
  }, [id]);

  return (
    <section className="singleshow-container">
      <Container>
        {film && (
          <Grid container sx={{ marginBottom: 11, backgroundColor: 'white' }}>
            <Grid item xs={11} sm={11} md={6}>
              {showRating && (
                <div className="rate-this">
                  <Typography variant="h6">Rate This Tv Film</Typography>
                </div>
              )}
            </Grid>
            <Grid item xs={11} sm={5} md={6}>
              {showRating && (
                <div className="rate-this">
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
                  <Button
                    sx={{ marginLeft: 5 }}
                    variant="contained"
                    onClick={() => handleRating(theRef)}
                  >
                    submit
                  </Button>
                </div>
              )}
            </Grid>

            <Grid item xs={11} sm={11} md={5}>
              <div className="singlemovieimg">
                <img src={film.movieImgUrl} alt={film.title} />
              </div>
            </Grid>
            <Grid item xs={11} sm={11} md={6}>
              <p>
                <span className="keys">year:&nbsp;</span>
                <span>
                  {film.title}&nbsp; ({film.year} )
                </span>
              </p>

              <p>
                <span className="keys plot">plot:&nbsp;</span>
                {film.desc}
              </p>
              <p>
                <span className="keys">rating:&nbsp;</span>
                <span className="values">
                  {film.rating} <GoStar style={{ color: 'crimson' }} />
                </span>
              </p>

              <p>
                <span className="keys">genre:</span>

                {film.genre.map((type) => {
                  return <span className="values"> {type},</span>;
                })}
              </p>
              <p className="actors">
                <span className="keys">cast:</span>

                {film.cast.map((actor) => {
                  return (
                    <span span className="values">
                      {actor},
                    </span>
                  );
                })}
              </p>
              <p>
                <span className="keys">trailer:&nbsp;</span>
                <a className="trailer" href={film.trailer}>
                  watch
                </a>
              </p>
            </Grid>
            <Grid item xs={11} sm={11} md={5}></Grid>

            <Grid item xs={11} sm={11} md={6}>
              <div className="download">
                <button
                  onClick={() => setShowLinksModal(true)}
                  className="available"
                >
                  Available At
                </button>
              </div>
            </Grid>
            <Grid item xs={11} sm={11} md={6}>
              {user && !addLinks && (
                <div className="addlinks">
                  <div>
                    <Button
                      sx={{ marginLeft: 5, marginBottom: 3 }}
                      variant="contained"
                      onClick={() => setAddLinks(true)}
                    >
                      Add Links
                    </Button>
                  </div>
                  <div>
                    <Button
                      sx={{ marginLeft: 5 }}
                      variant="contained"
                      onClick={() => {
                        deleteDocument(id);
                        navigate('/movies');
                      }}
                    >
                      Delete Movie
                    </Button>
                  </div>
                </div>
              )}
            </Grid>
            <Grid item xs={11} sm={11} md={6}>
              {addLinks && (
                <div className="show-links">
                  <span>Link Type</span>
                  <select
                    className="form-input"
                    required
                    value={linkType}
                    onChange={(e) => setLinkType(e.target.value)}
                  >
                    <option value="tkimovies">talking movies</option>
                    <option value="netflix">netflix</option>
                    <option value="amazon">amazon prime</option>
                    <option value="hbo">HBO</option>
                    <option value="disney">Disney Plus</option>
                    <option value="sky">Sky</option>
                    <option value="sky">wow</option>
                    <option value="sky">ifma</option>
                  </select>
                  {linkType === 'netflix' && (
                    <input
                      type="text"
                      onChange={(e) => setNetflixLink(e.target.value)}
                      value={netflixLink}
                    />
                  )}

                  {linkType === 'amazon' && (
                    <input
                      type="text"
                      onChange={(e) => setAmazonLink(e.target.value)}
                      value={amazonLink}
                    />
                  )}

                  {linkType === 'hbo' && (
                    <input
                      type="text"
                      onChange={(e) => setHboLink(e.target.value)}
                      value={hboLink}
                      /* ref={castInput} */
                    />
                  )}

                  {linkType === 'disney' && (
                    <input
                      type="text"
                      onChange={(e) => setDisneyLink(e.target.value)}
                      value={disneyLink}
                      /* ref={castInput} */
                    />
                  )}

                  {linkType === 'sky' && (
                    <input
                      type="text"
                      onChange={(e) => setSkyLink(e.target.value)}
                      value={skyLink}
                      /* ref={castInput} */
                    />
                  )}

                  {linkType === 'sky' && (
                    <input
                      type="text"
                      onChange={(e) => setIfmaLink(e.target.value)}
                      value={ifmaLink}
                      /* ref={castInput} */
                    />
                  )}

                  {linkType === 'tkimovies' && (
                    <input
                      type="text"
                      onChange={(e) => setTkiLink(e.target.value)}
                      value={tkiLink}
                      /* ref={castInput} */
                    />
                  )}

                  {linkType === 'wow' && (
                    <input
                      type="text"
                      onChange={(e) => setWowLink(e.target.value)}
                      value={wowLink}
                      /* ref={castInput} */
                    />
                  )}
                  <Button
                    sx={{ marginLeft: 5, marginBottom: 5 }}
                    variant="contained"
                    onClick={addmovieLinks}
                  >
                    Add
                  </Button>

                  {/*  <button onClick={addmovieLinks}>add</button> */}
                </div>
              )}
            </Grid>
          </Grid>
        )}
        {showLinksModal && (
          <Linksmodal
            theLinks={theLinks}
            showLinksModal={showLinksModal}
            setShowLinksModal={setShowLinksModal}
          />
        )}
      </Container>
    </section>
  );
}
