import React, { useEffect, useState, useContext, Link } from 'react';
import { QuizContext } from '../../context/quizcontext/Quizcontext';

import useFetch from '../../Hooks/useFetch';
import './groups.css';

export default function Groups() {
  const [readMore, setReadMore] = useState(false);
  const { groups, setGroups, data } = useContext(QuizContext);

  if (data) {
    setGroups(data);
    // console.log(data, groups, 'hi');
  }

  return (
    <section className="groups-section">
      <main>
        <div className="groups-head">
          <h2>Groups</h2>
        </div>

        <div className="underline"></div>

        {groups &&
          groups.map((group) => {
            const { grpName, img, url, about, ppleOnline } = group;
            return (
              <article className="groups">
                <img src={img} alt={grpName} />
                <footer>
                  <div>
                    <h4>{grpName}</h4>
                    <p className="members">{ppleOnline} &nbsp; people online</p>
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
                    Join
                  </a>
                  <a href="groups/addgroup" className="addgroup">
                    Add group
                  </a>
                </footer>
                <hr className="horizon" />
              </article>
            );
          })}
      </main>
    </section>
  );
}
