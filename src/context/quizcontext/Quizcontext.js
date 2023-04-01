import React, { useState, useEffect, createContext, useContext } from 'react';
//import { useNavigate } from 'react-router-dom';
//import useFetch from '../../Hooks/useFetch';
import { useCollection } from '../../Hooks/useCollection';
import { AuthContext } from '../authcontext/AuthContext';
import { arrayUnion, Timestamp, updateDoc, doc } from 'firebase/firestore';
//import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../components/firebase/config';

const QuizContext = createContext();

//create a provider function from Quizcontext
const QuizContextProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [score, setScore] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [error, setError] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState('beginner');
  const [percentage, setPercentage] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [queIndex, setQueIndex] = useState(0);
  const [groups, setGroups] = useState(null);
  const [interruption, setInteruption] = useState(false); //Interruption when time is up
  const { documents: thesequestions } = useCollection('questions');
  const { documents: data } = useCollection('Groups'); //get groups on render
  const [myQuestions, setMyQuestions] = useState(null);
  const [ourQuestions, setOurQuestions] = useState(null);
  const [disabledButton, setDisabledButton] = useState(null);
  const [theUsers, setTheUsers] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [award, setAward] = useState(null);
  const { user } = useContext(AuthContext);
  const { documents: users } = useCollection('users');

  // const url = 'http://localhost:3000/questions';
  //const { data } = useFetch('http://localhost:3000/groups');
  // const navigate = useNavigate();

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

  //saving test results
  const saveResults = () => {
    const theRef = doc(db, 'users', user.uid);
    const candidate = theUsers.filter((person) => {
      return person.id === user.uid;
    });
    console.log(theUsers, candidate[0].quiz);

    //assign award

    const results = {
      createdAt: Timestamp.fromDate(new Date()),
      level: difficultyLevel,
      display: user.displayName,
      score: correct,
      percent: percentage,
    };
    if (difficultyLevel === 'beginner') {
      return;
    }
    //always save the last 10 tests
    if (candidate.quiz && candidate[0].quiz.length > 4) {
      let temp = candidate[0].quiz.shift();
      const newResults = candidate[0].quiz.filter((resus) => {
        return resus != temp;
      });

      let temp2 = [...newResults, results];
      updateDoc(theRef, {
        quiz: temp2,
      });
    } else {
      updateDoc(theRef, {
        quiz: arrayUnion(results),
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  //Getting documents from firebase collection
  useEffect(() => {
    // setWaiting(false);

    //const ref = collection(db, 'questions');
    if (users) {
      setTheUsers(users);
    }

    try {
      /* getDocs(ref).then((snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        }); */
      // setMyQuestions(getShuffledArr(thesequestions));
      if (difficultyLevel === 'average' || difficultyLevel === 'guru') {
        if (!user) {
          console.log('login to continue');
          openModal();
          setShowLogin(true);
        }
      }

      if (thesequestions && difficultyLevel === 'average') {
        setMyQuestions(getShuffledArr(thesequestions).slice(1, 6));
        setQueIndex(0);
        setRemainingTime(30);
        setShowTimer(true);
        //const { id, question, option, correctAnswer } = ourQuestions[queIndex];
        console.log(myQuestions, difficultyLevel, remainingTime);
        return;
      }

      if (thesequestions && difficultyLevel === 'guru') {
        setMyQuestions(getShuffledArr(thesequestions).slice(1, 11));
        setRemainingTime(60);
        setShowTimer(true);
        setQueIndex(0);
        console.log(myQuestions, difficultyLevel, remainingTime);
        return;
      }

      if (thesequestions && difficultyLevel === 'beginner') {
        setShowLogin(false);
        setShowTimer(false);
        setRemainingTime(null);
        setMyQuestions(getShuffledArr(thesequestions).slice(1, 3));
        // setRemainingTime(0);
        //timeTest();

        setQueIndex(0);
        console.log(myQuestions, difficultyLevel);
      }

      //});
    } catch (error) {
      console.log(error);
      setLoading(false);
      setWaiting(true);
    }
  }, [difficultyLevel, thesequestions, waiting]);

  useEffect(() => {
    if (myQuestions) {
      setOurQuestions(myQuestions);
    }
  }, [thesequestions, waiting, remainingTime]);

  const nextQuestion = () => {
    setQueIndex((oldIndex) => {
      const index = oldIndex + 1;
      console.log('next question');
      if (index > myQuestions.length - 1) {
        openModal();
        //timeTest();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  return (
    <QuizContext.Provider
      value={{
        waiting,
        setWaiting,
        Loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        checkAnswer,
        nextQuestion,
        ourQuestions,
        percentage,
        queIndex,
        setQueIndex,
        setPercentage,
        correct,
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
        setCorrect,
        closeModal,
        setIsModalOpen,
        openModal,
        setSelected,
        difficultyLevel,
        setDifficultyLevel,
        remainingTime,
        setRemainingTime,
        setInteruption,
        interruption,
        groups,
        setGroups,
        data,
        myQuestions,
        setMyQuestions,
        setShowTimer,
        showTimer,
        thesequestions,
        disabledButton,
        setDisabledButton,
        saveResults,
        theUsers,
        showLogin,
        setShowLogin,
        queIndex,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContextProvider, QuizContext };
