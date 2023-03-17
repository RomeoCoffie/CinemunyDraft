import React from 'react';
import { useState } from 'react';

import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js';
import {
  deleteDoc,
  updateDoc,
  deleteField,
  doc,
  arrayRemove,
  arrayUnion,
  Timestamp,
  FieldValue,
} from 'firebase/firestore';
//import { useFiresotre } from '../../Hooks/useFirestore';
import { db } from '../../components/firebase/config';
import { useCollection } from '../../Hooks/useCollection';
import { useNavigate } from 'react-router-dom';

import './comments.css';

export default function Comments({
  id,
  user,
  setShowComment,
  showComment,
  comments,
}) {
  const [edittComment, setEdittComment] = useState(null);
  const [isEditing, setIsEditting] = useState(false);
  const [theComment, setTheComment] = useState(null);
  const person = user.uid;
  const { documents: content } = useCollection('Posts');
  // const { deleteDocument, response } = useFiresotre('Posts');
  const navigate = useNavigate();

  const deleteComment = async (id, commId) => {
    //delete the comment from memory
    if (user) {
      const ref = doc(db, 'Posts', id);
      const commentNotDeleted = comments.filter((comment) => {
        return comment.commId != commId;
      });
      console.log(commentNotDeleted);

      //update firebase

      try {
        await updateDoc(ref, {
          comments: commentNotDeleted,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate('/login');
    }
  };

  //ing comments
  const editComment = () => {
    if (user) {
      const editRef = doc(db, 'Posts', id);

      const commentToEdit = {
        createdAt: Timestamp.fromDate(new Date()),
        content: edittComment,
        user: user.uid,
        display: user.displayName,
        img: user.photoURL,
        commId: theComment.commId,
      };

      try {
        updateDoc(editRef, {
          comments: arrayUnion(commentToEdit),
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
      <div>
        {user && isEditing && (
          <div className="comment-container">
            <textarea
              required
              value={edittComment}
              onChange={(e) => setEdittComment(e.target.value)}
            ></textarea>
            <button onClick={editComment} className="addbtn">
              Edit
            </button>
          </div>
        )}
        <ul>
          {comments.length > 0 &&
            comments.map((comment) => {
              const { content, commId, display, user, createdAt } = comment;

              return (
                <div className="comment-container">
                  <li key={commId}>
                    <div className="comment">
                      <p className="dispname">{display}</p>
                      <p>{content}</p>
                      {user && person === user && (
                        <button
                          onClick={() => deleteComment(id, commId)}
                          className="del-comm"
                        >
                          X
                        </button>
                      )}
                      {user && person === user && (
                        <button
                          onClick={() => {
                            setIsEditting(true);
                            setEdittComment(content);
                            setTheComment(comment);
                            deleteComment(id, commId);
                          }}
                          className="edit-comm"
                        >
                          edit
                        </button>
                      )}
                    </div>
                    <div className="date-comment">
                      <p>
                        {formatDistanceToNow(createdAt.toDate(), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </li>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
