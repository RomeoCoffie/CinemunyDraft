import React from 'react';
import { useEffect, useState } from 'react';
//import { QuizContext } from '../../context/quizcontext/Quizcontext';

export default function Group({ grpName, img, url, about, ppleOnline }) {
  const [readMore, setReadMore] = useState(false);

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
          <button className="show" onClick={() => setReadMore(!readMore)}>
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
}
