import React from 'react';

//import './singleqestion.css';
import './filmquiz.css';

export default function Question({
  id,
  question,
  option,
  correctAnswer,
  indie,
  selected,
  setSelected,
  checkAnswer,
  userAnswers,
  setUserAnswers,
  setIndex,
}) {
  return (
    <div className="questioncard" key={id}>
      <div>
        <span>
          {indie + 1}

          <h4 className="question">{question}</h4>
        </span>
      </div>
      {option.map((choice, choiceindex) => {
        setIndex(choiceindex);
        return (
          <div className="answers-container answerbtn" key={choiceindex}>
            <input
              key={choiceindex}
              type="checkbox"
              name="options"
              className="answerbtn"
              //checked={choiceindex}
              onChange={(e) => {
                checkAnswer(correctAnswer === choice);
                let newAnswers = [...userAnswers];
                newAnswers[indie] = choice;
                setUserAnswers(newAnswers);
                setSelected(true);
              }}
            />
            {choice}
          </div>
        );
      })}
    </div>
  );
}
