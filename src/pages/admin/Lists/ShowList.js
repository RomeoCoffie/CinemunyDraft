import React from 'react'
import { useCollection } from '../../../Hooks/useCollection';
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

function ShowList() {
    const { documents: shows } = useCollection('shows', ['createdAt', 'desc']);
    console.log(shows,'theshows')
  return (
    <div className='movieListPage'>
        {
            shows ?
            shows.map((show)=>{
                let ref = doc(db, 'shows', show.id);
                const handleDelete = async ()=>{
                    try {
                     await await deleteDoc(ref); 
                    } catch (err){
                        console.log(err)
                    }
                }
                let backImageStyle = {
                    backgroundImage: 'url(' + show.movieImgUrl + ')',
                    height: '10em',
                    width: '9em',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    backgroundSize: 'cover'
                };
                return (
                <div key={show.id} className='MovieListTab'>
                    <div style={backImageStyle}>
                    </div>
                    <div className='movieListDetails'>
                    <div>
                    <div><label>Title: </label><span>{show.title}</span></div>
                        <div><label>Rating: </label><span>{show.rating}</span></div>
                        <div><label>Year</label><span>{show.year}</span></div>
                    </div>
                        
                        <button className='itemDeleteButton' onClick={handleDelete}>Delete</button>

                    </div>
                </div>
            )}) : <h2>Loading...</h2>
        }
    </div>
  )
}

export default ShowList