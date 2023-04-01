import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import GroupsIcon from '@mui/icons-material/Groups';
import CasinoIcon from '@mui/icons-material/Casino';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { pink } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

//import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { links, profile } from '../../data/datalinks';
import useLogout from '../../Hooks/useLogout';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';

import './navbar.css';
import { Typography } from '@mui/material';

/* //props for pink home icon
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
} */

export default function Navbar() {
  // const [showLinks, setShowLinks] = useState(false);
  const { logout } = useLogout();
  const [path, setPath] = useState(null);
  const { user } = useContext(AuthContext);
  const [value, setValue] = React.useState(null);
  const navigate = useNavigate();

  const location = useLocation();

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
          {links.map((link) => {
            const { id, url, text } = link;
            return (
              <li key={id}>
                <a href={url}> {text}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
