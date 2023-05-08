import React, { useContext } from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
//import useFetch from '../../Hooks/useFetch';
import { db } from '../../components/firebase/config';
import { updateDoc, doc } from 'firebase/firestore';
import { useCollection } from '../../Hooks/useCollection';
//import { useFiresotre } from '../../Hooks/useFirestore';
import { useAddDocs } from '../../Hooks/useAddDocs';
import { useUpdateDoc } from '../../Hooks/useUpdateDoc';

import { AuthContext } from '../../context/authcontext/AuthContext';
import { storage } from '../../components/firebase/config';
import { getDownloadURL, ref } from '@firebase/storage';

import './addgroup.css';
import { uploadBytesResumable } from 'firebase/storage';
import { urlPatterns } from '../../data/datalinks';

export default function Addgroup() {
  const [grpName, setGrpName] = useState(null);
  const [about, setAbout] = useState(null);
  const [category, setCategory] = useState('movies');
  const [groupImgUrl, setGroupImgUrl] = useState(null);
  const [groupLink, setGroupLink] = useState('');
  const [platform, setPlatform] = useState('whatsapp');
  const [ppleOnline, setPpleOnline] = useState(150);
  const [groupThumbnail, setGroupThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [grpLinkError, setGrpLinkError] = useState(null);
  //const [showAddImage, setShowAddImage] = useState(false);
  const [progress, setProgress] = useState(null);
  const optionsInput = useRef(null);
  //const { documents: Groups } = useCollection('Groups');
  const { addDocument, response } = useAddDocs('Groups');
  const { authIsReady, user } = useContext(AuthContext);
  const navigate = useNavigate();

  //const { person, setPerson } = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGroupLink(null);
    setGrpLinkError(null);
    let person = user.uid;

    if (platform === 'Telegram' && groupLink.match(urlPatterns.telegram)) {
      setGroupLink('Please Enter a Valid Link');
      setGrpLinkError('Please Enter a Valid Link');
      return;
    }

    if (platform === 'whatsapp' && groupLink.match(urlPatterns.telegram)) {
      setGroupLink('Please Enter a Valid Link');
      setGrpLinkError('Please Enter a Valid Link');
      return;
    }

    if (groupImgUrl) {
      await addDocument({
        grpName,
        about,
        category,
        ppleOnline,
        person,
        groupLink,
        groupImgUrl,
        platform,
      });
    }
    navigate('/groups');

    console.log(grpName, about, category, ppleOnline, person, response);
  };

  /* //handle options input
  const addOptions = (e) => {
    e.preventDefault();
    const ops = newOption.trim();
    if (ops && !option.includes(ops)) {
      setOption((prevOption) => [...prevOption, ops]);
    }
    setNewOption('');
    optionsInput.current.focus();
  }; */

  {
    /* <h3>Whatsapp sharing</h3>
  
    <a href=
"whatsapp://send?text=GFG Example for whatsapp sharing"
        data-action="share/whatsapp/share"
        target="_blank">
        Share to whatsapp
    </a> */
  }

  //handle image upload if question has an image
  const handleFileChange = (e) => {
    setGroupThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (selected) {
      if (!selected.type.includes('image')) {
        setThumbnailError('Selected file size must be an image');
        return;
      }

      if (selected.size > 900000) {
        setThumbnailError('Selected file size must be less than 500kb');
        return;
      }

      // Create the file metadata
      /* @type {any} */
      const metadata = {
        contentType: selected.type,
        customMetadata: {
          grpName: grpName,
          // description: desc,
          // year: year,
        },
      };

      const storageRef = ref(
        storage,
        `/GroupsImgs/${grpName}/${selected.name}`
      );
      const storageUpload = uploadBytesResumable(
        storageRef,
        selected,
        metadata
      );

      storageUpload.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
          console.log('upload is' + progress + '% done');
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(storageUpload.snapshot.ref).then((url) => {
            setGroupImgUrl(url);
            console.log(url, groupImgUrl);
          });
        }
      );
    }

    return;
  };

  //reseting fields after submission
  const resetFields = () => {
    setGrpName('');
    setAbout('');
    setPpleOnline('');
    navigate('/groups');
    //inputClear.current.value = '';
  };

  //console.log(groupThumbnail);

  //Getting documents from firebase collection
  /* useEffect(() => {
    /* if (thesequestions) {
      setTitle(thesequestions);
    } */
  /* const ref = collection(db, 'movies');
    getDocs(ref).then((snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setTitle(results);
    }); */
  // }, [thesequestions]); */

  return (
    <section className="addgroup-section">
      <main>
        {/* <p className="salute">Hi,&nbsp;{user?.name}</p> */}
        <h3 className="group-head">Add Group</h3>
        <form className="form-container" onSubmit={handleSubmit}>
          <span>Name:</span>
          <input
            type="text"
            onChange={(e) => setGrpName(e.target.value)}
            value={grpName}
            required
          />

          <br />
          <span>What's your group About! </span>
          <textarea
            type="text"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            required
          />

          <br />

          {thumbnailError && <p style={{ color: 'red' }}>{thumbnailError}</p>}

          <span>Category:</span>

          <select
            value={category}
            required
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="selection"
          >
            <option value="movies">Movies</option>
            <option value="relationships">Relationships</option>
            <option value="business">Business</option>
            <option value="travel">Travel</option>
            <option value="fashion">Fashion</option>
          </select>

          <br />

          <span>Number of members:</span>
          <input
            type="number"
            onChange={(e) => setPpleOnline(e.target.value)}
            value={ppleOnline}
            required
          />

          <br />
          <span>platform:</span>

          <select
            value={platform}
            required
            onChange={(e) => {
              setPlatform(e.target.value);
            }}
            className="selection"
          >
            <option value="whatsapp">Whatsapp</option>
            <option value="telegram">Telegram</option>
            {/* <option value="facebook">Facebook</option> */}
          </select>

          <br />

          <span>Link:</span>
          <input
            className={`${grpLinkError ? 'invalid-link' : 'valid-link'}`}
            type="text"
            onChange={(e) => {
              setGroupLink(e.target.value);
            }}
            value={groupLink}
            required
          />
          {grpName && about && (
            <div className="grpimg">
              <span className="addimg">Add Image:</span>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              {progress && (
                <span style={{ color: 'red' }}>
                  progress: &nbsp;{progress}%
                </span>
              )}
            </div>
          )}

          <button className="btn">submit</button>

          {/* {groupImgUrl && (
            <button onClick={resetFields} className="submit-btn ">
              submit
            </button>
          )} */}
        </form>
      </main>
    </section>
  );
}
