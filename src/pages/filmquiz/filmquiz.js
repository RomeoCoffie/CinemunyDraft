import React, { useEffect, useState } from 'react';
import { QuizContext } from '../../context/quizcontext/Quizcontext';
//import { getFunctions, httpsCallable } from 'firebase/functions';
import { useContext } from 'react';
import Timer from './Timer';

import SetupForm from './SetupForm';
//import Questions from './Questions';
import Loading from './Loading';
import Modal from '../../components/modal/Modal';

import './filmquiz.css';
import Prizemodal from './prizeModal';
export default function Filmquiz() {
  const [theQuestion, seTheQuestion] = useState(true);
  // const [Loading, setLoading] = useState(false);
  const [newQuestions, setNewQuestions] = useState([]);
  const [yourQuestion, setYourQuestion] = useState([]);
  const [theOptions, setTheOptions] = useState([]);
  const [yourAnswer, setYourAnswer] = useState({});
  const [rightAnswer, setRightAnswer] = useState(null);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  //const [correct, setCorrect] = useState(0);

  // const [disabledButton, setDisabledButton] = useState(null);
  const [stopTime, setStopTime] = useState(false);
  //const [currentQuestionsTotal, setCurrentQuestionsTotal] = useState(0);

  // const [error, setError] = useState(0);

  const {
    waiting,
    loading,
    questions,
    queIndex,
    setQueIndex,
    ourQuestions,
    correct,
    checkAnswer,
    setIndex,
    userScore,
    setUserScore,
    closeModal,
    isModalOpen,
    setIsModalOpen,
    openModal,
    setSelected,
    difficultyLevel,
    setDifficultyLevel,
    remainingTime,
    setRemainingTime,
    setInteruption,
    interuption,
    myQuestions,
    setMyQuestions,
    showTimer,
    setShowTimer,
    nextQuestion,
    disabledButton,
    setDisabledButton,
  } = useContext(QuizContext);

  useEffect(() => {
    if (myQuestions) {
      //setCurrentQuestionsTotal(myQuestions.length);
      // setNewQuestions(myQuestions);

      //setYourQuestion(myQuestions[queIndex]);
      const { id, question, option, correctAnswer } = myQuestions[queIndex];
      setTheOptions(option);
      setYourQuestion(question);
      setRightAnswer(correctAnswer);
      //setQueIndex(id);
    }
  }, [myQuestions, difficultyLevel, queIndex]);

  //calculatepercentage
  /* const per = (a, b) => {
    return (a / b) * 100;
  }; */

  if (waiting) {
    return (
      <div className="setup">
        <SetupForm />;
      </div>
    );
  }
  /* if (loading) {
    return (
      <div className="loading">
        <Loading />;
      </div>
    );
  } */

  return (
    <main className="quiztime">
      <div>
        <h2 className="quizhead">Film Quiz</h2>
      </div>

      {/*       <div className="setupform">
        <div className="prizes">
          <button onClick={() => setShowPrizeModal(true)} className="pbtn">
            Checkout Prizes
          </button>
        </div>

        <div>
          <p className="words">Select Difficulty Level:</p>
        </div>
        <div>
          <select
            disabled={disabledButton}
            onChange={(e) => {
              setDifficultyLevel(e.target.value);
              setDisabledButton(true);
            }}
            className="selection"
          >
            
            <option value="beginner">beginner</option>
            <option value="average">average</option>
            <option value="guru">guru</option>
          </select>
        </div>
      </div> */}
      {!waiting && (
        <div>
          <div>
            {showTimer && <Timer />}
            <p>
              Correct Answers: {correct}/{queIndex}
            </p>
          </div>

          <section className="quiz">
            <article className="container">
              {myQuestions && <h3 key={queIndex}>{yourQuestion}</h3>}

              {yourQuestion &&
                theOptions.map((choice, choiceindex) => {
                  setIndex(choiceindex);
                  return (
                    <div
                      className="answers-container answerbtn"
                      key={choiceindex}
                    >
                      <button
                        key={choiceindex}
                        className="answerbtn"
                        //checked={choiceindex}
                        onClick={() => checkAnswer(rightAnswer === choice)}
                      >
                        {choice}
                      </button>
                    </div>
                  );
                })}

              <button onClick={nextQuestion} className="submit-btn">
                Next
              </button>

              {/* <form className="questions-form" onSubmit={handleSubmit}> */}
              {/* {newQuestions.map((quest, indie) => {
            const { id, question, option, correctAnswer } = quest;

            return (
              <Question
                {...quest}
                indie={indie}
                selected={selected}
                setIndex={setIndex}
                checkAnswer={checkAnswer}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
                setSelected={setSelected}
              />
            );
          })}
          <button onClick={nextQuestion} className="submit-btn">
            Next
          </button>
 */}

              {/* </form> */}
              {isModalOpen && (
                <Modal
                  setDisabledButton={setDisabledButton}
                  setStopTime={setStopTime}
                />
              )}

              {showPrizeModal && (
                <Prizemodal
                  showPrizeModal={showPrizeModal}
                  setShowPrizeModal={setShowPrizeModal}
                />
              )}
            </article>
          </section>
        </div>
      )}
    </main>
  );
}
