import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import { AuthContext } from '../../context/authcontext/AuthContext';
import { useAddDocs } from '../../Hooks/useAddDocs';
import { useCollection } from '../../Hooks/useCollection';

import { Timestamp } from 'firebase/firestore';

//styles
import './winners.css';

export default function Winnerspage() {
  const [email, setEmail] = useState('');
  const [inputError, setInputError] = useState(null);
  //const [phoneNumer, setPhoneNumer] = useState(0);
  const [value, setValue] = useState();
  const { user } = useContext(AuthContext);
  const { addDocument, response } = useAddDocs('winners');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      if (email.length > 0) {
        await addDocument({
          createdAt: Timestamp.fromDate(new Date()),
          user: user.uid,
          email,
          value,
        });
        //incase comments modal isn't opened
      } else {
        setInputError('you must input a comment');
        console.log(inputError);
      }
    } else {
      navigate('/filmquiz');
      console.log('login to comment');
    }
    console.log(response);
    console.log('winner added');
  };
  return (
    <div className="winner-head">
      <h5>
        Congrats&nbsp;{user.displayName}!! Input your info to claim your prize
      </h5>
      <form onSubmit={handleSubmit}>
        <label>
          <span className="title">Email</span>
          <input
            className="the-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <PhoneInput
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
        />
        <button className="btn">submit</button>
      </form>
    </div>
  );
}
