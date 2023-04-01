import React, { useContext, useEffect } from 'react';
import { useState, useRef } from 'react';
import { useCollection } from '../../Hooks/useCollection';
import { useFiresotre } from '../../Hooks/useFirestore';
//import { myquestions } from '../../data/datalinks';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { storage } from '../../components/firebase/config';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { AiOutlinePlus } from 'react-icons/ai';

import Container from '@mui/material/Container';

//import { useAddImage } from '../../Hooks/useAddImage'; didnt work

import './addquestions.css';

export default function Addquestion() {
  const [question, setQuestion] = useState();
  const [questionImgUrl, setQuestionImgUrl] = useState(null);
  const [option, setOption] = useState([]);
  const [newOption, setNewOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [progress, setProgress] = useState(null);
  const [addImage, setAddImage] = useState(false);
  const optionsInput = useRef(null);
  const { documents: thesequestions } = useCollection('questions');

  // const { postData } = useFetch('http://localhost:3000/data', 'POST');
  const { addDocument, response } = useFiresotre('questions');
  const { authIsReady, user } = useContext(AuthContext);
  // const { progress, imgUrl, error } = useAddImage(thumbnail);
  //const { person, setPerson } = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let person = user.uid;
    setInputError(null);
    console.log(questionImgUrl);

    if (!option.includes(correctAnswer)) {
      setInputError('Answers must contain correct Answer');
      return;
    }
    if (option.length !== 3) {
      setInputError('Answers must be 3 choices');
      return;
    }
    if (questionImgUrl) {
      addDocument({ person, question, option, correctAnswer, questionImgUrl });
    } else {
      addDocument({ person, question, option, correctAnswer });
    }

    /* let ref = collection(db, 'questions');
    const createdAt = Timestamp.fromDate(new Date());
    myquestions.forEach((question) => {
      addDoc(ref, { ...question, createdAt });
      //addDocument(question);
    }); */

    //console.log(question, option, correctAnswer);
    resetFields();
  };

  //handle options input
  const addOptions = (e) => {
    e.preventDefault();
    const ops = newOption.trim();

    if (ops && !option.includes(ops)) {
      setOption((prevOption) => [...prevOption, ops]);
    }
    setNewOption('');
    optionsInput.current.focus();
  };

  //handle image upload if question has an image
  const handleFileChange = (e) => {
    e.preventDefault();
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (selected) {
      if (!selected.type.includes('image')) {
        setThumbnailError('Selected file size must be an image');
        return;
      }

      if (selected.size > 500000) {
        setThumbnailError('Selected file size must be less than 500kb');
        return;
      }
      const storageRef = ref(storage, `/questionsImages/${selected.name}`);
      const storageUpload = uploadBytesResumable(storageRef, selected);

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
            setQuestionImgUrl(url);
            console.log(url, questionImgUrl);
          });
        }
      );
    }
    console.log(thumbnail);
    return;
  };
  //reseting fields after submission
  const resetFields = () => {
    setQuestion('');
    setCorrectAnswer('');
    setOption('');
  };

  // console.log(questionImgUrl);
  console.log(thumbnail, response.document);

  return (
    <Container>
      <div className="addquestion-section">
        <div className="title">
          <h3>Add Question</h3>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>
          <span>Question:</span>
          <textarea
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            required
          />

          <br />

          <span>Add Image:</span>
          <span>
            <button onClick={(e) => setAddImage(true)}>
              <AiOutlinePlus />
            </button>
          </span>
          {addImage && (
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          )}

          {thumbnailError && <p style={{ color: 'red' }}>{thumbnailError}</p>}

          <span>Answers:</span>
          {inputError && <span style={{ color: 'red' }}>{inputError}</span>}

          <input
            type="text"
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="enter 3 choices"
            value={newOption}
            ref={optionsInput}
          />
          <button onClick={addOptions}>
            <AiOutlinePlus />
          </button>

          <br />

          <span>Correct Answer:</span>
          <input
            type="text"
            onChange={(e) => setCorrectAnswer(e.target.value)}
            value={correctAnswer}
            required
          />

          <br />

          <button className="btn">submit</button>
        </form>
      </div>
    </Container>
  );
}
