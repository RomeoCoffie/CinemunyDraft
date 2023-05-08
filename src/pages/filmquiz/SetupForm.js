import React from 'react';
import { useState } from 'react';
import Prizemodal from './prizeModal';
//import { QuizContext } from '../../context/quizcontext/Quizcontext';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import './filmquiz.css';

export default function SetupForm({
  setDifficultyLevel,
  waiting,
  setWaiting,
  disabledButton,
  setDisabledButton,
  difficultyLevel,
  remainingTime,
  setRemainingTime,
  myQuestions,
}) {
  const [showPrizeModal, setShowPrizeModal] = useState(false);

  const startQuize = () => {
    setWaiting(false);
  };

  return (
    <main className="quiztime">
      <Container>
        <section>
          <div className="prizes">
            {/*  <button
              onClick={() => setShowPrizeModal(true)}
              className="pbtn"
            ></button> */}
            <Button onClick={() => setShowPrizeModal(true)} variant="text">
              Checkout Prizes
            </Button>
          </div>
          <div className="select-level">
            <h5 className="words">Select Difficulty Level:</h5>

            <select
              disabled={disabledButton}
              value={difficultyLevel}
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

            {difficultyLevel === 'average' && myQuestions && (
              <div>
                <p style={{ color: 'red' }}> 30 seconds </p>
                <p style={{ color: 'green' }}>
                  {myQuestions.length}&nbsp;questions.
                </p>
                <p> Good Luck</p>
              </div>
            )}
            {difficultyLevel === 'guru' && (
              <div>
                <p style={{ color: 'red' }}> 60 Seconds</p>
                <p style={{ color: 'green' }}>
                  {myQuestions.length}&nbsp;questions.
                </p>
                <p> Good Luck</p>
              </div>
            )}
          </div>

          <div className="prizes">
            <Button
              sx={{ textAlign: 'center', marginLeft: 1 }}
              onClick={startQuize}
              variant="text"
            >
              Start Quiz
            </Button>
            {/*  <button onClick={startQuize} className="pbtn">
              start
            </button> */}
          </div>
        </section>
        {showPrizeModal && (
          <Prizemodal
            showPrizeModal={showPrizeModal}
            setShowPrizeModal={setShowPrizeModal}
          />
        )}
      </Container>
    </main>
  );
}
