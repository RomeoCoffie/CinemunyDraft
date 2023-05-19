import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCollection } from '../../Hooks/useCollection';

export default function Prosuperadmin({ children, user }) {
  const [activeUrl, setActiveUrl] = useState(null);
  //const [theUsers, setTheUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { documents: users } = useCollection('users');

  //gets the active url to display movie or tv show sidebar
  useEffect(() => {
    setActiveUrl(window.location.href);
    //console.log(activeUrl);

    //picking out the current user
    if (users) {
      const thisUser = users.filter((person) => person.id === user.uid);
      setCurrentUser(thisUser);
    }
  }, [users]);

  if (currentUser) {
    console.log(currentUser.superadmin, users);
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user && user.superadmin === 'no') {
    return <Navigate to="/" />;
  }
  return children;
}
