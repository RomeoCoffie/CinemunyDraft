import React, { useEffect, useState, useContext, Link } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';

import { urlPatterns } from '../../data/datalinks';

import useFetch from '../../Hooks/useFetch';
import './post.css';
import Post from './post';

export default function Posts() {
  const [readMore, setReadMore] = useState(false);
  const [images, setImages] = useState(null);
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
          posts.map((post, postIndex) => {
            return <Post key={postIndex} {...post} />;
          })}
      </main>
    </section>
  );
}
