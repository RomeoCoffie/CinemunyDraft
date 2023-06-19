import React, { useState, useEffect } from 'react';

import '../admin.css'

import { db } from '../../../components/firebase/config';
import { useCollection } from '../../../Hooks/useCollection';
import { sources } from '../../../data/datalinks';

import {
  doc,
  deleteDoc,
} from 'firebase/firestore';

function ShowPosts() {
  const { documents: news } = useCollection('Posts', ['createdAt', 'desc']);
  console.log(news, 'thenews')
  const [currentPage, setCurrentPage]=useState(1)
    const [postsPerPage, setPostsPerPage]=useState(20)
    const [keywordOption, setKeywordOption]=useState('')
    const [showResults, setShowResults]=useState(news)
    const  indexOfLastPost= currentPage * postsPerPage
    const indexOfFirstPost= indexOfLastPost - postsPerPage
    const currentPosts=showResults.slice(indexOfFirstPost, indexOfLastPost)
    useEffect(()=>{
      setShowResults(news)
  }, [news])
    
    const pageNumbers=[]
    for (let i=1; i <= Math.ceil(showResults.length / postsPerPage); i++){
        pageNumbers.push(i)
    }

    const paginate=(number)=> setCurrentPage(number);
    const getFilteredResults = (e) => {
      let results = news.filter(function(post) {
        return (
            post.copyright===e.target.value
          )
      });
      console.log(results,'taResult')
      setShowResults(results);
  };
  return (
    <div className='movieListPage'>
    <div>
        <label>Filter by Source:</label>
            <select name='keywordFilterOptions' onChange={(e)=>
            {
                console.log(e.target.value, 'twist')
                if(e.target.value===''){
                    setShowResults(news)
                }else{
                    getFilteredResults(e)
                }
            }
            }>
                {
                    sources.length > 0 ? 
                    sources.map((keyword)=>{
                    return (
                    <option value={keyword} >{keyword}</option>
                  )}) : <label></label>
                }
            </select>
        </div>
        {
          currentPosts ?
          currentPosts.map((item) => {
            let ref = doc(db, 'posts', item.id);
                const handleDelete = async ()=>{
                    try {
                     await await deleteDoc(ref); 
                    } catch (err){
                        console.log(err)
                    }
                }
            let newsImg
            console.log(item.postImgUrl,'postimageurl')
            if(item.postImgUrl){
              newsImg=item.postImgUrl[0]
            }else if(item.postImgUrl===undefined){
              newsImg='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            }
                let backImageStyle = {
                    backgroundImage: 'url(' + newsImg + ')',
                    height: '10em',
                    borderRadius: '5px',
                    marginBottom: '5px',
                    backgroundSize: 'cover',
                    flex: '1',
                };
                return (
                <div key={item.id} className='MovieListTab'>
                      <div style={backImageStyle}>
                      </div>
                    <div className='movieListDetails'>
                        <div>
                          <div><label>Desc.: </label><span>{item.description.substring(0,70)}</span></div>
                          <div><label>Copy: </label><span>{item.copyright}</span></div>
                        </div>
                        
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

export default ShowPosts