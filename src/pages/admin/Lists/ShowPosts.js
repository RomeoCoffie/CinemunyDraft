import React, { useContext } from 'react';

import { TkimoviesContext } from '../../../context/tkimovies/tkimovies';

import { db } from '../../../components/firebase/config';
import { useCollection } from '../../../Hooks/useCollection';
import { useFiresotre } from '../../../Hooks/useFirestore';
import { storage } from '../../../components/firebase/config';
import {
  Timestamp,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

function ShowPosts() {
  const { documents: news } = useCollection('Posts', ['createdAt', 'desc']);
  console.log(news, 'thenews')
  return (
    <div className='movieListPage'>
        {
          news ?
          news.map((item) => {
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
    </div>
  )
}

export default ShowPosts