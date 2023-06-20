import React from 'react'
import { useCollection } from '../../../Hooks/useCollection';
import '../admin.css'


function WinnersList() {
    const { documents: winners } = useCollection('winners', ['createdAt', 'desc']);
    console.log(winners,'theWin')
  return (
    <div className='winListPage'>
        {
            winners.length>0 ?
            (
                winners.map((winner)=>(
                <div key={winner.user} className='winnerslisttab'>
                    <div><label>Email: </label><span>{winner.email}</span></div>
                    <div><label>Phone Number: </label><span>{winner.value}</span></div>
                    <hr/>
                </div>
                ))
            ) : <label>Loading...</label>
        }
    </div>
  )
}

export default WinnersList