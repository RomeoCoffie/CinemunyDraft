import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCollection } from '../../Hooks/useCollection';

//MUI Stuff
import { Container, Grid } from '@mui/material';

//import styles
import './user.css';
export default function SingleUser() {
  const { id } = useParams(); //get the userId being linked
  const [theUser, setTheUser] = useState(null); //stores the user
  const { documents: users } = useCollection('users'); //get users snapshot from firebase
  const url =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

  //useeffect to filter out the user
  useEffect(() => {
    if (id && users) {
      const user = users.filter((person) => person.id === id);
      setTheUser(user);
    }
  }, [id, users]);

  if (id) {
    console.log(id);
  }

  return (
    <div style={{ marginTop: 20 }}>
      {theUser && <h5>Profile of {theUser[0].displayName || 'User'}</h5>}

      {theUser &&
        theUser.map((user, index) => {
          const { displayName, location, bio, photoURL } = user;
          return (
            <Container
              key={index}
              sx={{ backgroundColor: 'white', width: '90%' }}
            >
              <Grid container style={{ marginTop: 15 }}>
                <Grid item xs={12} md={12}>
                  {!photoURL && (
                    <img src={url} alt={displayName} className="user-image" />
                  )}
                  {photoURL && (
                    <img
                      src={photoURL}
                      alt={displayName}
                      className="user-image"
                    />
                  )}

                  <span>Level:</span>
                  <span>Beginner</span>
                  <span>Country:</span>
                  <span>{location.value}</span>
                </Grid>
                <Grid item xs={7} md={7}>
                  <div className="pro-details">
                    <p>{bio}</p>
                  </div>
                </Grid>
              </Grid>
            </Container>
          );
        })}
    </div>
  );
}
