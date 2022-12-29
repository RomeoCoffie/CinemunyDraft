import React, { useState } from 'react';
import { useContext } from 'react';
import { QuizContext } from '../../context/quizcontext/Quizcontext';

import './modal.css';

const Modal = () => {
  //const [timeScore, settimedScore]=useState(null)
  const { isModalOpen, setIsModalOpen, userScore, interrupt } =
    useContext(QuizContext);

  return (
    <section
      className={`${
        isModalOpen ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>
          You answered {((userScore / 3) * 100).toFixed(0)}% of questions
          correctly
        </p>

        {interrupt && (
          <h3>Time's up buddy, click ok to see your results. Thanks!</h3>
        )}
        <button className="close-btn" onClick={() => setIsModalOpen(false)}>
          play again
        </button>
      </div>
    </section>
  );
};

export default Modal;
