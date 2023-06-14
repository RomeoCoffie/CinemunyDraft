import React, { useState } from 'react'
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
    const [currentPage, setCurrentPage]=useState(1)
    const [questionsPerPage, setQuestionsPerPage]=useState(20)
    const  indexOfLastQuestion= currentPage * questionsPerPage
    const indexOfFirstQuestion= indexOfLastQuestion - questionsPerPage
    const currentQuestions=thesequestions.slice(indexOfFirstQuestion, indexOfLastQuestion)
    
    const pageNumbers=[]
    for (let i=1; i <= Math.ceil(thesequestions.length / questionsPerPage); i++){
        pageNumbers.push(i)
    }

    const paginate=(number)=> setCurrentPage(number);
  return (
    <div className='movieListPage'>
        {
          currentQuestions ?
          currentQuestions.map((question)=>{
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

export default ShowQuestions