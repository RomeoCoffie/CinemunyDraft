import React, { useState }  from 'react'
import { Link } from 'react-router-dom';

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
    const [showTitleEdit, setShowTitleEdit]=useState(false)
    const [movieTitle, setMovieTitle]=useState('')
    const [currentPage, setCurrentPage]=useState(1)
    const [moviesPerPage, setMoviesPerPage]=useState(20)
    const  indexOfLastMovie= currentPage * moviesPerPage
    const indexOfFirstMovie= indexOfLastMovie - moviesPerPage
    const currentMovies=movies.slice(indexOfFirstMovie, indexOfLastMovie)
    
    const pageNumbers=[]
    for (let i=1; i <= Math.ceil(movies.length / moviesPerPage); i++){
        pageNumbers.push(i)
    }

    const paginate=(number)=> setCurrentPage(number);

    const movieTitleGoEdit=()=>setShowTitleEdit(true)
    const editProfileBio=()=>{

    }

    console.log(movies,'these are the movies')
  return (
    <div className='movieListPage'>
        {
            currentMovies ?
            currentMovies.map((movie)=>{
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
                    <div><label>Title: </label>
                    {
                        showTitleEdit === false ?
                        (
                            movie.title  ? 
                            (
                                <div>
                                <span>{movie.title.substring(0,20)}</span>
                                {/* <button onClick={movieTitleGoEdit} style={{ float: 'right', backgroundColor: 'rgb(218, 248, 255)', padding: '2px', color: 'rgb(63, 35, 2)', border: '1px solid gainsboro' }}>Edit</button> */}
                                </div>
                            ) : <span>Loading</span>
                            ) : (<div>
                                <input type='text' onChange={(e)=>setMovieTitle(e.target.value)}/>
                                <button className='profileBioGoEditButton' onClick={editProfileBio} style={{ float: 'right', backgroundColor: 'rgb(218, 248, 255)', padding: '2px', color: 'rgb(63, 35, 2)', border: '1px solid gainsboro' }} >Save</button>
                                </div>)
                    }
                    </div>
                        <div><label>Genre:</label><span>{movie.genre.map(g=>g.substring(0,3)+',')}</span></div>
                        <div><label>Rating:</label><span>{movie.rating}</span></div>
                    </div>
                    <div className='itemDeleteButtonDiv'>
                            <button className='itemDeleteButton' onClick={handleDelete}>Delete</button>
                            <Link to={`1/:${movie.id}`} state={{ filmDetails: movie }} className='itemDeleteButton'>Edit</Link>
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

export default FilmList