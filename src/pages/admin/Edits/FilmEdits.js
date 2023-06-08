import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../admin.css'
import Multiselect from 'multiselect-react-dropdown';
import { genreList, keywordsList } from '../../../data/datalinks';
import { AiOutlinePlus } from 'react-icons/ai';

import { db, storage } from '../../../components/firebase/config';
import { updateDoc, doc, setDoc } from 'firebase/firestore';

import { getDownloadURL, ref } from '@firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';

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
  const [dirOption, setDirOption]=useState('');
  const [castOption, setCastOption]=useState('')
  const [newGenre, setNewGenre]=useState([])
  const [newKeywords, setNewKeywords]=useState([])

console.log(director,'direcctorList')
console.log(dirOption,'option')

  let { state }=useLocation();
  let theMovie=state.filmDetails
  console.log(theMovie,'thisMovie')

  let submitNewTitle= async (newTitle)=>{
    const theRef = doc(db, 'movies', theMovie.id);
    console.log(theRef,'theRef')
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

  let submitNewGenre= async (newGenre)=>{
    const theRef = doc(db, 'movies', theMovie.id);
    console.log(newGenre,'theNewGenre')
    if (newGenre.length===0 || newGenre===undefined) {
      alert('Please input a new Genre')
      return;
    }
    try {
      await updateDoc(theRef, {
        genre: newGenre
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  let submitNewKeywords= async (newKeywords)=>{
    const theRef = doc(db, 'movies', theMovie.id);
    console.log(newKeywords,'theNewGenre')
    if (newKeywords.length===0 || newKeywords===undefined) {
      alert('Please input a new Keyword')
      return;
    }
    try {
      await updateDoc(theRef, {
        keywords: newKeywords
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileChange = async (e) => {
    let selected = e.target.files[0];
    console.log(selected);

    if (selected) {
      if (!selected.type.includes('image')) {
        alert('Selected file size must be an image');
        return;
      }

      if (selected.size > 9999999) {
        alert('Selected file size must be less than 1Mb');
        return;
      }

      const metadata = {
        contentType: selected.type,
        customMetadata: {
          title: theMovie.title,
          description: theMovie.desc,
          year: theMovie.year,
        },
      };

      const storageRef = ref(storage, `/movies/${theMovie.title}/${selected.name}`);
      const storageUpload = uploadBytesResumable(
        storageRef,
        selected,
        metadata
      );

      storageUpload.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
          console.log('upload is' + progress + '% done');
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(storageUpload.snapshot.ref).then(async (url) => {
            const theRef = doc(db, 'movies', theMovie.id);
            try {
              await updateDoc(theRef, {
                movieImgUrl: url
              });
              alert('Updated')
              setWhereEdit(null)
            } catch (error) {
              console.log(error);
            }
          });
        }
      );
    }

    return;
  };


  let submitNewCast= async (cast)=>{
    const theRef = doc(db, 'movies', theMovie.id);
    console.log(cast,'theNewCast')
    if (cast==='' || cast===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        cast: cast
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  let submitNewDir= async (director)=>{
    const theRef = doc(db, 'movies', theMovie.id);
    console.log(director,'theNewDirectorList')
    if (director==='' || director===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        director: director
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
           <div>
            <Multiselect
            isObject={false}
            onRemove={(e) => {setNewKeywords(e); console.log(newKeywords)}}
            onSelect={(e) => {setNewKeywords(e); console.log(newKeywords)}}
            options={keywordsList}
          />
          </div>
          <div>
            {
              newKeywords.length>0 ?
              (<button onClick={(e)=>{submitNewKeywords(newKeywords)}}>Submit New Keywords</button>) : <label>Add a Keyword</label>
            }
          </div>
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
      return (<div>
      <div>
          <input
                type="text"        
                onChange={(e) => setDirOption(e.target.value)}
              />
          <button onClick={(e)=>{
            console.log(dirOption)
            setDirector(
            [...director, dirOption]
          )}}>
            <AiOutlinePlus />
          </button>
      </div>
        <div>
          {
            director.length>0 ?
            (
              director.map((dirValue)=> { return (
                <div>
                  <label>{dirValue}</label>
                </div>
                )})
            ) : <label>Add a name</label>
          }
        </div>
        <div>
          {
            director.length>0 ?
            (
              <button onClick={(e)=>{submitNewDir(director)}}>Submit New Directors</button>
            ) : <label></label>
          }
        </div>
      </div>)
    } else if (whereEdit==='image'){
      console.log('enteredImage')

      return (<div>
        <div><img src={theMovie.movieImgUrl} alt='' /></div>
        <div>
        <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
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
      <div>
        <input
            type="text"
            onChange={(e) => setCastOption(e.target.value)}
          />
          <button onClick={(e)=>{
            console.log(castOption)
            setCast(
            [...cast, castOption]
          )}}>
            <AiOutlinePlus />
          </button>
          </div>
          <div>
          {
            cast.length>0 ?
            (
              cast.map((castValue)=> { return (
                <div>
                  <label>{castValue}</label>
                </div>
                )})
            ) : <label>Add a name</label>
          }
        </div>
        <div>
          {
            cast.length>0 ?
            (
              <button onClick={(e)=>{submitNewCast(cast)}}>Submit New Directors</button>
            ) : <label></label>
          }
        </div>
      </div>
      )
    } else if (whereEdit==='genre'){
      console.log('enteredgenre')
      return (
      <div>
      <div>
        <Multiselect
            isObject={false}
            onRemove={(e) => {setNewGenre(e); console.log(newGenre)}}
            onSelect={(e) => {setNewGenre(e); console.log(newGenre)}}
            options={genreList}
          />
      </div>
      <div>
        {
          newGenre.length>0 ?
          (<button onClick={(e)=>{submitNewGenre(newGenre)}}>Submit New Genre List</button>) : <label>Add a Genre</label>
        }
      </div>
      
      </div>)
    } else if (whereEdit==='rating'){
      return (
      <div>
      <div>
          Rating: {theMovie.rating}
        </div>
          <input type="number"
            min="1"
            max="10"
            step="any" onChange={(e)=>{setNewRating(e.target.value)}} placeholder='New Rating' />
          <button onClick={(e)=>{submitNewRating(newRating)}}>Submit New Rating</button>
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
          <option value={null}>Choose...</option>
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