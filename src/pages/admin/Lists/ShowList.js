import React, { useState } from 'react'
import { useCollection } from '../../../Hooks/useCollection';
import { db } from '../../../components/firebase/config';
import { useFiresotre } from '../../../Hooks/useFirestore';
import { storage } from '../../../components/firebase/config';
import { Link } from 'react-router-dom';
import '../admin.css'

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
    const [currentPage, setCurrentPage]=useState(1)
    const [showsPerPage, setShowsPerPage]=useState(20)
    const  indexOfLastShow= currentPage * showsPerPage
    const indexOfFirstShow= indexOfLastShow - showsPerPage
    const currentShows=shows.slice(indexOfFirstShow, indexOfLastShow)
    
    const pageNumbers=[]
    for (let i=1; i <= Math.ceil(shows.length / showsPerPage); i++){
        pageNumbers.push(i)
    }

    const paginate=(number)=> setCurrentPage(number);
  return (
    <div className='movieListPage'>
        {
            currentShows ?
            currentShows.map((show)=>{
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
                        <div className='itemDeleteButtonDiv'>
                            <button className='itemDeleteButton' onClick={handleDelete}>Delete</button>
                            <Link to={`2/:${show.id}`} state={{ showDetails: show }} className='itemDeleteButton'>Edit</Link>
                        </div>


                    </div>
                </div>
            )}) : <h2>Loading...</h2>
        }
        <ul className='pagination'>
            {
                pageNumbers ?
                pageNumbers.map(number=>(
                    <li className='pageNum'>
                        <a href="#" onClick={()=>paginate(number)}>
                            {number}
                        </a>
                    </li>
                )) : <label>1</label>
            }
        </ul>
    </div>
  )
}

export default ShowList