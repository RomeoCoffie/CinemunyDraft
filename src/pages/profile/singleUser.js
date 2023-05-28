import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './profile.scss'

function SingleUser() {
  const navigate = useNavigate()
  let { state }=useLocation();
  console.log(state.userDetails)
  let headImageStyle={
    backgroundImage: 'url(' + state.userDetails.photoURL + ')',
    height: '8em',
    width: '8em',
    borderBottom: '1px solid gray',
    borderRadius: '50%',
    flex: 1,
    backgroundSize: 'cover'
  };
  return (
    <div className='singleUserPage'>
      <div className='singleUserHeader'>
        <div style={headImageStyle}></div>
        <div className='singleHeadDetails'>
          <h2>{state.userDetails.displayName}</h2><br/>
          <h3>Online:{state.userDetails.online}</h3>
        </div>
      </div>
      <hr/>
      
      <div className='singleUserBody'>
        <h2>Meta Data</h2>
        <div>
          <h3>Bio</h3><br/>
          <label>Full Name: <span>{state.userDetails.displayName}</span></label><br/>
          <label>Gender: <span>{state.userDetails.gender}</span></label><br/>
          <label>Location: <span>{state.userDetails.location.label}</span></label><br/>
          <label>Favorite Movie: <span>{state.userDetails.favMovie}</span></label><br/>
          <label>Account Created at: <span>{state.userDetails.createdAt.seconds}</span></label><br/>
          <label>Bio: <span>{state.userDetails.bio}</span></label>
        </div><br/>
        <div>
          <h3>Quiz Details</h3><br/>
          <label>Quiz Level: <span>{state.userDetails.quiz[state.userDetails.quiz.length-1].level}</span></label><br/>
          <label>Quiz Percent: <span>{state.userDetails.quiz[state.userDetails.quiz.length-1].percent}</span></label><br/>
          <label>Quiz Score: <span>{state.userDetails.quiz[state.userDetails.quiz.length-1].score}</span></label>

        </div>
      </div>
      <div className='singleUserFooter'></div>
    </div>
    
  )
}

export default SingleUser