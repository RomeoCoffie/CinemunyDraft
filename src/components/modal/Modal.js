import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { QuizContext } from '../../context/quizcontext/Quizcontext';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { AuthContext } from '../../context/authcontext/AuthContext';
//import { useNavigate } from 'react-router-dom';

import './modal.css';

const Modal = () => {
  //const [timeScore, settimedScore]=useState(null)
  const {
    isModalOpen,
    setIsModalOpen,
    correct,
    setPercentage,
    userScore,
    interrupt,
    queIndex,
    difficultyLevel,
    myQuestions,
    setMyQuestions,
    setDifficultyLevel,
    thesequestions,
    getShuffledArr,
    setCorrect,
    percentage,
    disabledButton,
    setDisabledButton,
    setShowTimer,
    setWaiting,
    waiting,
    saveResults,
    theUsers,
    showLogin,
    setShowLogin,
    setRemainingTime,
  } = useContext(QuizContext);

  //const { users } = useContext(TkimoviesContext);
  const { user } = useContext(AuthContext);

  //const navigate = useNavigate();

  //const [remarks, setRemarks] = useState(null);

  if (isModalOpen) {
    // console.log('entest');
    setShowTimer(false);

    let results = ((correct / myQuestions.length) * 100).toFixed(0);
    setPercentage(results);
    console.log(
      results,
      correct,
      myQuestions.length,
      difficultyLevel,
      percentage
    );
  }

  useEffect(() => {
    if (theUsers) {
      console.log(theUsers);
    }
  }, [user]);

  const move = () => {
    setIsModalOpen(false);
    setDisabledButton(null);
    if (user) {
      saveResults();
    }

    setMyQuestions(getShuffledArr(thesequestions).slice(1, 3));
    setRemainingTime(null);

    setDifficultyLevel('beginner');
    setCorrect(0);
    setWaiting(true);
    //navigate('/filmquiz');
  };

  const dntSave = () => {
    setIsModalOpen(false);
    setDisabledButton(null);

    setMyQuestions(getShuffledArr(thesequestions).slice(1, 3));

    setDifficultyLevel('beginner');
    setCorrect(0);
    setWaiting(true);
    //navigate('/filmquiz');
  };

  return (
    <section
      className={`${
        isModalOpen ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className="modal-content">
        {!interrupt && !showLogin && (
          <div>
            <h2>congrats!</h2>
            <p>You answered {percentage}% of the questions correctly</p>
            {difficultyLevel === 'beginner' && percentage < 51 && (
              <p>keep trying</p>
            )}

            {difficultyLevel === 'beginner' && percentage > 51 && (
              <p>great, increase your difficulty level to win a prize</p>
            )}

            {difficultyLevel === 'average' && percentage < 81 && (
              <p>good job, keep praticing , you will soon be a guru</p>
            )}

            {difficultyLevel === 'average' && percentage > 81 && (
              <p>almost guru, increase Difficulty Level to level up </p>
            )}
            {difficultyLevel === 'guru' && percentage < 81 && (
              <p>you are almost a guru, keep playing </p>
            )}
            {difficultyLevel === 'guru' && percentage > 81 && (
              <p>
                Your film knowledge is impressive, you are officially a guru
              </p>
            )}
          </div>
        )}

        {interrupt && (
          <h3>Time's up buddy, click ok to see your results. Thanks!</h3>
        )}

        {!user && showLogin && (
          <div>
            <p>Login/Register to continue</p>
          </div>
        )}
        {!user && (
          <button className="close-btn" onClick={dntSave}>
            ok
          </button>
        )}
        {user && difficultyLevel === 'beginner' && (
          <button className="close-btn" onClick={dntSave}>
            ok
          </button>
        )}

        {user && difficultyLevel === 'average' && (
          <div>
            <button className="close-btn" onClick={move}>
              Save Results
            </button>
            <button className="close-btn" onClick={dntSave}>
              Do not Save
            </button>
          </div>
        )}

        {user && difficultyLevel === 'guru' && (
          <div>
            <button className="close-btn" onClick={move}>
              Save Results
            </button>
            <button className="close-btn" onClick={dntSave}>
              Do not Save
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Modal;
