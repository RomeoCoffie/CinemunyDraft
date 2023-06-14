import React, { useState } from 'react'
import { useCollection } from '../../../Hooks/useCollection';
import { Link } from 'react-router-dom';

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

function ShowGroups() {
  const { documents: data } = useCollection('Groups', ['createdAt', 'desc']); //get groups
  console.log(data,'thegroups')
  const [currentPage, setCurrentPage]=useState(1)
    const [groupsPerPage, setGroupsPerPage]=useState(20)
    const  indexOfLastGroup= currentPage * groupsPerPage
    const indexOfFirstGroup= indexOfLastGroup - groupsPerPage
    const currentGroups=data.slice(indexOfFirstGroup, indexOfLastGroup)
    
    const pageNumbers=[]
    for (let i=1; i <= Math.ceil(data.length / groupsPerPage); i++){
        pageNumbers.push(i)
    }

    const paginate=(number)=> setCurrentPage(number);
  return (
    <div className='movieListPage'>
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