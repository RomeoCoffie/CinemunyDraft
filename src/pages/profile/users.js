import React, { useEffect, useState } from 'react';
import { useCollection } from '../../Hooks/useCollection';

import './profile.scss';
import { Link } from 'react-router-dom';


function Users() {
  const { documents: users } = useCollection('users', ['createdAt', 'desc']);

  const [status, setStatus] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');

  console.log(users, 'usersPage')

  useEffect(() => {
    setDisplayResults(users)
  }, [users])

  const [displayResults, setDisplayResults] = useState(null)

  const getFilteredResults = (e) => {
    e.preventDefault();
    let results = users.filter(function(person) {
      return (person.location.value.toLowerCase().includes(country.toLowerCase()),
      person.online === status.toLowerCase(),
      person.gender.toLowerCase().includes(gender.toLowerCase()))
    });
      setDisplayResults(results);
  };


  return (
    <div className='userspagethings'>
      <div className='usersFilterBar'>
        <h2>Filters</h2>
        <div>
          <form>
            <div className='usersFilterStatusContainer'>
              <h3>Status</h3>
              <ul>
                <li>
                  <div><input type='radio' name='status' value={true} onChange={(e) => setStatus(e.currentTarget.value)} /><label htmlFor='Online'>Online</label></div>
                  <div><input type='radio' name='status' value={false} onChange={(e) => setStatus(e.currentTarget.value)} /><label htmlFor='Offline'>Offline</label></div>
                </li>
              </ul>
            </div>
            <br />
            <div>
              <h3 for='country'>Filter by Country:</h3>
              <select name='country' onChange={(e) => setCountry(e.target.value)} >
                {
                 users ? 
                  users.map((country)=>(
                    <option value={country.location.value} >{country.location.value}</option>
                  )) : <option value='countries' >countries</option>
                }
              </select>
            </div>
            <br />
            <div className='usersFilterStatusContainer'>
              <h3>Gender</h3>
              <ul>
                <li>
                  <div><input type='radio' name='gender' value='female' onChange={(e) => setGender(e.currentTarget.value)} /><label htmlFor='Female'>Female</label></div>
                  <div><input type='radio' name='gender' value='male' onChange={(e) => setGender(e.currentTarget.value)} /><label htmlFor='Male'>Male</label></div>
                </li>
              </ul>
            </div>
            <button className='filterButton' onClick={getFilteredResults}>Filter</button>
            <button className='filterButton' onClick={(e) => setDisplayResults(users)}>Reset</button>
          </form>
        </div>
      </div>
      <div className='usersDisplay'>
        {
          displayResults ?
            displayResults.map((user) => {
              let backImageStyle = {
                backgroundImage: 'url(' + user.photoURL + ')',
                height: '6em',
                width: '7.9em',
                borderBottom: '1px solid gray',
                borderRadius: '5px',
                marginBottom: '5px',
                backgroundSize: 'cover'
              };
              return (
                <div key={user.id} className='userCard'>
                  <div style={backImageStyle}></div>

                  <div className='userCardDetails'>
                    <label className='userCardDetailsLabel'>{user.displayName}</label>
                  </div>
                  <div>
                    <Link to={`:${user.id}`} state={{ userDetails: user }} className='userCardButton'>See Profile</Link>
                  </div>
                </div>

              )
            }) : <h2>Loading...</h2>
        }
      </div>

    </div>
  )
}

export default Users