import React, { useEffect, useState, useContext, Link } from 'react';
import { QuizContext } from '../../context/quizcontext/Quizcontext';

import useFetch from '../../Hooks/useFetch';
import Group from './group';
import './groups.css';

export default function Groups() {
  // const [readMore, setReadMore] = useState(false);
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

        {groups &&
          groups.map((group, grpIndex) => {
            // const { grpName, img, url, about, ppleOnline } = group;
            return <Group key={grpIndex} {...group} />;
          })}
      </main>
    </section>
  );
}
