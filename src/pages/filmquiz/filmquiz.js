import React, { useEffect, useState } from 'react';
import { QuizContext } from '../../context/quizcontext/Quizcontext';
import { useContext } from 'react';
import Timer from './Timer';

import SetupForm from './SetupForm';
import Questions from './Questions';
import Loading from './Loading';
import Modal from '../../components/modal/Modal';
import './filmquiz.css';
export default function Filmquiz() {
  // const [waiting, setWaiting] = useState(true);
  // const [Loading, setLoading] = useState(false);
  const [newQuestions, setNewQuestions] = useState([]);
  const [disabledButton, setDisabledButton] = useState(null);
  // const [mycorrect, setMyorrect] = useState(0);
  // const [error, setError] = useState(0);

  const {
    waiting,
    loading,
    questions,

    checkAnswer,
    collectAnswer,
    userAnswers,
    userAnswer,
    setUserAnswer,
    setUserAnswers,
    score,
    selected,
    setIndex,
    userScore,
    setUserScore,
    closeModal,
    isModalOpen,
    setIsModalOpen,
    openModal,
    setSelected,
    difficultyLevel,
    setDifficultyLevel,
    remainingTime,
    setRemainingTime,
    setInteruption,
    myQuestions,
    setMyQuestions,
  } = useContext(QuizContext);

  //Shuffling questions
  const getShuffledArr = (arr) => {
    if (arr != null) {
      const newArr = arr.slice();
      for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
      }
      return newArr;
    }
  };

  useEffect(() => {
    if (myQuestions) {
      switch (difficultyLevel) {
        case 'easy':
          setRemainingTime('hello novice');
          return setNewQuestions(myQuestions.slice(1, 3));

        case 'medium':
          let time = 10;
          setRemainingTime(time);

          return setNewQuestions(myQuestions.slice(1, 5));

        case 'hard':
          let time2 = 170;
          setRemainingTime(time2);
          return setNewQuestions(myQuestions.slice(1, 11));

        default:
          setRemainingTime(null);
          return setNewQuestions(myQuestions.slice(1, 3));
      }

      /* if (difficultyLevel) {
        if (difficultyLevel === 'medium') {
          const secondtemp = questions.slice(1, 6);
          setNewQuestions(secondtemp);
        }
      }
      if (difficultyLevel === 'hard') {
        const secondtemp = questions.slice(1, 10);
        setNewQuestions(secondtemp);
      }
      if (difficultyLevel === 'easy') {
        const secondtemp = questions.slice(1, 4);
        setNewQuestions(secondtemp);
      } */
    }
    /* if (difficultylevel) {
      if (difficultylevel === 'Easy') {
        let time = 170;
        setRemainingTime(time);
      } else if (difficultylevel === 'Hard') {
        let time = 100;
        setRemainingTime(time);
      }
    } */
  }, [myQuestions, difficultyLevel]);

  //Check Results
  const checkResults = () => {
    openModal();
  };

  //handlesubmission of results
  const handleSubmit = (e) => {
    e.preventDefault();
    let mark = 0;
    let wrong = 0;
    if (newQuestions) {
      userAnswers.map((userAnswer, i) => {
        if (userAnswer === newQuestions[i].correctAnswer) {
          mark++;
          setUserScore(mark);
          console.log('correct', userScore, userAnswer, userAnswers);
          return userScore;
        } else {
          wrong++;
          console.log('wrong', wrong, userAnswer, userAnswers);
          return wrong;
        }
      });
    }
    openModal();
  };

  if (waiting) {
    return (
      <div className="setup">
        <SetupForm />;
      </div>
    );
  }
  if (loading) {
    return (
      <div className="loading">
        <Loading />;
      </div>
    );
  }
  return (
    <main className="quiztime">
      <h2 className="quizhead">Film Quiz</h2>

      <section className="quiz">
        <article className="container">
          <div className="difficult">
            <p className="words">Select Difficulty Level:</p>
            {remainingTime > 0 && <Timer />}
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
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <form className="questions-form" onSubmit={handleSubmit}>
            {newQuestions.map((quest, indie) => {
              const { id, question, option, correctAnswer } = quest;

              return (
                <div className="questioncard">
                  <div className={`${selected ? '' : 'question'}`}>
                    <span>
                      {indie + 1}

                      <h4 className="question">{question}</h4>
                    </span>
                  </div>
                  {option.map((choice, choiceindex) => {
                    setIndex(choiceindex);
                    return (
                      <div className="answers-container answerbtn">
                        <input
                          key={choiceindex}
                          type="radio"
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
            })}

            <button className="submit-btn">submt</button>
          </form>
          {isModalOpen && <Modal />}
        </article>
      </section>
    </main>
  );
}
