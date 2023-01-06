import React from 'react';
import { useState } from 'react';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';

export default function Post({
  description,
  postTilte,
  postImgUrl,
  source,
  copyright,
  createdAt,
  youTubeLink,
}) {
  const [index, setIndex] = useState(0);
  const [readMore, setReadMore] = useState(false);

  const checkNumber = (number) => {
    if (number > postImgUrl.length - 1) {
      return 0;
    }
    if (number < 0) {
      return postImgUrl.length - 1;
    }
    return number;
  };
  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  return (
    <article className="groups">
      <h4>{postTilte}</h4>
      <div>
        <img src={postImgUrl[index]}></img>
        <button className="prev" onClick={prevPerson}>
          <BsChevronDoubleLeft />
        </button>
        <button className="next" onClick={nextPerson}>
          <BsChevronDoubleRight />
        </button>
      </div>

      <footer>
        <p>
          {readMore ? description : `${description.substring(0, 200)}...`}
          &nbsp;
          <button className="show" onClick={() => setReadMore(!readMore)}>
            {readMore ? 'show less' : '  read more'}
          </button>
        </p>
        <a className="source" href={source}>
          source
        </a>
      </footer>
      <hr className="horizon" />
    </article>
  );
}

/* if (!postImgUrl) {
              return (
                <div className="setup">
                  <h1>YouTube video</h1>
                </div>
              );
            } */
