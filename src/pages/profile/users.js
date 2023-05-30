import React, { useEffect, useState } from 'react';
import { useCollection } from '../../Hooks/useCollection';

import './profile.scss';
import { Link } from 'react-router-dom';


function Users() {
  const { documents: users } = useCollection('users');
  const [displayResults, setDisplayResults] = useState(null)

  const [status, setStatus] = useState(true);
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');

  let finalCountryList=[]
  let filteredCountries=(users)=>{
    console.log('1')
    for (let i = 0; i < users.length; i++) {
      console.log('2')
      if(finalCountryList.includes(users[i].location.label.toLowerCase())===false){
        finalCountryList.push(users[i].location.label.toLowerCase())
      }
    }
  }
  filteredCountries(users)


  useEffect(() => {
    setDisplayResults(users)
  }, [users])


  const getFilteredResults = (e) => {
    e.preventDefault();
    let results = users.filter(function(person) {
      return (
        (
          person.online ?
          (person.online===status) : []
        ),
          (
            person.gender ?
            (person.gender.toLowerCase() === gender.toLowerCase()) : []
          ),
          (
            person.location ?
            (person.location.label.toLowerCase().includes(country.toLowerCase())) : []
          )
        )
    });
      setDisplayResults(results);
  };
console.log(finalCountryList,'filteredCountries')
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
                  <div><input type='radio' name='status' onChange={(e) => setStatus(true)} /><label htmlFor='Online'>Online</label></div>
                  <div><input type='radio' name='status'  onChange={(e) => setStatus(false)} /><label htmlFor='Offline'>Offline</label></div>
                </li>
              </ul>
            </div>
            <br />
            <div>
              <h3 for='country'>Filter by Country:</h3>
              <select name='country' onChange={(e) => setCountry(e.target.value)} >
                {
                  finalCountryList.length > 0 ? 
                  finalCountryList.map((country)=>{
                    return (
                    <option value={country} >{country}</option>
                  )}) : <option value='countries' >Choose</option>
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
              let eachUsersPic
              if(user.photoURL){
                eachUsersPic=user.photoURL
              }else{
                eachUsersPic='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
              }
              let backImageStyle = {
                backgroundImage: 'url(' + eachUsersPic + ')',
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