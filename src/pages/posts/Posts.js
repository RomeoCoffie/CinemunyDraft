import React, { useEffect, useContext } from 'react';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { AuthContext } from '../../context/authcontext/AuthContext';
import Post from './post';

//import { urlPatterns } from '../../data/datalinks';

import './posts.css';

export default function Posts() {
  const { posts, setPosts, news } = useContext(TkimoviesContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (news) {
      setPosts(news);
      console.log(news);
    }
  }, [news]);

  return (
    <section className="posts-section">
      <main>
        {posts &&
          posts.map((post, postIndex) => {
            return <Post key={postIndex} {...post} user={user} />;
          })}
      </main>
    </section>
  );
}
