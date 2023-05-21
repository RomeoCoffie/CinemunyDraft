import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GoStar } from 'react-icons/go';

//Firebase imports
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp,
  arrayUnion,
} from 'firebase/firestore';

//Components & Hooks
import { db } from '../../components/firebase/config';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { useFiresotre } from '../../Hooks/useFirestore';
import { useCollection } from '../../Hooks/useCollection';
import { useAddDocs } from '../../Hooks/useAddDocs';
import { urlPatterns } from '../../data/datalinks';
import Linksmodal from '../singlemovie/Linksmodal';
//MUI Stuff
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import './singleshow.css';
//const url = 'http://localhost:3000/series/';

export default function Singleshow() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const theRef = doc(db, 'shows', id);
  const addShowWatchListRef = doc(db, 'users', user.uid);

  const {
    //handleRating,
    showRating,
    setShowRating,
    addLinks,
    setAddLinks,
    showLinksModal,
    setShowLinksModal,
    rating,
    setRating,
  } = useContext(TkimoviesContext);
  const { deleteDocument } = useFiresotre('shows');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(null);
  //const [rating, setRating] = useState(0);
  const [netflixLink, setNetflixLink] = useState(null);
  const [amazonLink, setAmazonLink] = useState(null);
  const [disneyLink, setDisneyLink] = useState(null);
  const [hboLink, setHboLink] = useState(null);
  const [ifmaLink, setIfmaLink] = useState(null);
  const [skyLink, setSkyLink] = useState(null);
  const [linkError, setLinkError] = useState(null);
  const [tkiLink, setTkiLink] = useState(null);
  const [wowLink, setWowLink] = useState(null);
  const [linkType, setLinkType] = useState('tkimovies');
  const [theLinks, setTheLinks] = useState(null);
  const contentType = 'show';
  const { addDocument, response } = useAddDocs('ratings');
  const { documents: ratings } = useCollection('ratings');
  const { documents: users } = useCollection('users');
  const [theShowRatings, setTheShowRatings] = useState(null);
  //const [userWatchList, setUserWatchList] = useState(null);
  const [yourRate, setYourRate] = useState(null);
  //const [timeLine, setTimeLine] = useState(null);

  //const { data, error, ispending } = useFetch(`${url}${id}`);
  // const { title, img, year, rating, genre, cast, trailer, description } = show;

  //IFMA ratings by IFMA followers
  const handleRating = async () => {
    if (user) {
      await addDocument({
        createdAt: Timestamp.fromDate(new Date()),
        ourRate: rating,
        title: show.title,
        rater: user.uid,
        display: user.displayName,
        img: user.photoURL,
        ratingId: id,
      });

      console.log(response);

      setShowRating(false);
    } else {
      // navigate('/login'); use a modal
      console.log('login to rate');
    }
  };

  //add movie links streams/downloads
  const addmovieLinks = async () => {
    const addRef = doc(db, 'shows', id);
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

    if (show.movieLinks) {
      const theLinks = {
        createdAt: Timestamp.fromDate(new Date()),
        netflix: netflixLink || show.movieLinks.netflix,
        amazon: amazonLink || show.movieLinks.amazon,
        ifma: ifmaLink || show.movieLinks.ifma,
        hbo: hboLink || show.movieLinks.hbo,
        wow: wowLink || show.movieLinks.sky,
        disney: disneyLink || show.movieLinks.disney,
        talkinmovies: tkiLink || show.movieLinks.talkinmovies,
        sky: skyLink || show.movieLinks.sky,
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

    getDoc(theRef).then((doc) => {
      if (doc.data() && doc.data().movieLinks) {
        setTheLinks(Object.entries(doc.data().movieLinks));
      }
      setShow(doc.data());
      console.log(theLinks);
    });
    //Filterout how many times this movie has been rated
    if (ratings) {
      setTheShowRatings(ratings.filter((rate) => rate.ratingId === id));
    }
  }, [id, ratings]);

  //checks if user isalready part of the raters of this film
  useEffect(() => {
    if (theShowRatings) {
      console.log(theShowRatings);
      const alreadyRated = theShowRatings.filter(
        (rate) => rate.rater === user.uid
      );
      console.log(alreadyRated);

      if (alreadyRated.length > 0) {
        setShowRating(false);
        setYourRate(alreadyRated);
      } else {
        setShowRating(true);
      }
    }
  }, [theShowRatings]);

  return (
    <section className="singleshow-container">
      <Container sx={{ marginTop: 11 }}>
        {show && (
          <Grid
            container
            sx={{
              marginBottom: 11,
              backgroundColor: 'white',
            }}
          >
            <Grid item xs={11} sm={11} md={6}>
              {showRating && (
                <div className="rate-this">
                  <Typography variant="h6">Rate This Tv Show</Typography>
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
                <img src={show.movieImgUrl} alt={show.title} />
              </div>
            </Grid>
            <Grid item xs={11} sm={11} md={6}>
              {/* <p className="singlemovietitle">
              <span className="keys">title:&nbsp;</span>
              <span>{show.title}</span>
            </p>
            {timeLine === 'present' && (
              <div>
                <p>
                  <span className="keys">year:&nbsp;</span>
                  <span>
                    {show.year} - {show.showStatus}
                  </span>
                </p>
              </div>
            )}
            {timeLine === 'completed' && (
              <div>
                <p>
                  <span className="keys">year:&nbsp;</span>
                  <span>
                    {show.year} - {show.endYear}
                  </span>
                </p>
              </div>
            )} */}
              <p>
                <span className="keys plot">plot:&nbsp;</span>
                {show.desc}
              </p>
              <p>
                <span className="keys">rating:&nbsp;</span>
                <span className="values">
                  {show.rating}{' '}
                  <GoStar
                    style={{
                      color: 'crimson',
                    }}
                  />
                </span>
              </p>

              <p>
                <span className="keys"> Seasons:&nbsp;</span>
                <span className="values">{show.seasons}</span>
              </p>

              <p>
                <span className="keys">genre:</span>

                {show.genre.map((type, index) => {
                  return (
                    <span key={index} className="values">
                      {type},
                    </span>
                  );
                })}
              </p>
              <p className="actors">
                <span className="keys">cast:</span>

                {show.cast.map((actor, index) => {
                  return (
                    <span key={index} className="values">
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
                      sx={{
                        marginLeft: 5,
                      }}
                      variant="contained"
                      onClick={() => setAddLinks(true)}
                    >
                      Add Links
                    </Button>
                  </div>
                  <div>
                    <Button
                      sx={{
                        marginLeft: 5,
                      }}
                      variant="contained"
                      onClick={() => {
                        deleteDocument(id);
                        navigate('/tvshows');
                      }}
                    >
                      Delete Series
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
                    sx={{ marginLeft: 5 }}
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
            contentType={contentType}
          />
        )}
      </Container>
    </section>
  );
}
