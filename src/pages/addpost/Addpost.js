import React, { useContext, useEffect, useState } from 'react';
//import Multiselect from 'multiselect-react-dropdown';
import { useNavigate } from 'react-router-dom';
//import useFetch from '../../Hooks/useFetch';
import { db } from '../../components/firebase/config';
import { updateDoc, doc } from 'firebase/firestore';
//import { useAddDocs } from '../../Hooks/useAddDocs';
import { useFiresotre } from '../../Hooks/useFirestore';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { storage } from '../../components/firebase/config';
import { getDownloadURL, ref } from '@firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';
import { urlPatterns, sources } from '../../data/datalinks';

//addpost Styles
import './addpost.css';

export default function Addpost() {
  const [postTilte, setPostTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postType, setPostType] = useState('images');
  const [postImgUrl, setPostImgUrl] = useState(null);
  const [postImges, setPostImges] = useState([]);
  const [source, setSource] = useState('');
  const [copyright, setCopyright] = useState('');
  const [youTubeLink, setYouTubeLink] = useState(null);
  const [groupThumbnail, setGroupThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [grpLinkError, setGrpLinkError] = useState(null);
  //const [comments, setComments] = useState([]);
  // const [theDocumment, setTheDocument] = useState(null);
  // const [progress, setProgress] = useState(null);
  // const optionsInput = useRef(null);
  //const { documents: Groups } = useCollection('Groups');
  //const { addDocument, response } = useAddDocs('Posts');
  const { addDocument, theDocument } = useFiresotre('Posts');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setYouTubeLink(null);
    setGrpLinkError(null);
    setInputError(null);
    let person = user.uid;

    if (youTubeLink) {
      if (!youTubeLink.match(urlPatterns.youtube)) {
        setInputError('invalid YouTube Link');
        return;
      }
      //setPostImgUrl(youTubeLink);
      if (!postTilte && !description) {
        setInputError('you must enter film title & description');
        return;
      }
      addDocument({
        postTilte,
        description,
        source,
        youTubeLink,
        copyright,
        person,
        postType,
      });

      navigate('/');
    }

    if (
      !postTilte.length === 0 ||
      !description.length === 0 ||
      !copyright.length === 0
    ) {
      setInputError('input error, kindly check all fields');
      console.log(inputError);
      return;
    }

    addDocument({
      postTilte,
      description,
      source,
      postImgUrl,
      copyright,
      person,
      postType,
    });

    /*  if (
      !postTilte.length === 0 ||
      !description.length === 0 ||
      !source.length === 0
    ) {
      addDocument({
        postTilte,
        description,
        source,
        postImgUrl,
        copyright,
        person,
        postType,
      });
    } else {
      setInputError('input error, kindly check all fields');
      console.log(inputError);
    } */
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
      if (selected.size > 700000) {
        setThumbnailError('Selected file size must be less than 500kb');
        return;
      }

      setPostImges((prevState) => [...prevState, selected]);
    }

    //console.log(postImges);

    return;
  };

  useEffect(() => {
    //console.log(postImges);
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
      //console.log(image);
      /* const metadata = {
        contentType: image.type,
        customMetadata: {
          name: postTilte || description.substring(0, 30),
        },
      }; */
      const storageRef = ref(
        storage,
        `/PostImgs/${postTilte || description.substring(0, 30)}/${image.name}`
      );

      async function uploadImage() {
        console.log(storageRef, image);

        const storageUpload = await uploadBytesResumable(storageRef, image);

        /* const storageRef = ref(storage, `/movies/${title}/${selected.name}`);
        const storageUpload = uploadBytesResumable(
          storageRef,
          selected,
          metadata
        ); */

        console.log(image);
        promises.push(storageUpload); //to get reponses
        const updatingRef = doc(db, 'Posts', theDocument);
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
      }
      uploadImage();
    });
  }, [postImges]);

  //resetting addcomment textfield
  useEffect(() => {
    if (theDocument) {
      console.log(theDocument);
    }
  }, [theDocument]);

  //reseting fields after submission
  const resetFields = () => {
    setPostTitle('');
    setDescription('');
    setSource('');
    setPostImges([]);
    navigate('/');

    //inputClear.current.value = '';
  };
  //console.log(postImges, postImgUrl, response);

  return (
    <section className="post-main">
      <main className="post-main">
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
          <div className="form-control">
            <label htmlFor="postType">Type</label>
            <select
              className="form-input"
              required
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
            >
              <option value="images">images</option>
              <option value="trailer">video/trailer</option>
              <option value="audio">podcast</option>
            </select>
          </div>
          {inputError && <span style={{ color: 'red' }}>{inputError}</span>}

          <span>Source:</span>
          <select
            value={copyright}
            onChange={(e) => {
              setCopyright(e.target.value);
            }}
            className="source"
          >
            {sources.map((outfit, index) => {
              return (
                <option key={index} value={outfit}>
                  {outfit}
                </option>
              );
            })}
          </select>

          <span>Link To:</span>
          <input
            value={source}
            className={`${grpLinkError ? 'invalid-link' : 'valid-link'}`}
            type="text"
            onChange={(e) => {
              setSource(e.target.value);
            }}
          />

          {postType === 'trailer' && (
            <div>
              <span>Youtube:</span>
              <input
                value={youTubeLink}
                className={`${grpLinkError ? 'invalid-link' : 'valid-link'}`}
                type="text"
                onChange={(e) => {
                  setYouTubeLink(e.target.value);
                }}
              />
            </div>
          )}

          {thumbnailError && <p style={{ color: 'red' }}>{thumbnailError}</p>}

          {theDocument && postType === 'images' && (
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

          {!theDocument && <button className="btn">continue</button>}

          {theDocument && (
            <button onClick={resetFields} className="submit-btn ">
              Done
            </button>
          )}

          {/* {youTubeLink && <button className="btn">submit</button>} */}

          {/* {postImgUrl && !youTubeLink && (
            <button  className="submit-btn ">
              submit
            </button>
          )} */}
        </form>
      </main>
    </section>
  );
}
