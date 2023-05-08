import React, { Fragment, useState } from 'react';
import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js';
import {
  //deleteDoc,
  updateDoc,
  //deleteField,
  doc,
  //arrayRemove,
  //arrayUnion,
  //Timestamp,
  //FieldValue,
} from 'firebase/firestore';
//import { useAddDocs } from '../../Hooks/useAddDocs';
//import { useFiresotre } from '../../Hooks/useFirestore';
import { db } from '../../components/firebase/config';
//import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
//import { useCollection } from '../../Hooks/useCollection';
import { useFiresotre } from '../../Hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
//MUI Stuff
import { Grid, Typography, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import './comments.css';

export default function Comments({
  id,
  user,
  /* setShowComment,
  showComment,
  comments, */
  theComments,
}) {
  const [edittComment, setEdittComment] = useState(null);
  const [isEditing, setIsEditting] = useState(false);
  const [theComment, setTheComment] = useState(null);
  //const [theUser, setTheUser] = useState(null); //stores the user who made the comment
  // const [theCommenter, setTheCommenter] = useState(); //stores the id of the commenter
  const { deleteDocument } = useFiresotre('comments');
  //const { documents: users } = useCollection('users'); //get users snapshot from firebase
  const url =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
  //const currentUser = useRef();

  const person = user.uid;
  // const { addDocument, response } = useAddDocs('comments');

  const navigate = useNavigate();

  //editing comments
  const editComment = (theComment) => {
    if (user) {
      const editRef = doc(db, 'comments', theComment);

      try {
        updateDoc(editRef, {
          content: edittComment,
        });
      } catch (error) {
        console.log(error);
      }
      setIsEditting(false);
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      {user && isEditing && (
        <div>
          {/* EditComment Function is Called here, intial edit button sets the parameters to be edited */}
          <textarea
            required
            value={edittComment}
            onChange={(e) => setEdittComment(e.target.value)}
          ></textarea>
          <button onClick={() => editComment(theComment)} className="addbtn">
            Edit
          </button>
        </div>
      )}
      {theComments &&
        theComments.map((comment) => {
          const {
            id,
            content,
            // postId,
            display,
            photoURL,
            createdAt,
            user,
          } = comment;

          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid item sm={2} component={Link} sx={{ marginLeft: 0 }}>
                  {photoURL && (
                    <div>
                      <img
                        src={photoURL}
                        alt={display}
                        className="comm-img"
                        onClick={() => navigate(`/users/${user}`)}
                      />
                    </div>
                  )}
                  {!photoURL && (
                    <div>
                      <img
                        src={url}
                        alt={display}
                        className="comm-img"
                        onClick={() => navigate(`/users/${user}`)}
                      />
                    </div>
                  )}

                  <div className="comment-content">
                    {user && person === user && (
                      <IconButton
                        onClick={() => deleteDocument(id)}
                        aria-label="delcomnt"
                      >
                        <DeleteIcon sx={{ fontSize: 15, color: 'brown' }} />
                      </IconButton>
                    )}
                    {/* {user && person === user && (
                      <button
                        onClick={() => {
                          window.scrollTo(0, 0);
                          setIsEditting(true);
                          setEdittComment(content);
                          setTheComment(id);
                        }}
                        className="edit-comm"
                      >
                        edit
                      </button>
                    )} */}
                  </div>
                </Grid>
                <Grid>
                  <div key={id}>
                    <a href={`/users/${user}`} style={{ color: 'blue' }}>
                      {display}
                    </a>

                    <Typography variant="body2" color="textSecondary">
                      {formatDistanceToNow(createdAt.toDate(), {
                        addSuffix: true,
                      })}
                    </Typography>
                    <Typography variant="body1">{content}</Typography>
                  </div>
                </Grid>
              </Grid>
              <hr className="horizon" />
            </Fragment>
          );
        })}
    </div>
  );
}
