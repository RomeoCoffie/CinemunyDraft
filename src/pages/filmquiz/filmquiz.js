import React, { useEffect, useState } from 'react';
import { QuizContext } from '../../context/quizcontext/Quizcontext';
import { useContext } from 'react';
import Timer from './Timer';

import SetupForm from './SetupForm';
import Questions from './Questions';
import Loading from './Loading';
import Modal from '../../components/modal/Modal';
import Question from './Question';
import './filmquiz.css';
export default function Filmquiz() {
  const [theQuestion, seTheQuestion] = useState(true);
  // const [Loading, setLoading] = useState(false);
  const [newQuestions, setNewQuestions] = useState([]);
  const [disabledButton, setDisabledButton] = useState(null);
  const [stopTime, setStopTime] = useState(false);
  //const [currentQuestionsTotal, setCurrentQuestionsTotal] = useState(0);

  // const [error, setError] = useState(0);

  const {
    waiting,
    loading,
    questions,

    checkAnswer,
    collectAnswer,
    userAnswers,
    userAnswer,
    setUserAnswer,
    setUserAnswers,
    score,
    percentage,
    setPercentage,
    selected,
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
  } = useContext(QuizContext);

  useEffect(() => {
    if (myQuestions) {
      //setCurrentQuestionsTotal(myQuestions.length);

      switch (difficultyLevel) {
        case 'beginner':
          setRemainingTime(null);
          setShowTimer(false);
          return setNewQuestions(myQuestions.slice(1, 3));

        case 'average':
          let time = 20;
          setRemainingTime(time);
          setShowTimer(true);
          return setNewQuestions(myQuestions.slice(1, 6));

        case 'expert':
          let time2 = 80;
          setRemainingTime(time2);
          setShowTimer(true);
          return setNewQuestions(myQuestions.slice(1, 11));

        case 'guru':
          let time3 = 90;
          setRemainingTime(time3);
          setShowTimer(true);
          return setNewQuestions(myQuestions.slice(1, 16));

        default:
          setRemainingTime(null);
          setShowTimer(false);
          return setNewQuestions(myQuestions.slice(1, 3));
      }
    }
  }, [myQuestions, difficultyLevel]);

  //calculatepercentage

  const per = (a, b) => {
    return (a / b) * 100;
  };

  //Check Results
  const checkResults = () => {
    openModal();
  };

  //handlesubmission of results
  const handleSubmit = (e) => {
    e.preventDefault();
    let correct = 0;
    let wrong = 0;
    if (newQuestions) {
      userAnswers.map((userAnswer, i) => {
        if (userAnswer === newQuestions[i].correctAnswer) {
          correct++;
        } else {
          console.log('wrong');
        }
      });

      let results = ((correct / newQuestions.length) * 100).toFixed(0);
      console.log(results, correct, newQuestions.length, difficultyLevel);
      setUserScore(results);
      setPercentage(results);
    }
    // setPercentage(per(userScore, newQuestions))

    openModal();
    console.log(
      percentage,
      userScore,
      userAnswers,
      difficultyLevel,
      remainingTime
    );
    setShowTimer(false);
    setStopTime(true);
    setDisabledButton(false);

    setDifficultyLevel('beginner');
    setRemainingTime(null);
  };

  /*  useEffect(() => {
    if (userScore & difficultyLevel) {
      switch (difficultyLevel) {
        case 'beginner':
          let results = ((userScore / 2) * 100).toFixed(0);
          setPercentage(results);
          return results, percentage;

        case 'average':
          let averageResults = ((userScore / 5) * 100).toFixed(0);
          setPercentage(averageResults);
          return averageResults, percentage;

        case 'expert':
          let expertResults = ((userScore / 10) * 100).toFixed(0);
          setPercentage(expertResults);
          return expertResults, percentage;
      }
    }
  }, [userScore]); */

  if (waiting) {
    return (
      <div className="setup">
        <SetupForm />;
      </div>
    );
  }
  if (loading) {
    return (
      <div className="loading">
        <Loading />;
      </div>
    );
  }
  return (
    <main className="quiztime">
      <div className="heading">
        <h2 className="quizhead">Film Quiz</h2>
        <div className="prizes">
          <button className="pbtn">Checkout Prizes</button>
        </div>
      </div>

      <section className="quiz">
        {showTimer && <Timer stopTime={stopTime} />}
        <article className="container">
          <div className="difficult">
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
              {/* <option value="">.............</option> */}
              <option value="beginner">beginner</option>
              <option value="average">average</option>
              <option value="expert">expert</option>
              <option value="guru">guru</option>
            </select>
          </div>
          <form className="questions-form" onSubmit={handleSubmit}>
            {newQuestions.map((quest, indie) => {
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

            <button className="submit-btn">submt</button>
          </form>
          {isModalOpen && (
            <Modal
              setDisabledButton={setDisabledButton}
              setStopTime={setStopTime}
            />
          )}
        </article>
      </section>
    </main>
  );
}
