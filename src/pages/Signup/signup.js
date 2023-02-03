import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useSignup from '../../Hooks/useSignup';

import styles from './signup.module.css';

function Signup() {
  const [displayname, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, signup, isPending } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signup(email, password, displayname);
    setDisplayName('');
    setEmail('');
    setPassword('');

    navigate('/login');
  };

  return (
    <section>
      <div className={styles.signuparticle}>
        {/*used ['login-form'] for the styles because of of the  minus (-)*/}
        <div className={styles.caption}>
          <h3>Create Account</h3>
        </div>

        <div>
          <form onSubmit={handleSubmit} className={styles.signup}>
            <label>
              <span>Name</span>
              <input
                type="text"
                value={displayname}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {!isPending && <button className={styles.btn}>Signup</button>}

            {isPending && (
              <button className={styles.btn} disabled>
                loading...........
              </button>
            )}

            {error && <p>{error} </p>}
          </form>
        </div>
      </div>
    </section>
  );
}
export default Signup;
