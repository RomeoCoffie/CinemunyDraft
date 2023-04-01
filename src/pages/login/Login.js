import React, { useState } from 'react';
import { Container } from '@mui/system';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../Hooks/useLogin';
import { makeStyles } from '@mui/styles';

import './login.css';

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block',
  },

  contain: {
    marginTop: 10,
  },
});

const Login = ({}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { login, error, isPending } = useLogin();
  const classes = useStyles();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <Container className={classes.contain}>
      <form
        className="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <h4>login</h4>
        {/*  <TextField
            className={classes.field}
            id="password"
            label="email"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />

          <TextField
            id="password"
            className={classes.field}
            label="password"
            type="password"
            required
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          /> */}

        <div className="form-row">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-row items">
          <button type="submit" className="btn btn-block">
            login
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </Container>
  );
};
export default Login;
