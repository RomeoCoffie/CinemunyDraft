import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import './Singlemovie.css';
import Linksmodal from './Linksmodal';
const url = 'http://localhost:3000/films/';

export default function Singlemovie() {
  const { id } = useParams();
  const theRef = doc(db, 'movies', id);
  const docRef = doc(db, 'movies', id);
  const { authIsReady, user } = useContext(AuthContext);
  const { showLinksModal, setShowLinksModal } = useContext(TkimoviesContext);
  // const { documents: content } = useCollection('movies');
  const { deleteDocument, response } = useFiresotre('movies');

  //const { data } = useContext(TkimoviesContext);

  const [loading, setLoading] = useState(false);
  const [film, setFilm] = useState(null);
  const [ifmaRates, setIfmaRates] = useState(null);
  const [showRating, setShowRating] = useState(false);
  const [addLinks, setAddLinks] = useState(false);
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
  const navigate = useNavigate();

  //const { data, error, ispending } = useFetch(`${url}${id}`);
  // const { title, img, year, rating, genre, cast, trailer, description } = film;
  //fansRating
  const handleRating = () => {
    //const person = user.uid;
    const rateId = `${Math.random()},${user.uid}`;
    setLinkError(null);

    const ratingToAdd = {
      createdAt: Timestamp.fromDate(new Date()),
      ourRate: ifmaRates,
      rater: user.uid,
      display: user.displayName,
      img: user.photoURL,
      ratingId: rateId,
    };
    updateDoc(theRef, {
      ifmaRating: arrayUnion(ratingToAdd),
    });

    setShowRating(false);
  };

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
    setAddLinks(false);
  };

  useEffect(() => {
    setLoading(true);

    getDoc(docRef).then((doc) => {
      if (doc.data().movieLinks) {
        setTheLinks(Object.entries(doc.data().movieLinks));
      }

      setFilm(doc.data());
      console.log(theLinks);

      const alreadyRated = doc.data().ifmaRating.filter((rate) => {
        return rate.rater === user.uid;
      });

      console.log(alreadyRated);

      if (alreadyRated.length > 0) {
        setShowRating(false);
      } else {
        setShowRating(true);
      }
    });
  }, [id]);

  return (
    <section className="section">
      {film && (
        <div className="single-container">
          {showRating && (
            <div className="rate">
              <span>Rate This Movie, On a Scale of 1 -10</span>
            </div>
          )}

          {showRating && (
            <div className="pple-rate">
              {/* <form onSubmit={handleRating}> */}
              <select
                type="number"
                className="selectrate"
                value={ifmaRates}
                onChange={(e) => setIfmaRates(e.target.value)}
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

              <button onClick={handleRating} className="rating-btn">
                submit
              </button>
              {/* </form> */}
            </div>
          )}

          <div className="singlemovieimg">
            <img src={film.movieImgUrl} alt={film.title} />
          </div>

          <div className="movie-data">
            <div className="movie-info">
              <p className="singlemovietitle">
                <span className="keys">title:&nbsp;</span>
                <span>{film.title}</span>
              </p>

              <p>
                <span className="keys">year:&nbsp;</span>
                <span>{film.year}</span>
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
            </div>

            <div className="download">
              <button
                onClick={() => setShowLinksModal(true)}
                className="available"
              >
                Available At
              </button>
            </div>
          </div>

          {user && !addLinks && (
            <div className="addlinks">
              <div>
                <button
                  onClick={() => setAddLinks(true)}
                  className="available1"
                >
                  Add Links
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteDocument(id);
                    navigate('/movies');
                  }}
                  className="available2"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {addLinks && (
            <div>
              <span>Netflix</span>
              <input
                type="text"
                onChange={(e) => setNetflixLink(e.target.value)}
                value={netflixLink}
                /*  ref={optionsInput} */
              />

              <span>Amazon Prime:</span>
              <input
                type="text"
                onChange={(e) => setAmazonLink(e.target.value)}
                value={amazonLink}
                /* ref={castInput} */
              />

              <span>Hbo:</span>
              <input
                type="text"
                onChange={(e) => setHboLink(e.target.value)}
                value={hboLink}
                /* ref={castInput} */
              />

              <span>Disneyplus:</span>
              <input
                type="text"
                onChange={(e) => setDisneyLink(e.target.value)}
                value={disneyLink}
                /* ref={castInput} */
              />

              <span>sky:</span>
              <input
                type="text"
                onChange={(e) => setSkyLink(e.target.value)}
                value={skyLink}
                /* ref={castInput} */
              />

              <span>ifma:</span>
              <input
                type="text"
                onChange={(e) => setIfmaLink(e.target.value)}
                value={ifmaLink}
                /* ref={castInput} */
              />

              <span>Talking Movies:</span>
              <input
                type="text"
                onChange={(e) => setTkiLink(e.target.value)}
                value={tkiLink}
                /* ref={castInput} */
              />
              <span>Wow:</span>
              <input
                type="text"
                onChange={(e) => setWowLink(e.target.value)}
                value={wowLink}
                /* ref={castInput} */
              />
              <button onClick={addmovieLinks}>add</button>
            </div>
          )}
        </div>
      )}

      {showLinksModal && (
        <Linksmodal
          theLinks={theLinks}
          showLinksModal={showLinksModal}
          setShowLinksModal={setShowLinksModal}
        />
      )}
    </section>
  );
}
