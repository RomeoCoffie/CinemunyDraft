import React, { useEffect, useState, useContext } from 'react';
import { QuizContext } from '../../context/quizcontext/Quizcontext';

import useFetch from '../../Hooks/useFetch';
import './groups.css';

export default function Groups() {
  const [readMore, setReadMore] = useState(false);
  const { groups, setGroups, data } = useContext(QuizContext);

  if (data) {
    setGroups(data);
    console.log(data, groups, 'hi');
  }

  return (
    <section className="groups-section">
      <div className="groups-head">
        <h2>Groups</h2>
        <div className="underline"></div>

        <div>
          {groups &&
            groups.map((group) => {
              const { name, img, url, about, members } = group;
              return (
                <article className="groups">
                  <img src={img} alt={name} />
                  <footer>
                    <div>
                      <h4>{name}</h4>
                      <p className="members">{members} &nbsp; people online</p>
                    </div>
                    <p>
                      {readMore ? about : `${about.substring(0, 200)}...`}
                      &nbsp;
                      <button
                        className="show"
                        onClick={() => setReadMore(!readMore)}
                      >
                        {readMore ? 'show less' : '  read more'}
                      </button>
                    </p>
                    <a className="join" href={url}>
                      {' '}
                      Join
                    </a>
                  </footer>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
}
