import React, { useContext, useState } from 'react';

import { CgProfile } from 'react-icons/cg';

import { links, profile } from '../../data/datalinks';
import useLogout from '../../Hooks/useLogout';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';
import Box from '@mui/material/Box';
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

export default function Topnav() {
  const { logout } = useLogout();
  const { user } = useContext(AuthContext);
  const [path, setPath] = useState(null);

  if (user) {
    user.getIdTokenResult().then((IdTokenResult) => {
      user.admin = IdTokenResult.claims.admin;
      console.log(IdTokenResult.claims);
    });
  }

  return (
    <div>
      {user && (
        <>
          <Box sx={{ minWidth: 100 }} color="secondary">
            <FormControl fullWidth>
              <InputLabel id="user-profile">{user.displayName}</InputLabel>
              <Select
                labelId="user-profile"
                id="user-profile"
                value={path}
                label={user.displayName}
                setPath
                onChange={(e) => setPath(e.target.value)}
              >
                <MenuItem value={'/profile'}>
                  <Link style={{ color: 'black' }} to="/profile">
                    profile
                  </Link>
                  <AccountBoxIcon sx={{ color: pink[500] }} />
                </MenuItem>

                <MenuItem value={'/settings'}>
                  <Link style={{ color: 'black' }} to="/settings">
                    settings
                  </Link>
                  <SettingsIcon fontSize="small" />
                </MenuItem>

                {user.admin && (
                  <MenuItem value={'/admin'}>
                    <Link style={{ color: 'black' }} to="/admin">
                      Admin
                    </Link>
                  </MenuItem>
                )}
                <MenuItem value={'logout'}>
                  <button onClick={logout}>
                    logout
                    <LogoutIcon fontSize="small" />
                  </button>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </>
      )}

      {!user && (
        <div className="log-container">
          <ul>
            <li>
              <Link style={{ color: 'white' }} to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link style={{ color: 'white' }} to="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
