import React, { useState, useEffect, useContext } from 'react'
import { useCollection } from '../../../Hooks/useCollection';
import { db } from '../../../components/firebase/config';
import { Link } from 'react-router-dom';
import { keywordsListTv } from '../../../data/datalinks';


import '../admin.css'

import {
  doc,
  deleteDoc,
} from 'firebase/firestore';

function ShowList() {
    const { documents: shows } = useCollection('shows', ['createdAt', 'desc']);

    console.log(shows,'theshows')
    const [currentPage, setCurrentPage]=useState(1)
    const [showsPerPage, setShowsPerPage]=useState(20)
    const [keywordOption, setKeywordOption]=useState('')
    const [showResults, setShowResults]=useState(shows)

    const  indexOfLastShow= currentPage * showsPerPage
    const indexOfFirstShow= indexOfLastShow - showsPerPage
    const currentShows=showResults.slice(indexOfFirstShow, indexOfLastShow)
    
    useEffect(()=>{
        setShowResults(shows)
    }, [shows])

    const pageNumbers=[]
    for (let i=1; i <= Math.ceil(showResults.length / showsPerPage); i++){
        pageNumbers.push(i)
    }
    const paginate=(number)=> setCurrentPage(number);

    const getFilteredResults = (e) => {
        let results = shows.filter(function(show) {
          return (
              show.contentIndex.includes(e.target.value)
            )
        });
        console.log(results,'taResult')
        setShowResults(results);
    };

  return (
    <div className='movieListPage'>
    <div>
        <label>Filter by Keywords:</label>
            <select name='keywordFilterOptions' onChange={(e)=>
            {
                console.log(e.target.value, 'twist')
                if(e.target.value===''){
                    setShowResults(shows)
                }else{
                    getFilteredResults(e)
                }
            }
            }>
                {
                    keywordsListTv.length > 0 ? 
                    keywordsListTv.map((keyword)=>{
                    return (
                    <option value={keyword} >{keyword}</option>
                  )}) : <label></label>
                }
            </select>
        </div>
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