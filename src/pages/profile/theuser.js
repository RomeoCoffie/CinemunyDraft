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
