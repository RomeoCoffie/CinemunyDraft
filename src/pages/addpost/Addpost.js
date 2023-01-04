import React, { useContext, useEffect } from 'react';
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
import { getDownloadURL, ref, getStorage } from '@firebase/storage';

import './addpost.css';
import { uploadBytesResumable, uploadBytes } from 'firebase/storage';
import { urlPatterns } from '../../data/datalinks';
import { async } from '@firebase/util';

export default function Addpost() {
  const [postTilte, setPostTitle] = useState();
  const [description, setDescription] = useState();
  const [postImgUrl, setPostImgUrl] = useState([]);
  const [postImges, setPostImges] = useState([]);
  const [source, setSource] = useState('');
  const [copyright, setCopyright] = useState(null);
  const [youTubeLink, setYouTubeLink] = useState(null);
  const [groupThumbnail, setGroupThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [grpLinkError, setGrpLinkError] = useState(null);
  const [progress, setProgress] = useState(null);
  const optionsInput = useRef(null);
  //const { documents: Groups } = useCollection('Groups');
  const { addDocument, response } = useAddDocs('Posts');
  const { authIsReady, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setYouTubeLink(null);
    setGrpLinkError(null);
    let person = user.uid;

    if (youTubeLink) {
      if (youTubeLink.match(urlPatterns.youtube)) {
        await addDocument({
          postTilte,
          description,
          source,
          youTubeLink,
          copyright,
          person,
        });
      } else {
        setYouTubeLink('Please Enter a Valid Link');
        setGrpLinkError('Please Enter a Valid Link');
      }
    } else {
      await addDocument({
        postTilte,
        description,
        source,
        copyright,
        postImgUrl,
        person,
      });
    }
  };

  //handle image upload if question has an image
  const handleFileChange = (e) => {
    setGroupThumbnail(null);
    setThumbnailError(null);
    //let selected = e.target.files[9];
    //console.log(selected);

    for (let i = 0; i < e.target.files.length; i++) {
      const selected = e.target.files[i];
      selected['id'] = Math.random();
      if (!selected.type.includes('image')) {
        setThumbnailError('Selected file size must be an image');
        return;
      }
      if (selected.size > 500000) {
        setThumbnailError('Selected file size must be less than 500kb');
        return;
      }

      setPostImges((prevState) => [...prevState, selected]);
    }

    return;
  };

  useEffect(() => {
    if (postImges.length > 10) {
      setThumbnailError('you can only add upto 10 images ');

      setPostImges([]);
      return;
    }
    const promises = [];

    //Maps through images and upload them
    postImges.forEach((image) => {
      // Create the file metadata
      /* @type {any} */
      const metadata = {
        contentType: image.type,
        customMetadata: {
          id: response,
        },
      };
      const storageRef = ref(storage, `/PostImgs/${response}/${image.name}`);

      const uploadImage = async () => {
        const storageUpload = await uploadBytesResumable(
          storageRef,
          image,
          metadata
        );
        promises.push(storageUpload); //to get a block reponses
        const updatingRef = doc(db, 'Posts', response);
        const posturls = [];

        const imageRes = await Promise.all(promises); //updating the post with
        imageRes.forEach((img) => {
          getDownloadURL(img.ref).then((url) => {
            posturls.push(url);

            updateDoc(updatingRef, {
              postImgUrl: posturls,
            });
          });
          setPostImgUrl(posturls);
          //to update doc attached to this image
        });
      };
      uploadImage();
    });
  }, [postImges]);

  //reseting fields after submission
  const resetFields = () => {
    setPostTitle('');
    setDescription('');
    setSource('');
    setPostImges([]);
    // navigate('/groups');
    //inputClear.current.value = '';
  };
  console.log(postImges, postImgUrl);

  return (
    <section className="addgroup-section">
      <main>
        {/* <p className="salute">Hi,&nbsp;{user?.name}</p> */}
        <h3 className="group-head">Add Post</h3>
        <form className="form-container" onSubmit={handleSubmit}>
          <br />

          <textarea
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <br />
          <span>Title:</span>
          <input
            type="text"
            onChange={(e) => setPostTitle(e.target.value)}
            value={postTilte}
          />

          <br />

          <span>Copyright:</span>
          <input
            type="text"
            onChange={(e) => setCopyright(e.target.value)}
            value={copyright}
          />
          <span>Link To:</span>
          <input
            className={`${grpLinkError ? 'invalid-link' : 'valid-link'}`}
            type="text"
            onChange={(e) => {
              setSource(e.target.value);
            }}
            value={source}
          />

          <span>Youtube:</span>
          <input
            className={`${grpLinkError ? 'invalid-link' : 'valid-link'}`}
            type="text"
            onChange={(e) => {
              setYouTubeLink(e.target.value);
            }}
            value={youTubeLink}
          />

          {thumbnailError && <p style={{ color: 'red' }}>{thumbnailError}</p>}

          {response && (
            <div className="grpimg">
              <span className="addimg">Add Image:</span>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                required
              />
            </div>
          )}
          {!response && <button className="btn">Add Image</button>}

          {postImgUrl && (
            <button onClick={resetFields} className="submit-btn ">
              submit
            </button>
          )}
        </form>
      </main>
    </section>
  );
}
