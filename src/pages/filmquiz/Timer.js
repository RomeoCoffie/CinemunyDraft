import React, { useCallback } from 'react';
import { useEffect, useState, useRef } from 'react';
import { QuizContext } from '../../context/quizcontext/Quizcontext';
import { useContext } from 'react';

//styles
import './timer.css';

export default function Timer({ stopTime }) {
  const {
    openModal,
    difficultyLevel,
    myQuestions,
    remainingTime,
    setRemainingTime,
    setInteruption,
    interuption,
    queIndex,
    setShowTimer,
    waiting,
    timeTimer,
  } = useContext(QuizContext);

  // const intervalId = useRef();
  //Timer Function
  const decreaseTime = useCallback(() => {
    if (remainingTime) {
      setRemainingTime((count) => count - 1);
    }
  }, []);

  useEffect(() => {
    if (remainingTime <= 0) {
      if (myQuestions === queIndex) {
        setInteruption(true);
      }
      openModal(); //opens modal and returns results
      return;
    }
    const timeFunction = setInterval(decreaseTime, 1000); //set test interval
    return () => clearInterval(timeFunction); //clears interval
  }, [decreaseTime, remainingTime]);

  return (
    <div className="timer">
      {remainingTime !== 0 && (
        <span>
          <p>Time Left:&nbsp;</p>
          <p className="counter">{remainingTime}</p>
        </span>
      )}
      {/*  {remainingTime  && interuption && (
        <h2 className="timeup">Time is Up!!!</h2>
      )} */}
    </div>
  );
}
