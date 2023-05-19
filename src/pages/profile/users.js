import React, { useState, useEffect } from 'react';
import { useCollection } from '../../Hooks/useCollection';

import './user.css';

export default function Users() {
  const { documents: users } = useCollection('users');
  const [theUsers, setTheUsers] = useState(); //stores users from firebase

  useEffect(() => {
    if (users) {
      setTheUsers(users);
    }
  }, [users, theUsers]);
  if (theUsers) {
    console.log(theUsers);
  }

  return (
    <div>
      <h1>The Users</h1>
      {theUsers &&
        theUsers.map((user) => {
          const { bio, displayName, location } = user;
          return (
            <div className="users">
              <p>{displayName}</p>
              <p>{location.label}</p>
            </div>
          );
        })}
    </div>
  );
}
