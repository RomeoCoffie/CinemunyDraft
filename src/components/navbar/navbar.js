import React, { useContext, useState } from 'react';

import { CgProfile } from 'react-icons/cg';

import { links, profile } from '../../data/datalinks';
import useLogout from '../../Hooks/useLogout';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';

import './navbar.css';

export default function Navbar() {
  // const [showLinks, setShowLinks] = useState(false);
  const { logout } = useLogout();
  const { user } = useContext(AuthContext);

  if (user) {
    user.getIdTokenResult().then((IdTokenResult) => {
      user.admin = IdTokenResult.claims.admin;
      console.log(IdTokenResult.claims);
    });

    /*  auth.currentUser.getIdTokenResult().then((tokenResult) => {
      console.log(tokenResult.claims);
    }); */
  }
  //console.log(user.admin);

  return (
    <nav className="navdiv">
      <div className="logo-container">
        <div className="logo">
          <div className="talking">
            <h4> Cine </h4>
          </div>
          <div className="moviediv">
            <h3 className="movi-heading">Muny</h3>
          </div>
        </div>
      </div>
      <div className="links-container">
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
      </div>
      <div>{user && user.admin && <Link to="/admin">Admin</Link>}</div>

      {user && (
        <>
          <li>
            <button onClick={logout}>
              <CgProfile />
              {user.displayName}
            </button>
          </li>
        </>
      )}

      {!user && (
        <div className="log-container">
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
    </nav>
  );
}
