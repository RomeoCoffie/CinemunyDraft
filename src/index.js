import React from 'react';
import ReactDOM from 'react-dom/client';
import { TkimoviesProvider } from './context/tkimovies/tkimovies';
import { QuizContextProvider } from './context/quizcontext/Quizcontext';
import { AuthContextProvider } from './context/authcontext/AuthContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TkimoviesProvider>
        <QuizContextProvider>
          <App />
        </QuizContextProvider>
      </TkimoviesProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
