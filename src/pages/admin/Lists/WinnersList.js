import React, { useState } from 'react'
import { useCollection } from '../../../Hooks/useCollection';
import '../admin.css'


function WinnersList() {
    const { documents: winners } = useCollection('winners', ['createdAt', 'desc']);
    console.log(winners,'theWin')
    const [currentPage, setCurrentPage]=useState(1)
    const [winnersPerPage, setWinnersPerPage]=useState(20)
    const  indexOfLastWinner= currentPage * winnersPerPage
    const indexOfFirstWinner= indexOfLastWinner - winnersPerPage
    const currentWinners=winners.slice(indexOfFirstWinner, indexOfLastWinner)

    const pageNumbers=[]
    for (let i=1; i <= Math.ceil(winners.length / winnersPerPage); i++){
        pageNumbers.push(i)
    }
    const paginate=(number)=> setCurrentPage(number);
  return (
    <div className='winListPage'>
        {
            currentWinners.length>0 ?
            (
                currentWinners.map((winner)=>(
                <div key={winner.user} className='winnerslisttab'>
                    <div><label>Email: </label><span>{winner.email}</span></div>
                    <div><label>Phone Number: </label><span>{winner.value}</span></div>
                    <hr/>
                </div>
                ))
            ) : <label>Loading...</label>
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

export default WinnersList