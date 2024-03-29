import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Prosuperadmin from './pages/protectedroutes/prosuperadmin';
import Addmovie from './pages/addmovie/Addmovie';
import Addshow from './pages/addshow/addshow';
import Addquestion from './pages/filmquiz/addquestions';
import Addgroup from './pages/addgroup/Addgroup';
import Addpost from './pages/addpost/Addpost';
import Posts from './pages/posts/Posts';
//import Headtags from './components/Headtags';
import Singleshow from './pages/singleshow/Singleshow';
import Adminpage from './pages/admin/admin';
import Userform from './pages/profile/userform';
// import Theuser from './pages/profile/theuser';
import Users from './pages/profile/users';
import SingleUser from './pages/profile/singleUser';
import Winnerspage from './pages/filmquiz/winnerspage';
import Userpage from './pages/profile/userpage';
import FilmList from './pages/admin/Lists/FilmList';
import ShowList from './pages/admin/Lists/ShowList';
import ShowGroups from './pages/admin/Lists/ShowGroups';
import ShowPosts from './pages/admin/Lists/ShowPosts';
import ShowQuestions from './pages/admin/Lists/ShowQuestions';
import FilmEdits from './pages/admin/Edits/FilmEdits';
import ShowEdits from './pages/admin/Edits/ShowEdits';
import PostsEdit from './pages/admin/Edits/PostsEdit';
import GroupEdits from './pages/admin/Edits/GroupEdits';
import QuestionEdit from './pages/admin/Edits/QuestionEdit'
import WinnersList from './pages/admin/Lists/WinnersList';

function App() {
  const { authIsReady, user } = useContext(AuthContext);

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
                  path="admin"
                  element={
                    <Proroutes user={user}>
                      <Adminpage />
                    </Proroutes>
                  }
                />
                <Route
                  path="winners"
                  element={
                    <Proroutes user={user}>
                      <Winnerspage></Winnerspage>
                    </Proroutes>
                  }
                />

                <Route
                  path="users"
                  element={
                    <Prosuperadmin user={user}>
                      <Users />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="winnerslist"
                  element={
                    <Prosuperadmin user={user}>
                      <WinnersList />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="films"
                  element={
                    <Prosuperadmin user={user}>
                      <FilmList />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="films/1/:id"
                  element={
                    <Prosuperadmin user={user}>
                      <FilmEdits />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="shows/2/:id"
                  element={
                    <Prosuperadmin user={user}>
                      <ShowEdits />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="groups/3/:id"
                  element={
                    <Prosuperadmin user={user}>
                      <GroupEdits />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="posts/4/:id"
                  element={
                    <Prosuperadmin user={user}>
                      <PostsEdit />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="questions/5/:id"
                  element={
                    <Prosuperadmin user={user}>
                      <QuestionEdit />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="shows"
                  element={
                    <Prosuperadmin user={user}>
                      <ShowList />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="groups"
                  element={
                    <Prosuperadmin user={user}>
                      <ShowGroups />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="posts"
                  element={
                    <Prosuperadmin user={user}>
                      <ShowPosts />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="questions"
                  element={
                    <Prosuperadmin user={user}>
                      <ShowQuestions />
                    </Prosuperadmin>
                  }
                />

                <Route
                  path="users/:id"
                  element={
                    <Proroutes user={user}>
                      <SingleUser />
                    </Proroutes>
                  }
                />

                <Route
                  path="addmovie"
                  element={
                    <Proroutes user={user}>
                      <Addmovie></Addmovie>
                    </Proroutes>
                  }
                />

                <Route
                  path="addshow"
                  element={
                    <Proroutes user={user}>
                      <Addshow />
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
                  path="addgroup"
                  element={
                    <Proroutes user={user}>
                      <Addgroup />
                    </Proroutes>
                  }
                />

                <Route
                  path="profile"
                  element={
                    <Proroutes user={user}>
                    <Userpage />
                      {/* <Theuser /> */}
                    </Proroutes>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <Proroutes user={user}>
                      <Userform />
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
