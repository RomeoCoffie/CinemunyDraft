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

function ShowGroups() {
  const { documents: data } = useCollection('Groups', ['createdAt', 'desc']); //get groups
  console.log(data,'thegroups')
  return (
    <div className='movieListPage'>
        {
          data ?
          data.map((group)=>{
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
                        
                        <button className='itemDeleteButton' onClick={handleDelete}>Delete</button>

                    </div>
                </div>
            )}) : <h2>Loading...</h2>
        }
    </div>
  )
}

export default ShowGroups