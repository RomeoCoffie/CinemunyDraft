import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { useCollection } from '../../Hooks/useCollection';
import './admin.css';

export default function Adminpage() {
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const { documents: users } = useCollection('users');
  const { user } = useContext(AuthContext);

  //Gettings users
  useEffect(() => {
    if (users) {
      setCurrentUser(users.filter((person) => person.id === user.uid));
    }
  }, [users]);

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
      <Container sx={{ marginTop: 23 }}>
        {currentUser && currentUser[0].superadmin === 'super' && (
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
        <div className="admin-btn">
          <Link to="/users">users</Link>
        </div>

        <div>
          <div className="admin-btn">
          <Link to="/films">See Film List</Link>
          </div>
          <div className="admin-btn">
            <Link to="/shows">See Show List</Link>
          </div>
          <div className="admin-btn">
            <Link to="/groups">See Group List</Link>
          </div>
          <div className="admin-btn">
            <Link to="/posts">See Post List</Link>
          </div>
          <div className="admin-btn">
            <Link to="/questions">See Question List</Link>
          </div>
        </div>
        

      </Container>
    </main>
  );
}
