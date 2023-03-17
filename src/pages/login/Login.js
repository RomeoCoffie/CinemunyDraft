import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../Hooks/useLogin';

import './login.css';

const Login = ({}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { login, error, isPending } = useLogin();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <section className="section">
      <form className="form" onSubmit={handleSubmit}>
        <h4>login</h4>

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
    </section>
  );
};
export default Login;
