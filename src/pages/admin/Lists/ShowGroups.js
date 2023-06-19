import React, { useState, useEffect } from 'react'
import { useCollection } from '../../../Hooks/useCollection';
import { Link } from 'react-router-dom';
import { groupCategories } from '../../../data/datalinks';


import '../admin.css'

import { db } from '../../../components/firebase/config';
import {
  doc,
  deleteDoc,
} from 'firebase/firestore';

function ShowGroups() {
  const { documents: data } = useCollection('Groups', ['createdAt', 'desc']); //get groups
  console.log(data,'thegroups')
  const [currentPage, setCurrentPage]=useState(1)
    const [groupsPerPage, setGroupsPerPage]=useState(20)
    const [showResults, setShowResults]=useState(data)
    const  indexOfLastGroup= currentPage * groupsPerPage
    const indexOfFirstGroup= indexOfLastGroup - groupsPerPage
    const currentGroups=showResults.slice(indexOfFirstGroup, indexOfLastGroup)
    useEffect(()=>{
        setShowResults(data)
    }, [data])
    
    const pageNumbers=[]
    for (let i=1; i <= Math.ceil(data.length / groupsPerPage); i++){
        pageNumbers.push(i)
    }

    const paginate=(number)=> setCurrentPage(number);
    const getFilteredResults = (e) => {
        let results = data.filter(function(group) {
          return (
              group.category===e.target.value
            )
        });
        console.log(results,'taResult')
        setShowResults(results);
    };
  return (
    <div className='movieListPage'>
    <div>
        <label>Filter by Category:</label>
            <select name='keywordFilterOptions' onChange={(e)=>
            {
                console.log(e.target.value, 'twist')
                if(e.target.value===''){
                    setShowResults(data)
                }else{
                    getFilteredResults(e)
                }
            }
            }>
                {
                    groupCategories.length > 0 ? 
                    groupCategories.map((keyword)=>{
                    return (
                    <option value={keyword} >{keyword}</option>
                  )}) : <label></label>
                }
            </select>
        </div>
        {
          currentGroups ?
          currentGroups.map((group)=>{
            let ref = doc(db, 'Groups', group.id);
                const handleDelete = async ()=>{
                    try {
                     await await deleteDoc(ref); 
                    } catch (err){
                        console.log(err)
                    }
                }
                let backImageStyle = {
                    backgroundImage: 'url(' + group.groupImgUrl + ')',
                    height: '10em',
                    width: '9em',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    backgroundSize: 'cover'
                };
                return (
                <div key={group.id} className='MovieListTab'>
                    <div style={backImageStyle}>
                    </div>
                    <div className='movieListDetails'>
                    <div>
                    <div><label>Name: </label><span>{group.grpName}</span></div>
                        <div><label>Cat.: </label><span>{group.category}</span></div>
                        <div><label>Platform</label><span>{group.platform}</span></div>
                    </div>
                        
                    <div className='itemDeleteButtonDiv'>
                            <button className='itemDeleteButton' onClick={handleDelete}>Delete</button>
                            <Link to={`3/:${group.id}`} state={{ groupDetails: group }} className='itemDeleteButton'>Edit</Link>
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

export default ShowGroups