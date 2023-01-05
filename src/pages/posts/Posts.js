import React, { useEffect, useState, useContext, Link } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';

import useFetch from '../../Hooks/useFetch';
import './post.css';

export default function Posts() {
  const [readMore, setReadMore] = useState(false);
  const [images, setImages] = useState(null);
  const [index, setIndex] = useState(0);
  const { posts, setPosts, news } = useContext(TkimoviesContext);

  if (news) {
    setPosts(news);
    console.log(news);
    // console.log(data, groups, 'hi');
  }

  return (
    <section className="groups-section">
      <main>
        <div className="groups-head">
          <h2>Cinemuny</h2>
        </div>

        <div className="underline"></div>

        {posts &&
          posts.map((post) => {
            const { description, postTilte, postImgUrl, source, copyright } =
              post;
            let imgg = postImgUrl[index];
            //setImages(postImgUrl);
            return (
              <article className="groups">
                <h4>{postTilte}</h4>
                <div>
                  <img src={imgg} alt={postTilte} />
                  <button className="prev" onClick={() => setIndex(index - 1)}>
                    <BsChevronDoubleLeft />
                  </button>
                  <button className="next" onClick={() => setIndex(index + 1)}>
                    <BsChevronDoubleRight />
                  </button>
                </div>

                <footer>
                  <p>
                    {readMore
                      ? description
                      : `${description.substring(0, 200)}...`}
                    &nbsp;
                    <button
                      className="show"
                      onClick={() => setReadMore(!readMore)}
                    >
                      {readMore ? 'show less' : '  read more'}
                    </button>
                  </p>
                  <a className="source" href={source}>
                    Join
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
