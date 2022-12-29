import React from 'react';
import { useContext } from 'react';
import { QuizContext } from '../../context/quizcontext/Quizcontext';

export default function SetupForm() {
  const { setDifficultyLevel } = useContext(QuizContext);
  return (
    <section>
      <mian></mian>
      <h3>SetupForm</h3>

      <div className="difficult">
        <span className="words">Select Difficulty Level:</span>
        <select
          onChange={(e) => setDifficultyLevel(e.target.value)}
          className="selection"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </section>
  );
}
