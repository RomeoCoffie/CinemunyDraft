import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//import { QuizContext } from '../../context/quizcontext/Quizcontext';
//import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { AuthContext } from '../../context/authcontext/AuthContext';
//import { useNavigate } from 'react-router-dom';

import './modal.css';

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  interrupt,
  setDifficultyLevel,
  difficultyLevel,
  myQuestions,
  disabledButton,
  setDisabledButton,
  setShowWinnersModal,
  saveResults,
  showLogin,
  setWaiting,
  ritAns,
  setRitAns,
  setShowTimer,
  setPercentage,
  percentage,
}) => {
  //const [timeScore, settimedScore]=useState(null)
  /*  const {
    isModalOpen,
    setIsModalOpen,
    correct,
    percentage,
    interrupt,
    difficultyLevel,
    //myQuestions,
    //disabledButton,
    setDisabledButton,
    //setShowTimer,
    saveResults,
    showLogin,
    setDifficultyLevel,
    setCorrect,
    setWaiting,
  } = useContext(QuizContext); */

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isModalOpen) {
    // console.log('entest');
    setShowTimer(false);

    let results = ((ritAns / myQuestions.length) * 100).toFixed(0);

    setPercentage(results);
    console.log(
      results,
      ritAns,
      myQuestions.length,
      difficultyLevel,
      percentage
    );
  }

  //if user saves results
  const save = () => {
    setDisabledButton(null); //select difficulty button
    if (user) {
      saveResults();
      if (percentage > 79) {
        setShowWinnersModal(true);
        console.log('we have ourselves a winner');
        navigate('/movies');
      }
    }

    setIsModalOpen(false);
    setDifficultyLevel('beginner');
    setRitAns(0);
    setWaiting(true);
  };

  //if user decides not to save results
  const dntSave = () => {
    setDisabledButton(null);
    setIsModalOpen(false);
    setDifficultyLevel('beginner');
    setRitAns(0);
    setWaiting(true);
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

            {difficultyLevel === 'average' && percentage < 79 && (
              <p>good job, keep praticing , you will soon level up</p>
            )}

            {difficultyLevel === 'average' && percentage > 79 && (
              <p>
                congrats, Your Film Knowledge is Average, click okay to claim
                your prize{' '}
              </p>
            )}
            {difficultyLevel === 'guru' && percentage < 79 && (
              <p>you are almost a guru, keep playing </p>
            )}
            {difficultyLevel === 'guru' && percentage > 79 && (
              <p>
                Your film knowledge is impressive, you are officially a guru.
                Click ok to claim your prize.
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
            <button
              className="close-btn"
              onClick={() => {
                navigate('/login');
              }}
            >
              ok
            </button>
          </div>
        )}
        {!user && !showLogin && (
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
            <button className="close-btn" onClick={save}>
              ok
            </button>
            {/* <button className="close-btn" onClick={dntSave}>
              Do not Save
            </button> */}
          </div>
        )}

        {user && difficultyLevel === 'guru' && (
          <div>
            <button className="close-btn" onClick={save}>
              ok
            </button>
            {/*  <button className="close-btn" onClick={dntSave}>
              Do not Save
            </button> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default Modal;
