import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import GroupsIcon from '@mui/icons-material/Groups';
import CasinoIcon from '@mui/icons-material/Casino';

import HomeIcon from '@mui/icons-material/Home';
//import SvgIcon from '@mui/material/SvgIcon';

import { AuthContext } from '../../context/authcontext/AuthContext';

import './navbar.css';

export default function Navbar() {
  // const [showLinks, setShowLinks] = useState(false);
  //const { logout } = useLogout();

  const { user } = useContext(AuthContext);

  /* const navigate = useNavigate();

  const location = useLocation(); */

  if (user) {
    user.getIdTokenResult().then((IdTokenResult) => {
      user.admin = IdTokenResult.claims.admin;
      // console.log(IdTokenResult.claims);
    });

    /*  auth.currentUser.getIdTokenResult().then((tokenResult) => {
      console.log(tokenResult.claims);
    }); */
  }
  //console.log(user.admin);

  return (
    <div className="links-container">
      <nav>
        <ul className="navlinks">
          <li>
            <div className="inside-links">
              <HomeIcon sx={{ color: 'white', fontSize: 16 }} />
              <Link to="/">Home</Link>
            </div>
          </li>

          <li>
            <div className="inside-links">
              <MovieIcon sx={{ color: 'white', fontSize: 16, marginLeft: 1 }} />
              <Link to="/movies">movies</Link>
            </div>
          </li>

          <li>
            <div className="inside-links">
              <LiveTvIcon
                sx={{ color: 'white', fontSize: 16, marginLeft: 1 }}
              />
              <Link to="/tvshows">series</Link>
            </div>
          </li>

          <li>
            <div className="inside-links">
              <GroupsIcon
                sx={{ color: 'white', fontSize: 16, marginLeft: 1 }}
              />
              <Link to="/groups">groups</Link>
            </div>
          </li>

          <li>
            <div className="inside-links">
              <CasinoIcon
                sx={{ color: 'white', fontSize: 16, marginLeft: 1 }}
              />
              <Link to="/filmquiz">Quiz</Link>
            </div>
          </li>

          {/*  {links.map((link) => {
            const { id, url, text } = link;
            return (
              <li key={id}>
                <a href={url}> {text}</a>
              </li>
            );
          })} */}
        </ul>
      </nav>
    </div>
  );
}
