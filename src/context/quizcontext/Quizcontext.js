import React, { useState, useEffect, createContext } from 'react';
import useFetch from '../../Hooks/useFetch';
import { useCollection } from '../../Hooks/useCollection';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../components/firebase/config';

const QuizContext = createContext();

//Provider, Consumer -TkimoviesContext.Provider

const QuizContextProvider = ({ children }) => {
  //   const { data, error, ispending } = useFetch(
  //     'http://localhost:3000/questions'
  //   );

  const { data } = useFetch('http://localhost:3000/groups');

  const [waiting, setWaiting] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState([]);
  const [score, setScore] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [error, setError] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState(null);
  const [groups, setGroups] = useState(null);
  //Interruption when time is up
  const [interrupt, setInteruption] = useState(false);
  const url = 'http://localhost:3000/questions';
  const { documents: thesequestions } = useCollection('questions');
  const [myQuestions, setMyQuestions] = useState(null);

  //Shuffling questions
  const getShuffledArr = (arr) => {
    if (arr != null) {
      const newArr = arr.slice();
      for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
      }
      return newArr;
    }
  };

  /* const collectAnswer = (indie) => {
    let newAnswers = [...userAnswers];
    newAnswers[indie] = answer;

    //setUserAnswers((oldstate) => [...answer, oldstate]);
    setUserAnswers(newAnswers);
    console.log(userAnswers);
  }; */

  const checkAnswer = (value) => {
    if (value) {
      setScore((oldstate) => oldstate + 1);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  //Getting documents from firebase collection
  useEffect(() => {
    setLoading(true);
    setWaiting(false);
    const ref = collection(db, 'questions');

    try {
      getDocs(ref).then((snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setMyQuestions(getShuffledArr(results));
        setLoading(false);
        setWaiting(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setWaiting(true);
    }
  }, [thesequestions, difficultyLevel]);

  //console.log(myQuestions);

  /* 
  Use this to fetch the questions before migrating to firebase
  useEffect(() => {
    setLoading(true);
    setWaiting(false);
    async function getquestions() {
      try {
        const response = await fetch(`${url}`);
        const json = await response.json();
        setQuestions(getShuffledArr(json));

        setLoading(false);
        setWaiting(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
        setWaiting(true);
      }
    }

    getquestions();
  }, [url, difficultyLevel]); */

  return (
    <QuizContext.Provider
      value={{
        waiting,
        Loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        checkAnswer,
        // nextQuestion,
        getShuffledArr,
        //newQuestions,
        //collectAnswer,
        userAnswers,
        userAnswer,
        setUserAnswer,
        setUserAnswers,
        score,
        selected,
        setIndex,
        setUserScore,
        userScore,
        closeModal,
        setIsModalOpen,
        openModal,
        setSelected,
        difficultyLevel,
        setDifficultyLevel,
        remainingTime,
        setRemainingTime,
        setInteruption,
        interrupt,
        groups,
        setGroups,
        data,
        myQuestions,
        setMyQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContextProvider, QuizContext };
