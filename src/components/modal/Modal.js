import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { QuizContext } from '../../context/quizcontext/Quizcontext';
import { useNavigate } from 'react-router-dom';

import './modal.css';

const Modal = ({ setDisabledButton, setStopTime }) => {
  //const [timeScore, settimedScore]=useState(null)
  const {
    isModalOpen,
    setIsModalOpen,
    setPercentage,
    userScore,
    interrupt,
    difficultyLevel,
    newQuestions,
    setDifficultyLevel,
    percentage,
    setQuestionsReset,
  } = useContext(QuizContext);
  const navigate = useNavigate();

  const move = () => {
    setIsModalOpen(false);
    console.log(difficultyLevel);
  };

  return (
    <section
      className={`${
        isModalOpen ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className="modal-content">
        {!interrupt && (
          <div>
            <h2>congrats!</h2>
            <p>You answered {percentage}% of the questions correctly</p>
          </div>
        )}

        {interrupt && (
          <h3>Time's up buddy, click ok to see your results. Thanks!</h3>
        )}
        <button className="close-btn" onClick={move}>
          ok
        </button>
      </div>
    </section>
  );
};

export default Modal;
