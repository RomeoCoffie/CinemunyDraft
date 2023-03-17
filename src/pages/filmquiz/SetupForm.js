import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import Prizemodal from './prizeModal';
import { QuizContext } from '../../context/quizcontext/Quizcontext';

import './filmquiz.css';

export default function SetupForm() {
  const {
    setDifficultyLevel,
    waiting,
    setWaiting,
    disabledButton,
    setDisabledButton,
    difficultyLevel,
    remainingTime,
    setRemainingTime,
    myQuestions,
  } = useContext(QuizContext);
  const [showPrizeModal, setShowPrizeModal] = useState(false);

  const startQuize = () => {
    setWaiting(false);
  };

  return (
    <main className="quiztime">
      <section>
        <div className="prizes">
          <button onClick={() => setShowPrizeModal(true)} className="pbtn">
            Checkout Prizes
          </button>
        </div>
        <section className="pretest">
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

          {difficultyLevel === 'average' && (
            <div>
              <p style={{ color: 'red' }}>{remainingTime} seconds &nbsp; </p>
              <p style={{ color: 'green' }}>
                {myQuestions.length}&nbsp;questions.
              </p>
              <p> Good Luck</p>
            </div>
          )}
          {difficultyLevel === 'guru' && (
            <div>
              <p style={{ color: 'red' }}>{remainingTime} seconds &nbsp; </p>
              <p style={{ color: 'green' }}>
                {myQuestions.length}&nbsp;questions.
              </p>
              <p> Good Luck</p>
            </div>
          )}
        </section>

        <div className="prizes">
          <button onClick={startQuize} className="pbtn">
            start
          </button>
        </div>
      </section>
      {showPrizeModal && (
        <Prizemodal
          showPrizeModal={showPrizeModal}
          setShowPrizeModal={setShowPrizeModal}
        />
      )}
    </main>
  );
}
