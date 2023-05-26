import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCollection } from '../../Hooks/useCollection';
import { AuthContext } from '../../context/authcontext/AuthContext';


//Firebase stuff
import { db } from '../../components/firebase/config';
import { updateDoc, doc } from 'firebase/firestore';



import './profile.scss';

function Theuser({ handleFileChange }) {
  const navigate=useNavigate()

  const { documents: movies } = useCollection('movies', ['createdAt', 'desc']);
  const { documents: shows } = useCollection('shows', ['createdAt', 'desc']);


//Handling scan for movie or show specific
const [specificMovie, setSpecificMovie]=useState(null)
const [specificLink, setSpecificLink]=useState(null)


  const [userWatchList, setUserWatchList] = useState([]);
  const { documents: users } = useCollection('users');
  const { user } = useContext(AuthContext);


  //Show and hide edit blocks
  const [showNameEdit, setShowNameEdit]=useState(false)
  const [showFavMovieEdit, setShowFavMovieEdit]=useState(false)
  const [showBioEdit, setShowBioEdit]=useState(false)


  //Grabbing the values from edit block
  const [nameValue, setNameValue]=useState('')
  const [favMovieValue, setFavMovieValue]=useState('')
  const [bioValue, setBioValue]=useState('')



//Hide and reveal inputs for edit
  const profileNameGoEdit = ()=>{
    setShowNameEdit(true);
  }

  const profileFavMovieGoEdit = ()=>{
    setShowFavMovieEdit(true);
  }

  const profileBioGoEdit=()=>{
    setShowBioEdit(true);
  }


//functions for submitting edits to firebase
  const editProfileName = async ()=>{
    const theRef = doc(db, 'users', user.uid);
    if (nameValue==='') {
      alert('Please input a new name')
      return;
    }
    //this updates user details with either new/already existing data
    try {
      await updateDoc(theRef, {
        displayName: nameValue
      });
    } catch (error) {
      console.log(error);
    }

    setShowNameEdit(false)
  }

  const editProfileFavMovie = async ()=>{
    const theRef = doc(db, 'users', user.uid);
    if (favMovieValue==='') {
      alert('Please input a title')
      return;
    }
    //this updates user details with either new/already existing data
    try {
      await updateDoc(theRef, {
        favMovie: favMovieValue
      });
    } catch (error) {
      console.log(error);
    }

    setShowFavMovieEdit(false)
  }

  const editProfileBio = async()=>{
    const theRef = doc(db, 'users', user.uid);
    if (bioValue==='') {
      alert('Please input something')
      return;
    }
    //this updates user details with either new/already existing data
    try {
      await updateDoc(theRef, {
        bio: bioValue
      });
    } catch (error) {
      console.log(error);
    }

    setShowBioEdit(false)
  }


  //Gettings users
  useEffect(() => {
    if (users) {
      setUserWatchList(users.filter((person) => person.id === user.uid));
    }
  }, [users]);

  console.log(user, 'user from theuser page');
  console.log(userWatchList, 'actual')
  return (
    <>
      <div className="userProfilePage">
        <div className="profileSideBar">
          <div className="sideBarImage">
            <img
              src={
                user
                  ? user.photoURL
                  : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
              }
              alt="profile"
              className="userProfileImage"
            />
          </div>
          <label className='editImageInput'>
            <input
            type="file"
            onChange={(e) => handleFileChange(e)}
            accept="image/*"
          />
          Change Image
          </label>
          
        </div>
        <div className="userProfile">
          <div className="bio">
            <div className='proDetailDivs'>
            <label>Name: </label>
              {
                showNameEdit === false ?
                (
                  userWatchList.length > 0 ?
                  (
                    <div>
                    <span>{userWatchList[0].displayName}</span>
                    <button onClick={profileNameGoEdit} style={{ float: 'right', backgroundColor: 'rgb(218, 248, 255)', padding: '2px', color: 'rgb(63, 35, 2)', border: '1px solid gainsboro' }} >Edit</button>
                  </div>
                  ) :  <span>Loading</span>
                ) : (<div>
                      <input type='text' placeholder='New Name' onChange={(e)=>setNameValue(e.target.value)}/>
                      <button className='profileNameGoEditButton' onClick={editProfileName} style={{ float: 'right', backgroundColor: 'rgb(218, 248, 255)', padding: '2px', color: 'rgb(63, 35, 2)', border: '1px solid gainsboro' }} >Save</button>
                    </div>)
              }
            </div>
            <div className='proDetailDivs'>
              <label>Country: </label>
              {
                userWatchList.length > 0  ? 
                (
                  <span>{userWatchList[0].location.value}</span>
                ) : <span>Loading</span>
              }
              
            </div>
            <div className='proDetailDivs'>
              <label>fav-Movie: </label>
              {
                showFavMovieEdit === false ?
                (
                  userWatchList.length > 0  ? 
                  (
                    <div>
                      <span>{userWatchList[0].favMovie}</span>
                      <button onClick={profileFavMovieGoEdit} style={{ float: 'right', backgroundColor: 'rgb(218, 248, 255)', padding: '2px', color: 'rgb(63, 35, 2)', border: '1px solid gainsboro' }}>Edit</button>
                    </div>
                  ) : <span>Loading</span>
                ) : (<div>
                      <input type='text' placeholder='Favorite Movie' onChange={(e)=>setFavMovieValue(e.target.value)}/>
                      <button className='profileFavMovieGoEditButton' onClick={editProfileFavMovie} style={{ float: 'right', backgroundColor: 'rgb(218, 248, 255)', padding: '2px', color: 'rgb(63, 35, 2)', border: '1px solid gainsboro' }} >Save</button>
                    </div>)
              }
              
            </div>
            <div className='proDetailDivs'>
              <label>Bio: </label>
              {
                showBioEdit === false ?
                (
                  userWatchList.length > 0  ? 
                  (
                    <div>
                      <span>{userWatchList[0].bio}</span>
                      <button onClick={profileBioGoEdit} style={{ float: 'right', backgroundColor: 'rgb(218, 248, 255)', padding: '2px', color: 'rgb(63, 35, 2)', border: '1px solid gainsboro' }}>Edit</button>
                    </div>
                  ) : <span>Loading</span>
                ) : (<div>
                      <input type='text' placeholder='Describe yourself' onChange={(e)=>setBioValue(e.target.value)}/>
                      <button className='profileBioGoEditButton' onClick={editProfileBio} style={{ float: 'right', backgroundColor: 'rgb(218, 248, 255)', padding: '2px', color: 'rgb(63, 35, 2)', border: '1px solid gainsboro' }} >Save</button>
                    </div>)
              }
            </div>
            <div>
              <label>Quiz Level: </label>
              {
                userWatchList.length > 0  ? 
                (
                  <span>{userWatchList[0].quiz[userWatchList[0].quiz.length-1].level}</span>
                ) : <span>Loading</span>
              }
            </div>
          </div>
          <div className="activities">
            <div className="watchList">
              <h3 className="watchListHeader">Your Movie Watch List</h3>
              <div className="watchBox">

                {userWatchList.length > 0 && movies &&
                  userWatchList[0].watchList.map((film) => {
                    return (
                        <Link to={`/${film.productionType}/${film.id}`}
                        className="watchtag">
                          {film.title}
                        </Link>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Theuser;

/* import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { AuthContext } from '../../context/authcontext/AuthContext';
import CardActions from '@mui/material/CardActions';
//import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
//import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';

export default function Theuser({
  cinemunyUser,
  changeImg,
  setChangeImg,
  user,
  userQuiz,
  handleFileChange,
}) {
  //const [quizCount, setQuizCount] = useState(null);
  const [userCountry, setUserCountry] = useState(null);
  const [userBio, setUserBio] = useState(null);
  const [userFmovie, setUserFmovie] = useState(null);
  const [userGender, setUserGender] = useState(null);
  const [lastScore, setLastScore] = useState(null);
  const [lastLevel, setLastLevel] = useState(null);
  const [award, setAward] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  //setCinemunyUser(candidate);
  useEffect(() => {
    if (cinemunyUser) {
      //setQuizCount(quizCount.length - 1);
      setUserCountry(cinemunyUser[0].location.label);
      setUserBio(cinemunyUser[0].bio);
      setUserFmovie(cinemunyUser[0].favMovie);
      setUserGender(cinemunyUser[0].gender);
      setLastScore(
        cinemunyUser[0].quiz[cinemunyUser[0].quiz.length - 1].percent
      );
      setLastLevel(cinemunyUser[0].quiz[cinemunyUser[0].quiz.length - 1].level);
      console.log(cinemunyUser);
    }
  }, [cinemunyUser]);

  //Finding users Level
  useEffect(() => {
    console.log(cinemunyUser);
    setAward(null);
    if (lastLevel && lastScore) {
      if (lastLevel === 'average') {
        if (lastScore < 50) {
          setAward('average');
        }

        if (lastScore > 51) {
          setAward('Beyond Average');
        }
      }

      if (lastLevel === 'guru') {
        if (lastScore < 50) {
          setAward('Half-baked Guru');
        }

        if (lastScore > 51) {
          setAward('Guru');
        }
      }
    }
  }, [cinemunyUser, lastLevel, lastScore]);

  return (
    <section className="profile-section">
      {location.pathname.includes('profile') && cinemunyUser && (
        <Container sx={{ backgroundColor: 'white' }}>
          <div className="user-profile">
            <div className="profile-header">
              <div className="profile-img-div">
                {user && user.photoURL ? (
                  <img
                    sx={{ height: 140 }}
                    src={user.photoURL}
                    className="profile-img"
                    alt={user.displayName}
                  />
                ) : (
                  <AccountBoxIcon color="secondary" fontSize="large" />
                )}
              </div>

              {cinemunyUser && user && (
                <div className="profile-header-details">
                  <h4>{user.displayName}</h4>
                  {userCountry && <p>{userCountry || 'N/A'}</p>}
                </div>
              )}
              {!changeImg && (
                <Button size="small" onClick={() => setChangeImg(true)}>
                  Edit image
                </Button>
              )}

              {changeImg && (
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              )}
            </div>
            {cinemunyUser && (
              <div>
                <div>Bio</div>
                {userBio ? (
                  <Typography variant="body2" color="text.secondary">
                    {cinemunyUser[0].bio}
                  </Typography>
                ) : (
                  <textarea type="text" placeholder="edit to update your Bio" /> //hook it up to a button later
                )}
              </div>
            )}

            {award && (
              <div className="profile-bio">
                <div
                  style={{
                    marginBottom: '0.55rem',
                  }}
                >
                  Level
                </div>
                <p
                  style={{
                    marginBottom: '0.3rem',
                    fontStyle: 'italic',
                  }}
                >
                  {award}
                </p>
              </div>
            )}
            {award && (
              <div style={{ fontSize: '0.55rem' }}>
                Your last 5 test results
              </div>
            )}

            {!award && (
              <Button onClick={() => navigate('/filmquiz')} variant="contained">
                take film quiz to find your Level
              </Button>
            )}
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              {cinemunyUser &&
                userQuiz[0].quiz.length > 1 &&
                cinemunyUser[0].quiz.map((test, index) => {
                  return <Button key={index}>{test.percent}%</Button>;
                })}
            </ButtonGroup>
            {userFmovie && (
              <div>
                <span>
                  {userFmovie}
                  <MovieFilterIcon />
                </span>
              </div>
            )}

            {cinemunyUser && (
              <div className="profile-bio">
                <div
                  style={{
                    marginBottom: '0.55rem',
                  }}
                >
                  Gender
                </div>
                <p
                  style={{
                    marginBottom: '0.3rem',
                  }}
                >
                  {userGender || 'N/A'}
                </p>
              </div>
            )}

            <CardActions>
              <Button onClick={() => navigate('/settings')} size="small">
                Edit
              </Button>
            </CardActions>
          </div>
        </Container>
      )}
    </section>
  );
}
 */
