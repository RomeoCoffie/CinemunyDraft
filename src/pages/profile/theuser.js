import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from '../../Hooks/useCollection';
import { AuthContext } from '../../context/authcontext/AuthContext';
import Userform from './userform';

import './profile.scss';

function Theuser({ handleFileChange }) {
  const [userWatchList, setUserWatchList] = useState([]);
  const { documents: users } = useCollection('users');
  const { user } = useContext(AuthContext);

  //Gettings users
  useEffect(() => {
    if (users) {
      setUserWatchList(users.filter((person) => person.id === user.uid));
    }
  }, [users]);

  console.log(user, 'user from theuser page');
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
          <input
            type="file"
            onChange={(e) => handleFileChange(e)}
            accept="image/*"
          />
        </div>
        <div className="userProfile">
          <div className="bio">
            <div>
              <label>Name: </label>
              <span>{user.displayName}</span>
            </div>
            <div>
              <label>Email: </label>
              <span>{user.email}</span>
            </div>
            <div>
              <label>Phone Number: </label>
              <span>{user.phoneNumber}</span>
            </div>
            <div>
              <label>Bio: </label>
              <span>{user.metadata.creationTime}</span>
            </div>
            <div>
              <label>favMovie: </label>
              <span>{user.tenantId}</span>
            </div>
          </div>
          <div className="activities">
            <div className="watchList">
              <h3 className="watchListHeader">Your Watch List</h3>
              {userWatchList.length > 0 &&
                userWatchList[0].watchList.map((film) => {
                  return (
                    <div className="watchBox">
                      <Link to={`/tvshows/${film}`} className="watchtag">
                        {film}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Userform />
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
