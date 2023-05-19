import React from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import useLogout from '../../Hooks/useLogout';
import { pink } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Headermodal({ user }) {
  const { logout } = useLogout();
  return (
    <div className="profile-items">
      <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
        <Link style={{ color: 'black' }} to="/profile">
          profile
        </Link>
        {/*  <AccountBoxIcon sx={{ color: pink[500] }} /> */}
      </div>
      <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
        <Link style={{ color: 'black' }} to="/settings">
          settings
        </Link>
        {/* <SettingsIcon fontSize="small" /> */}
      </div>

      {user.admin && (
        <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
          <Link style={{ color: 'black' }} to="/admin">
            Admin
          </Link>
        </div>
      )}

      <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
        <button
          onClick={logout}
          style={{ border: 0, backgroundColor: 'white' }}
        >
          <LogoutIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}
