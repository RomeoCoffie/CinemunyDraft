import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../admin.css'
import Multiselect from 'multiselect-react-dropdown';
import { genreList, keywordsList } from '../../../data/datalinks';
import { AiOutlinePlus } from 'react-icons/ai';

import { db } from '../../../components/firebase/config';
import { updateDoc, doc } from 'firebase/firestore';

function FilmEdits() {
  const [whereEdit, setWhereEdit]=useState(null)
  const [newTitle, setNewTitle]=useState('');
  const [newYoutubeLink, setNewYoutubeLink]=useState('');
  const [newYear, setNewYear]=useState('');
  const [newRating, setNewRating]=useState('');
  const [newDescription, setNewDescription]=useState('');
  const [progress, setProgress] = useState(null);
  const [director, setDirector] = useState([]);
  const [cast, setCast] = useState([]);


  let { state }=useLocation();
  let theMovie=state.filmDetails
  console.log(theMovie,'thisMovie')

  let submitNewTitle= async (newTitle)=>{
    const theRef = doc(db, 'movies', theMovie.id);
    console.log(newTitle,'theNewTitle')
    if (newTitle==='' || newTitle===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        title: newTitle
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }
  let submitNewDesc= async (newDescription)=>{
    const theRef = doc(db, 'movies', theMovie.id);
    console.log(newDescription,'theNewDesc')
    if (newDescription==='' || newDescription===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        desc: newDescription
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  let submitNewDate= async (newYear)=>{
    const theRef = doc(db, 'movies', theMovie.id);
    console.log(newYear,'theNewDesc')
    if (newYear==='' || newYear===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        year: newYear
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  let submitNewYoutubeLink= async (newYoutubeLink)=>{
    const theRef = doc(db, 'movies', theMovie.id);
    console.log(newYoutubeLink,'theNewDesc')
    if (newYoutubeLink==='' || newYoutubeLink===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        trailer: newYoutubeLink
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  let submitNewRating= async (newRating)=>{
    const theRef = doc(db, 'movies', theMovie.id);
    console.log(newRating,'theNewDesc')
    if (newRating==='' || newRating===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        rating: newRating
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  let editBlock=(whereEdit)=>{
    console.log('enteredEditBlock')
    if (whereEdit==='keywords') {
           return (<div>
            <Multiselect
            isObject={false}
            selectedValues={[]}
            /*  onKeyPressFn={(e) => console.log(e.target.value)} */
            // onRemove={(e) => setContentIndex(e)}
            // onSearch={(e) => console.log(e.target.value)}
            // onSelect={(e) => setContentIndex(e)}
            options={keywordsList}
          />
          </div>)
    } else if (whereEdit==='description'){
      return (
      <div>
      <div>
          Description: {theMovie.desc}
        </div>
          <input type='text' onChange={(e)=>{setNewDescription(e.target.value)}} placeholder='New Description' />
          <button onClick={(e)=>{submitNewDesc(newDescription)}}>Submit New Description</button>
      </div>)
    } else if (whereEdit==='directors'){
      console.log('enteredDirectors')

      return (<div>
        <input
            type="text"
            className={`${
              director.length < 1 ? 'track-input' : 'track-input1'
            }`}
            onChange={(e) => (e.target.value)}
            // value={newOption}
            // ref={optionsInput}
          />
          <button>
            <AiOutlinePlus />
          </button>
      </div>)
    } else if (whereEdit==='image'){
      console.log('enteredImage')

      return (<div>
        <div>{theMovie.movieImgUrl}</div>
        <div>
        <input
                type="file"
                // onChange={handleFileChange}
                accept="image/*"
                required
                // ref={inputClear}
              />
              {progress && (
                <span style={{ color: 'red' }}>
                  progress: &nbsp;{progress}%
                </span>
              )}
        </div>
      </div>)
    }else if (whereEdit==='cast'){
      console.log('enteredCast')
      return (<div>
        <input
            type="text"
            className={`${cast.length < 1 ? 'track-input' : 'track-input1'}`}
            onChange={(e) => (e.target.value)}
            // value={newCast}
            // ref={castInput}
          />
          <button>
            <AiOutlinePlus />
          </button>
      </div>)
    } else if (whereEdit==='genre'){
      console.log('enteredgenre')

      return (
      <div>
      <Multiselect
            isObject={false}
            // onRemove={(e) => setGenre(e)}
            // onSelect={(e) => setGenre(e)}
            options={genreList}
          />
      </div>)
    } else if (whereEdit==='rating'){
      return (
      <div>
      <div>
          Rating: {theMovie.rating}
        </div>
        <form>
          <input type="number"
            min="1"
            max="10"
            step="any" onChange={(e)=>{setNewRating(e.target.value)}} placeholder='New Rating' />
          <button onClick={(e)=>{submitNewRating(newRating)}}>Submit New Rating</button>
        </form>
      </div>)
    } else if (whereEdit==='year'){
      return (
      <div>
      <div>
          Year: {theMovie.year}
        </div>
          <input
              type="date"
              onChange={(e) => setNewYear(e.target.value)}
          />
          <button onClick={(e)=>{submitNewDate(newYear)}}>Submit New Year</button>
      </div>)
    } else if (whereEdit==='youtube'){
      return (
      <div>
        <div>
          Youtube: {theMovie.trailer}
        </div>
          <input type='text' onChange={(e)=>{setNewYoutubeLink(e.target.value)}} placeholder='New Link' />
          <button onClick={(e)=>{submitNewYoutubeLink(newYoutubeLink)}}>Submit New Link</button>
      </div>)
    } else if(whereEdit==='title'){
      return (
        <div>
          <div>
            Title: {theMovie.title}
          </div>
            <input type='text' onChange={(e)=>{setNewTitle(e.target.value)}} placeholder='New Title' />
            <button onClick={(e)=>{submitNewTitle(newTitle)}}>Submit New Title</button>
        </div>
      )
      
    } else{
      console.log('enteredNull')
      return (<div>pick and edit point</div>)
    }
  }
  
  

  return (
    <div className='filmEditPage'>
      <div className='editWhere'>
        <label htmlFor='editTypes'>Where do you want to make the edit?</label>
          <select name='editTypes' onChange={(e)=>setWhereEdit(e.target.value)} >
            <option value='title'>Title</option>
            <option value='description'>Description</option>
            <option value='directors'>Directors</option>
            <option value='cast'>Cast</option>
            <option value='image'>Image</option>
            <option value='genre'>Genre</option>
            <option value='rating'>Rating</option>
            <option value='year'>Year</option>
            <option value='youtube'>YouTube Link</option>
            <option value='keywords'>Keywords</option>
          </select>
      </div>
      {
        whereEdit !== null ?
        (editBlock(whereEdit)) : <div>Please Choose Edit Point</div>
      }
    </div>
  )
}

export default FilmEdits