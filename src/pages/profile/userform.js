import React, { useState, useMemo, useContext, useEffect } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useNavigate } from 'react-router-dom';

//MUI Stuff
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
//import TextField from '@mui/material/TextField';
//import { useParams } from 'react-router-dom';
//import { useFiresotre } from '../../Hooks/useFirestore';

//Firebase stuff
import { AuthContext } from '../../context/authcontext/AuthContext';
import { db } from '../../components/firebase/config';
import { updateDoc, doc } from 'firebase/firestore';
import { storage } from '../../components/firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { useCollection } from '../../Hooks/useCollection';

//styles
import './user.css';

export default function Userform() {
  // const { id } = useParams();
  const [bio, setBio] = useState(null);
  const [favMovie, setFavMovie] = useState(null);
  const [location, setLocation] = useState(null);
  const [gender, setGender] = useState('Male');
  const [profileThumbnail, setProfileThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [progress, setProgress] = useState(null);
  const [inputError, setInputError] = useState(null);
  const { documents: users } = useCollection('users'); //get users snapshot from firebase
  //const { addDocument, response } = useFiresotre('users');
  const [theUser, setTheUser] = useState(null); //stores the user
  const { user } = useContext(AuthContext);
  const url =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

  const navigate = useNavigate();
  //select country
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setLocation(value);
  };
  //useeffect to filter out the user
  useEffect(() => {
    if (users) {
      const currentUser = users.filter((person) => person.id === user.uid);
      setTheUser(currentUser);
    }
  }, [users]);

  //use to update userprofile in firebase
  const auth = getAuth();

  //update user profile-image
  const handleFileChange = async (e) => {
    e.preventDefault();
    console.log('select file');
    setProfileThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (selected) {
      if (!selected.type.includes('image')) {
        setThumbnailError('Selected file size must be an image');

        return;
      }

      if (selected.size > 9000000) {
        setThumbnailError('Selected file size must be less than 500kb');
        console.log('huge file');
        return;
      }

      const storageRef = ref(storage, `/users/${user.uid}/${selected.name}`);
      const storageUpload = uploadBytesResumable(storageRef, selected);
      storageUpload.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
          console.log('upload is' + prog + '% done');
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(storageUpload.snapshot.ref).then((url) => {
            setProfileThumbnail(url);
            updateProfile(auth.currentUser, {
              photoURL: url,
            })
              .then(() => {
                console.log('profile udpated');
              })
              .catch((error) => {
                console.log(error);
              });
            console.log(url, profileThumbnail);
          });
        }
      );

      //add to url to user
      console.log(storageRef);
    }
  };

  //Update image in users record
  useEffect(() => {
    if (profileThumbnail) {
      const editRef = doc(db, 'users', user.uid);

      try {
        updateDoc(editRef, {
          photoURL: profileThumbnail,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [profileThumbnail]);

  //update user profile
  const handleSubmit = async (e) => {
    setInputError(null);
    const theRef = doc(db, 'users', user.uid);
    e.preventDefault();
    console.log(gender);
    //const info = { bio, favMovie, location, gender };

    if (!bio || !location || gender) {
      setInputError('kindly input all fields');
      return;
    }
    //this updates user details with either new/already existing data

    try {
      await updateDoc(theRef, {
        bio,
        favMovie,
        location,
        gender,
      });
    } catch (error) {
      console.log(error);
    }

    resetFields(); //calls the reset fields function
  };

  //Resetting fields
  const resetFields = () => {
    setBio(null);
    setGender(null);
    setFavMovie(null);
    navigate('/profile');
  };

  return (
    <Container>
      <div className="edit-profile">
        {/* <p className="salute">Hi,&nbsp;{user?.name}</p> */}
        <div className="title">
          <h3>Edit Profile</h3>
        </div>

        <form className="edit-form" onSubmit={handleSubmit}>
          {/*  {user.photoURL && (
            <img
              className="profile-image"
              alt="profile image"
              src={user.photoURL}
            />
          )}
          {!user.photoURL && (
            <img className="profile-image" alt="profile image" src={url} />
          )}

          <span className="edit">profile Image:</span>
          <input type="file" onChange={handleFileChange} accept="image/*" /> */}
          <span className="edit">Bio:</span>
          <textarea
            type="text"
            placeholder="what is your story"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
          {inputError && <p style={{ color: 'red' }}>{inputError}</p>}

          <br />

          <span className="edit">favorite Movie:</span>
          <input
            type="text"
            onChange={(e) => setFavMovie(e.target.value)}
            value={favMovie}
          />

          <span>Country:</span>
          <Select options={options} value={location} onChange={changeHandler} />

          <br />
          <div className="gender">
            <RadioGroup
              value={gender}
              name="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>

          <button className="btn">submit</button>
        </form>
      </div>
    </Container>
  );
}
