import React, { useEffect, useState, useContext } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { AuthContext } from '../../context/authcontext/AuthContext';

//import { urlPatterns } from '../../data/datalinks';

import './posts.css';
import Post from './post';

export default function Posts() {
  const { posts, setPosts, news } = useContext(TkimoviesContext);
  const { authIsReady, user } = useContext(AuthContext);

  useEffect(() => {
    if (news) {
      setPosts(news);
      console.log(news);
    }
  }, [news]);

  return (
    <section className="posts-section">
      <main>
        <div className="posts-head">
          <h2>Cinemuny</h2>
        </div>

        <div className="post-underline"></div>

        {posts &&
          posts.map((post, postIndex) => {
            return <Post key={postIndex} {...post} user={user} />;
          })}
      </main>
    </section>
  );
}
