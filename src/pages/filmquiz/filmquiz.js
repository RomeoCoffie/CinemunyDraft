import React, { useEffect, useState, useContext } from 'react';

//imports from firebase
import { arrayUnion, Timestamp, updateDoc, doc } from 'firebase/firestore';
//import components
//import { QuizContext } from '../../context/quizcontext/Quizcontext';
import { useCollection } from '../../Hooks/useCollection';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { db } from '../../components/firebase/config';
import Timer from './Timer';
import SetupForm from './SetupForm';
//import Questions from './Questions';
//import Loading from './Loading';
import Modal from '../../components/modal/Modal';
import Prizemodal from './prizeModal';
//import Winnersmodal from './winnerspage';
//Material UI Stuff
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

//import styles
import './filmquiz.css';
//import { myquestions } from '../../data/datalinks';

export default function Filmquiz() {
  const [waiting, setWaiting] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState('beginner');
  const [percentage, setPercentage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [yourQuestion, setYourQuestion] = useState(null);
  //const [theQuestions, setTheQuestions] = useState(null);
  const [myQuestions, setMyQuestions] = useState(null);
  // const [theOptions, setTheOptions] = useState(null);
  // const [queistionID, setQuestionID] = useState(null);
  //const [rightAnswer, setRightAnswer] = useState(null);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [theIndex, setTheIndex] = useState(0);
  const [ritAns, setRitAns] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [interruption, setInteruption] = useState(false); //Interruption when time is up
  //const [showWinnersModal, setShowWinnersModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [disabledButton, setDisabledButton] = useState(null);
  const { documents: users } = useCollection('users');
  const [theUsers, setTheUsers] = useState([]);
  //const [getReady, setGetReady] = useState(false);
  //const [index, setIndex] = useState(0);
  const { user } = useContext(AuthContext);

  const { documents: thesequestions } = useCollection('questions');

  //const {
  //waiting,
  //queIndex,
  // correct,
  // checkAnswer,
  //setIndex,
  //isModalOpen,
  //difficultyLevel,
  // myQuestions,
  // showTimer,
  //nextQuestion,
  // setDisabledButton,
  // setQueIndex,
  //setCorrect,
  //openModal,
  // } = useContext(QuizContext);

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

  //Getting Users
  useEffect(() => {
    if (users) {
      setTheUsers(users);
    }
  }, [users]);

  //opens Modal
  /* const openModal = () => {
    setIsModalOpen(true);
  }; */

  //saving test results
  const saveResults = () => {
    const theRef = doc(db, 'users', user.uid);
    const candidate = theUsers.filter((person) => {
      return person.id === user.uid;
    });
    console.log(theUsers, candidate[0].quiz);

    //assign level based on last three scores
    const results = {
      createdAt: Timestamp.fromDate(new Date()),
      level: difficultyLevel,
      display: user.displayName,
      score: ritAns,
      percent: percentage,
    };
    if (difficultyLevel === 'beginner') {
      return;
    }
    //always save the last 5 tests
    if (candidate[0] && candidate[0].quiz.length >= 4) {
      let temp = candidate[0].quiz.shift(); //gets oldest score

      //delete oldest score from memory
      const newResults = candidate[0].quiz.filter((resus) => {
        return resus !== temp;
      });
      console.log('I came through here');

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

  //NextQuestion function
  const nextQuestion = () => {
    setTheIndex((oldIndex) => {
      const index = oldIndex + 1;
      console.log('next question');
      if (index > myQuestions.length - 1) {
        setIsModalOpen(true);
        //timeTest();
        return 0;
      } else {
        return index;
      }
    });
  };

  //Check answer, updates score and move to next question
  const checkAnswer = (value) => {
    if (value) {
      setRitAns((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  useEffect(() => {
    if (
      (thesequestions && difficultyLevel === 'average') ||
      difficultyLevel === 'guru'
    ) {
      if (!user) {
        console.log('login to continue');
        setIsModalOpen(true);
        setShowLogin(true);
      }
    }
    if (thesequestions && difficultyLevel === 'average') {
      setMyQuestions(getShuffledArr(thesequestions).slice(1, 6));
      setTheIndex(0);
      setRemainingTime(30);
      setShowTimer(true);
      console.log(myQuestions, difficultyLevel, remainingTime);
      return;
    }
    if (thesequestions && difficultyLevel === 'guru') {
      setMyQuestions(getShuffledArr(thesequestions).slice(1, 11));
      setRemainingTime(60);
      setShowTimer(true);
      setTheIndex(0);
      console.log(myQuestions, difficultyLevel, remainingTime);
      return;
    } else {
      setShowLogin(false);
      setShowTimer(false);
      setRemainingTime(null);
      setMyQuestions(getShuffledArr(thesequestions).slice(1, 3));
      // setRemainingTime(0);
      //timeTest();

      setTheIndex(0);
      console.log(myQuestions, difficultyLevel);
    }

    //});

    /* const { id, question, option, correctAnswer } = myQuestions[theIndex];
      setTheOptions(option);
      setYourQuestion(question);
      setRightAnswer(correctAnswer);
      setQuestionID(id); */
    //setQueIndex(id);
  }, [difficultyLevel, waiting]);

  //Getting the Questions from the above useEffect
  /*  const questions = useRef(myQuestions).current;
  useEffect(() => {
    if (myQuestions) {
      const { id, question, option, correctAnswer } = myQuestions[theIndex];
      setTheOptions(option);
      setYourQuestion(question);
      setRightAnswer(correctAnswer);
      setQuestionID(id);
      //setQueIndex(id);
    }
  }, [questions]); */

  /* if (myQuestions) {
    const { id, question, option, correctAnswer } = myQuestions[queIndex];
    setTheOptions(option);
    setYourQuestion(question);
    setRightAnswer(correctAnswer);
    setQuestionID(id);
  } */

  /* if (waiting) {
    return (
      <div className="setup">
        <SetupForm
          difficultyLevel={difficultyLevel}
          setDifficultyLevel={setDifficultyLevel}
          myQuestions={myQuestions}
          setWaiting={setWaiting}
          setDisabledButton={setDisabledButton}
        />
        ;
      </div>
    );
  } */
  /* if (loading) {
    return (
      <div className="loading">
        <Loading />;
      </div>
    );
  } */

  return (
    <main className="quiztime">
      <div className="quizheading" style={{ alignItems: 'center' }}>
        <h4 className="quizhead">Is Your Film Knowledged Impressive?</h4>
      </div>
      {waiting && (
        <div className="setup" key={() => Math.random()}>
          <SetupForm
            difficultyLevel={difficultyLevel}
            setDifficultyLevel={setDifficultyLevel}
            myQuestions={myQuestions}
            setWaiting={setWaiting}
            setDisabledButton={setDisabledButton}
          />
          ;
        </div>
      )}

      {!waiting && (
        <div>
          <div>
            {showTimer && (
              <Timer
                myQuestions={myQuestions}
                remainingTime={remainingTime}
                setRemainingTime={setRemainingTime}
                interruption={interruption}
                setInteruption={setInteruption}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                theIndex={theIndex}
              />
            )}

            <p>
              Correct Answers: {ritAns}/{theIndex + 1}
            </p>
          </div>

          <section className="quiz">
            <article className="container">
              {myQuestions && (
                <div key={myQuestions[theIndex].id}>
                  <Typography key={myQuestions[theIndex].id}>
                    {myQuestions[theIndex].question}
                  </Typography>
                  {myQuestions[theIndex].option.map((choice, index) => {
                    return (
                      <Stack spacing={10} direction="column">
                        <Button
                          onClick={() =>
                            checkAnswer(
                              myQuestions[theIndex].correctAnswer === choice
                            )
                          }
                          sx={{ marginBottom: 1, marginTop: 1 }}
                          key={index}
                          variant="contained"
                        >
                          {choice}
                        </Button>
                      </Stack>
                    );
                  })}
                </div>
              )}

              {/*  {myQuestions && (
                <div key={queistionID}>
                  <h5>{myQuestions[theIndex].question}</h5>
                </div>
              )}
              {myQuestions &&
                myQuestions[theIndex].option.map((choice, choiceindex) => {
                  setIndex(choiceindex);
                  return (
                    <div className="answers-container answerbtn">
                      <button
                        className="answerbtn"
                        //checked={choiceindex}
                        onClick={() => {
                          if (choice === myQuestions[theIndex].correctAnswer) {
                            setRitAns((oldState) => oldState + 1);
                          }
                        }}
                      >
                        {choice}
                      </button>
                    </div>
                  );
                })} */}
              <button
                onClick={() => {
                  setTheIndex((oldIndex) => {
                    const index = oldIndex + 1;
                    console.log('next question');
                    if (index > myQuestions.length - 1) {
                      setIsModalOpen(true);
                      //timeTest();
                      return 0;
                    } else {
                      return index;
                    }
                  });
                }}
                className="submit-btn"
              >
                Next
              </button>
              {isModalOpen && (
                <Modal
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  setDifficultyLevel={setDifficultyLevel}
                  setDisabledButton={setDisabledButton}
                  difficultyLevel={difficultyLevel}
                  setWaiting={setWaiting}
                  showLogin={showLogin}
                  saveResults={saveResults}
                  percentage={percentage}
                  setPercentage={setPercentage}
                  myQuestions={myQuestions}
                  setShowTimer={setShowTimer}
                  setRitAns={setRitAns}
                  ritAns={ritAns}
                  // setShowWinnersModal={setShowWinnersModal}
                />
              )}

              {showPrizeModal && (
                <Prizemodal
                  showPrizeModal={showPrizeModal}
                  setShowPrizeModal={setShowPrizeModal}
                />
              )}

              {/*  {showWinnersModal && <Winnersmodal></Winnersmodal>} */}
            </article>
          </section>
        </div>
      )}
    </main>
  );
}
