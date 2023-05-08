import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authcontext/AuthContext';
import Headermodal from './headermodal';

//import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { profile } from '../../data/datalinks';
//import useLogout from '../../Hooks/useLogout';
//import { Link } from 'react-router-dom';

//import { auth } from '../firebase/config';

import './header.css';

export default function Header() {
  const { user } = useContext(AuthContext);
  //const { logout } = useLogout();
  const [showHeaderModal, setshowHeaderModal] = useState(false);
  const url =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

  //const navigate = useNavigate();

  // const location = useLocation();
  //Toggle Profile Items
  const toggleProfile = () => {
    if (showHeaderModal) {
      setshowHeaderModal(false);
    } else {
      setshowHeaderModal(true);
    }
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <h4> Cinemuny </h4>
        </div>

        {user && (
          <div className="loggin">
            {user.photoURL && (
              <div>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="comm-img"
                  onClick={toggleProfile}
                />
              </div>
            )}
            {!user.photoURL && (
              <div>
                <img
                  src={url}
                  alt={user.displayName}
                  className="comm-img"
                  onClick={toggleProfile}
                />
              </div>
            )}
            {showHeaderModal && user && (
              <>
                <Headermodal user={user} />
              </>
            )}
          </div>
        )}
        {!user && (
          <div className="logout-register">
            <ul>
              {profile.map((pro) => {
                const { id, url, text } = pro;
                return (
                  <li key={id}>
                    <a href={url}> {text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
