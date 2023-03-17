import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import Aside from '../../components/aside/aside';

//import Article from '../../components/article/article';
import Footer from '../../components/footer/footer';
//import Movies from '../movies/movies';

import './home.css';

export default function Home() {
  return (
    <div className="grid-container">
      <header>
        <Navbar />
      </header>
      <section>
        <Sidebar />
      </section>
      <section>
        <Outlet />
      </section>

      {/* <aside>
        <Aside />
      </aside> */}

      <Footer />
    </div>
  );
}
