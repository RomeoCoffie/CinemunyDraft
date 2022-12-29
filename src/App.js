import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from './context/authcontext/AuthContext';

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

function App() {
  const { authIsReady, user } = useContext(AuthContext);
  console.log('authh', authIsReady);
  //const [user1, setUser1] = useState(null);
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route index element={<Movies />} />
                <Route path="movies" element={<Movies />} />
                <Route path="movies/:id" element={<Singlemovie />} />
                <Route path="tvshows" element={<Tvshows />} />
                <Route path="requests" element={<Requests />} />
                <Route path="groups" element={<Groups />} />
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
