import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../admin.css'

import { db, storage } from '../../../components/firebase/config';
import { updateDoc, doc, setDoc } from 'firebase/firestore';
import { useUpdateDoc } from '../../../Hooks/useUpdateDoc';
import { getDownloadURL, ref } from '@firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';

function GroupEdits() {
  const [whereEdit, setWhereEdit]=useState(null)
  const [newName, setNewName]=useState('');
  const [newLink, setNewLink]=useState('');
  const [newDescription, setNewDescription]=useState('');
  const [progress, setProgress] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [newPlatform, setNewPlatform] = useState([]);
  const [newNumber, setNewNumber]=useState('');


  let { state }=useLocation();
  let theGroup=state.groupDetails
  console.log(theGroup,'thisMovie')

  let submitNewName= async (newName)=>{
    const theRef = doc(db, 'Groups', theGroup.id);
    console.log(theRef,'theRef')
    console.log(newName,'theNewTitle')
    if (newName==='' || newName===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        grpName: newName
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  let submitNewCategory= async (newCategory)=>{
    const theRef = doc(db, 'Groups', theGroup.id);
    console.log(theRef,'theRef')
    console.log(newCategory,'theNewTitle')
    if (newCategory==='' || newCategory===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        category: newCategory
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  let submitNewDesc= async (newDescription)=>{
    const theRef = doc(db, 'Groups', theGroup.id);
    console.log(theRef,'theRef')
    console.log(newDescription,'theNewTitle')
    if (newDescription==='' || newDescription===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        about: newDescription
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  let submitNewLink= async (newLink)=>{
    const theRef = doc(db, 'Groups', theGroup.id);
    console.log(theRef,'theRef')
    console.log(newLink,'theNewTitle')
    if (newLink==='' || newLink===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        groupLink: newLink
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  let submitNewPlatform= async (newPlatform)=>{
    const theRef = doc(db, 'Groups', theGroup.id);
    console.log(theRef,'theRef')
    console.log(newPlatform,'theNewTitle')
    if (newPlatform==='' || newPlatform===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        platform: newPlatform
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  let submitNewNumber= async (newNumber)=>{
    const theRef = doc(db, 'Groups', theGroup.id);
    console.log(theRef,'theRef')
    console.log(newNumber,'theNewTitle')
    if (newNumber==='' || newNumber===undefined) {
      alert('Please input a new Title')
      return;
    }
    try {
      await updateDoc(theRef, {
        ppleOnline: newNumber
      });
      alert('Updated')
      setWhereEdit(null)
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileChange = async (e) => {
    let selected = e.target.files[0];
    console.log(selected);

    if (selected) {
      if (!selected.type.includes('image')) {
        alert('Selected file size must be an image');
        return;
      }

      if (selected.size > 9999999) {
        alert('Selected file size must be less than 1Mb');
        return;
      }

      const metadata = {
        contentType: selected.type,
        customMetadata: {
          name: theGroup.name,
          description: theGroup.desc,
        },
      };

      const storageRef = ref(storage, `/movies/${theGroup.name}/${selected.name}`);
      const storageUpload = uploadBytesResumable(
        storageRef,
        selected,
        metadata
      );

      storageUpload.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
          console.log('upload is' + progress + '% done');
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(storageUpload.snapshot.ref).then(async (url) => {
            const theRef = doc(db, 'Groups', theGroup.id);
            try {
              await updateDoc(theRef, {
                groupImgUrl: url
              });
              alert('Updated')
              setWhereEdit(null)
            } catch (error) {
              console.log(error);
            }
          });
        }
      );
    }

    return;
  };


  let editBlock=(whereEdit)=>{
    console.log('enteredEditBlock')
    if (whereEdit==='category') {
           return (<div>
           <div>
          Category: {theGroup.category}
        </div>
           <div>
           <label htmlFor='catType'>New Group Category</label>
          <select name='catType' onChange={(e)=>setNewCategory(e.target.value)} >
          <option value={undefined}>Choose...</option>
            <option value='movies'>Movies</option>
            <option value='relationships'>Relationships</option>
            <option value='business'>Business</option>
            <option value='travel'>Travel</option>
            <option value='fashion'>Fashion</option>
            <option value='music'>Music</option>
            <option value='sports'>Sports</option>
            <option value='adult'>Adult</option>
          </select>
          </div>
          <div>
            {
              newCategory ?
              (<button onClick={(e)=>{submitNewCategory(newCategory)}}>Submit New Category</button>) : <label>Add a Keyword</label>
            }
          </div>
          </div>)
    } else if (whereEdit==='about'){
      return (
      <div>
      <div>
          About: {theGroup.about}
        </div>
          <input type='text' onChange={(e)=>{setNewDescription(e.target.value)}} placeholder='New Description' />
          <button onClick={(e)=>{submitNewDesc(newDescription)}}>Submit New Description</button>
      </div>)
    }else if (whereEdit==='members'){
      return (
      <div>
      <div>
          ppleOnline: {theGroup.ppleOnline}
        </div>
          <input type='text' onChange={(e)=>{setNewNumber(e.target.value)}} placeholder='New Description' />
          <button onClick={(e)=>{submitNewNumber(newNumber)}}>Submit New Description</button>
      </div>)
    }else if (whereEdit==='platform'){
      return (
      <div>
        <div>
          Platform: {theGroup.platform}
        </div>
        <div>
           <div>
           <label htmlFor='platformType'>New Group Platform</label>
          <select name='platformType' onChange={(e)=>setNewPlatform(e.target.value)} >
          <option value={undefined}>Choose...</option>
            <option value='whatsapp'>WhatsApp</option>
            <option value='telegram'>Telegram</option>
          </select>
          </div>
          <div>
            {
              newCategory ?
              (<button onClick={(e)=>{submitNewPlatform(newPlatform)}}>Submit New Category</button>) : <label>Add a Keyword</label>
            }
          </div>
          </div>
      </div>)
    } else if (whereEdit==='image'){
      console.log('enteredImage')

      return (<div>
        <div><img src={theGroup.groupImgUrl} alt='' /></div>
        <div>
        <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              {progress && (
                <span style={{ color: 'red' }}>
                  progress: &nbsp;{progress}%
                </span>
              )}
        </div>
      </div>)
    } else if (whereEdit==='link'){
      return (
      <div>
        <div>
          Youtube: {theGroup.groupLink}
        </div>
          <input type='text' onChange={(e)=>{setNewLink(e.target.value)}} placeholder='New Link' />
          <button onClick={(e)=>{submitNewLink(newLink)}}>Submit New Link</button>
      </div>)
    } else if(whereEdit==='name'){
      return (
        <div>
          <div>
            Title: {theGroup.grpName}
          </div>
            <input type='text' onChange={(e)=>{setNewName(e.target.value)}} placeholder='New Title' />
            <button onClick={(e)=>{submitNewName(newName)}}>Submit New Title</button>
        </div>
      )
      
    } else{
      console.log('enteredNull')
      return (<div>pick and edit point</div>)
    }
  }
  return (
    <div className='filmEditPage'>
      <div className='editWhere'>
        <label htmlFor='editTypes'>Where do you want to make the edit?</label>
          <select name='editTypes' onChange={(e)=>setWhereEdit(e.target.value)} >
          <option value={null}>Choose...</option>
            <option value='name'>Name</option>
            <option value='about'>About</option>
            <option value='category'>Category</option>
            <option value='members'>Number of Members</option>
            <option value='platform'>Platform</option>
            <option value='link'>Link</option>
            <option value='image'>Image</option>
          </select>
      </div>
      {
        whereEdit !== null ?
        (editBlock(whereEdit)) : <div>Please Choose Edit Point</div>
      }
    </div>
  )
}

export default GroupEdits