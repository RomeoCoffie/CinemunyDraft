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

function ShowQuestions() {
    const { documents: thesequestions } = useCollection('questions');
    console.log(thesequestions,'thequestions')
  return (
    <div className='movieListPage'>
        {
          thesequestions ?
          thesequestions.map((question)=>{
            let ref = doc(db, 'questions', question.id);
                const handleDelete = async ()=>{
                    try {
                     await await deleteDoc(ref); 
                    } catch (err){
                        console.log(err)
                    }
                }
                let backImageStyle = {
                    height: '10em',
                    width: '2em',
                };
                return (
                <div key={question.id} className='MovieListTab'>
                    <div style={backImageStyle}>
                    </div>
                    <div className='movieListDetails'>
                        <div><label>Question: </label><span>{question.question}</span></div>
                        
                        <button className='itemDeleteButton' onClick={handleDelete}>Delete</button>

                    </div>
                </div>
            )}) : <h2>Loading...</h2>
        }
    </div>
  )
}

export default ShowQuestions