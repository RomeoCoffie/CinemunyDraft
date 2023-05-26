import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCollection } from '../../Hooks/useCollection';
import { useAddDocs } from '../../Hooks/useAddDocs';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { db } from '../../components/firebase/config';


//Firebase imports
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp,
  arrayUnion,
} from 'firebase/firestore';
import './linksmodal.css';

//this modal displays links to shows or movies

export default function Linksmodal({
  theLinks,
  showLinksModal,
  setShowLinksModal,
  contentType,
  theFilmDetails,
  filmId,
  typeIs,
}) {
  const { documents: users } = useCollection('users');
  const [userWatchList, setUserWatchList] = useState(null);
  const { user } = useContext(AuthContext);
  const { film } = useContext(TkimoviesContext)
  const addToWatchListRef = doc(db, 'users', user.uid);
  const { id } = useParams();

console.log(theFilmDetails,'thefilm')
console.log(filmId,'filmId')
console.log(typeIs,'showtype')
const shipThese={
  title: theFilmDetails.title,
  id: filmId,
  productionType: typeIs
}
useEffect(() => {
  //Gettings users
    if (users) {
      setUserWatchList(users.filter((person) => person.id === user.uid));
    }
  }, [users]);

  //AddMovies to WatchList
  const addToWatchList = async () => {
    if (userWatchList && userWatchList[0].watchList.length > 5) {
      let temp = userWatchList[0].watchList.shift(); //gets oldest score
      console.log(temp);

      //delete oldest score from memory
      const newResults = userWatchList[0].watchList.filter((film) => {
        return film !== temp;
      });
      let temp2 = [...newResults, shipThese];
      updateDoc(addToWatchListRef, {
        watchList: temp2,
      });
    } else {
      updateDoc(addToWatchListRef, {
        watchList: arrayUnion(shipThese),
      });
    }

    setShowLinksModal(true);
  };
  console.log(userWatchList,'from linksmodal')

  /*  useEffect(() => {
    if (userWatchList) {
      console.log(userWatchList[0].watchList);
    }
  }, [userWatchList]);
 */
  return (
    <section
      className={`${
        showLinksModal ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className="modal-content">
        {theLinks &&
          theLinks.map((url, index) => {
            //console.log(url, url.length);
            if (url[1] && url[0] !== 'createdAt') {
              console.log('Not empty');
              let vod = url[0];
              let theurl = url[1];
              return (
                <ul className="urlscontainer">
                  <li key={index}>
                    <a href={theurl}>{vod}</a>
                  </li>
                </ul>
              );
            }
          })}
        {contentType && contentType === 'show' && (
          <div className="get-movie-div">
            <a
              className="get-movie"
              href="https://chat.whatsapp.com/Hhyiwp0UPzX3VDXLwY7oi6"
            >
              Get this series
            </a>
          </div>
        )}
        {film && film.contentType === 'movie' && (
          <div className="get-movie-div">
            <a
              className="get-movie"
              href="https://chat.whatsapp.com/Hhyiwp0UPzX3VDXLwY7oi6"
            >
              Get this movie
            </a>
          </div>
        )}
        <button className="btn" onClick={() => addToWatchList()}>
          Add to Watchlist
        </button>
        <button className="close-btn" onClick={() => setShowLinksModal(false)}>
          ok
        </button>
      </div>
    </section>
  );
}
