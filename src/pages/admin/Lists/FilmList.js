import React from 'react'
import { useCollection } from '../../../Hooks/useCollection';
import '../admin.css'

import { db } from '../../../components/firebase/config';
import { useFiresotre } from '../../../Hooks/useFirestore';
import { storage } from '../../../components/firebase/config';
import {
  Timestamp,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';



function FilmList() {
    const { deleteDocument, theDocument } = useFiresotre('Posts');
    const { documents: movies } = useCollection('movies', ['createdAt', 'desc']);
    
    

    console.log(movies,'these are the movies')
  return (
    <div className='movieListPage'>
        {
            movies ?
            movies.map((movie)=>{
                let ref = doc(db, 'movies', movie.id);
                const handleDelete = async ()=>{
                    try {
                     await await deleteDoc(ref); 
                    } catch (err){
                        console.log(err)
                    }
                }
                let backImageStyle = {
                    backgroundImage: 'url(' + movie.movieImgUrl + ')',
                    height: '10em',
                    width: '9em',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    backgroundSize: 'cover'
                };
                return (
                <div key={movie.id} className='MovieListTab'>
                    <div style={backImageStyle}>
                    </div>
                    <div className='movieListDetails'>
                    <div>
                    <div><label>Title: </label><span>{movie.title}</span></div>
                        <div><label>Rating: </label><span>{movie.rating}</span></div>
                        <div><label>Year</label><span>{movie.year}</span></div>
                    </div>
                        
                        <button className='itemDeleteButton' onClick={handleDelete}>Delete</button>

                    </div>
                </div>
            )}) : <h2>Loading...</h2>
        }
    </div>
  )
}

export default FilmList