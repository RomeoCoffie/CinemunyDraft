import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from './context/authcontext/AuthContext';
import { Helmet } from 'react-helmet';

import Home from './pages/home/home';
import Movies from './pages/movies/movies';
import Tvshows from './pages/tvshows/tvshows';
import Requests from './pages/requests/requests';
import Groups from './pages/groups/groups';
import Filmquiz from './pages/filmquiz/filmquiz';
import Login from './pages/login/Login';
import Signup from './pages/Signup/signup';

import './App.css';
import Singlemovie from './pages/singlemovie/Singlemovie';
import Proroutes from './pages/protectedroutes/proroutes';
import Addmovie from './pages/addmovie/Addmovie';
import Addquestion from './pages/filmquiz/addquestions';
import Addgroup from './pages/addgroup/Addgroup';
import Addpost from './pages/addpost/Addpost';
import Posts from './pages/posts/Posts';
import Headtags from './components/Headtags';
import Singleshow from './pages/singleshow/Singleshow';

function App() {
  const { authIsReady, user } = useContext(AuthContext);
  console.log('auth', authIsReady);
  //const [user1, setUser1] = useState(null);
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <div>
            <Helmet>
              <title>Cinemuny</title>
              <meta
                name="description"
                key="description"
                content="all about movies/tvshows"
              />
              <meta
                name="keywords"
                content="movies, Tv shows, Tv Series, Nollywood, Netflix, Amazon, disney, hbo"
              />
            </Helmet>

            <Routes>
              <Route path="/" element={<Home />}>
                <Route index element={<Posts />} />
                <Route path="movies" element={<Movies />} />
                <Route path="movies/:id" element={<Singlemovie />} />
                <Route path="tvshows" element={<Tvshows />} />
                <Route path="tvshows/:id" element={<Singleshow />} />
                <Route path="requests" element={<Requests />} />
                <Route path="filmquiz" element={<Filmquiz />} />

                <Route
                  path="addmovie"
                  element={
                    <Proroutes user={user}>
                      <Addmovie></Addmovie>
                    </Proroutes>
                  }
                />
                <Route
                  path="addquestion"
                  element={
                    <Proroutes user={user}>
                      <Addquestion />
                    </Proroutes>
                  }
                />

                <Route
                  path="addpost"
                  element={
                    <Proroutes user={user}>
                      <Addpost />
                    </Proroutes>
                  }
                />

                <Route path="groups" element={<Groups />} />

                <Route
                  path="groups/:addgroup"
                  element={
                    <Proroutes user={user}>
                      <Addgroup />
                    </Proroutes>
                  }
                />

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Signup />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
