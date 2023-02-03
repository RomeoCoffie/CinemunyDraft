import React from 'react';
import { useEffect, useState } from 'react';
import { QuizContext } from '../../context/quizcontext/Quizcontext';
import { useContext } from 'react';

//styles
import './timer.css';

export default function Timer({ stopTime }) {
  const {
    questions,
    closeModal,
    isModalOpen,
    setIsModalOpen,
    openModal,
    difficultyLevel,
    newQuestions,
    remainingTime,
    setRemainingTime,
    setInteruption,
  } = useContext(QuizContext);

  useEffect(() => {
    if (remainingTime && difficultyLevel) {
      let time = remainingTime;
      const intervalId = setInterval(() => {
        time--;
        setRemainingTime(time);
        //setRemainingTime((remainingTime) => remainingTime--);
        if (difficultyLevel === 'beginner') {
          clearInterval(intervalId);
          openModal();
        }
        if (time === 0) {
          setInteruption(true);
          clearInterval(intervalId);
          openModal();
        }
      }, 1000);
    }
  }, [difficultyLevel, remainingTime]);

  return (
    <div className="timer">
      {remainingTime !== 0 && (
        <span>
          <h4>Time Left:&nbsp;</h4>

          <h4 className="counter">{remainingTime}</h4>
        </span>
      )}

      {remainingTime === 0 && <h2 className="timeup">Time is Up!!!</h2>}
    </div>
  );
}
