import React from 'react';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { AuthContext } from '../../context/authcontext/AuthContext';
import './admin.css';

export default function Adminpage() {
  const [userEmail, setUserEmail] = useState(null);
  const { user } = useContext(AuthContext);

  const makeAdmin = () => {
    const functions = getFunctions();
    const addAdminRole = httpsCallable(functions, 'addAdminRole');
    addAdminRole({ email: userEmail })
      .then((result) => {
        console.log(result.data, userEmail);
      })
      .catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`);
      });
  };

  return (
    <main className="admin-main">
      <Container>
        {user && (
          <div className="make-admin">
            <input
              type="email"
              onChange={(e) => setUserEmail(e.target.value)}
              value={userEmail}
              required
            />
            <button className="btn" onClick={makeAdmin}>
              Make Admin
            </button>
          </div>
        )}

        <div className="admin-btn">
          <Link to="/addmovie">Add Film</Link>
        </div>
        <div className="admin-btn">
          <Link to="/addshow">Add Show</Link>
        </div>

        <div className="admin-btn">
          <Link to="/addgroup">Add Group</Link>
        </div>
        <div className="admin-btn">
          <Link to="/addpost">Add Post</Link>
        </div>
        <div className="admin-btn">
          <Link to="/addquestion">Add Question</Link>
        </div>
      </Container>
    </main>
  );
}
