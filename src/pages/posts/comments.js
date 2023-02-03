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
import { useFiresotre } from '../../Hooks/useFirestore';
import { db } from '../../components/firebase/config';
import { useCollection } from '../../Hooks/useCollection';

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
  const { deleteDocument, response } = useFiresotre('Posts');

  // console.log(response);

  //const theRef = doc(db, 'Posts', id);

  //DeleteComment

  const deleteComment = async (id, commId) => {
    const ref = doc(db, 'Posts', id);
    const commentNotDeleted = comments.filter((comment) => {
      return comment.commId != commId;
    });
    console.log(commentNotDeleted);

    try {
      await updateDoc(ref, {
        comments: commentNotDeleted,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //adding comments
  const editComment = async () => {
    const editRef = doc(db, 'Posts', id);
    /* console.log(
      theComment.commId,
      theComment.createdAt,
      theComment.displayName,
      edittComment
    ); */

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
  };

  return (
    <div>
      <div>
        {isEditing && (
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
                      {person === user && (
                        <button
                          onClick={() => deleteComment(id, commId)}
                          className="del-comm"
                        >
                          X
                        </button>
                      )}
                      {person === user && (
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
                    {/*  <div className="modify-comment">
                      {person === user && (
                        <button className="del-comm">delete</button>
                      )}
                      {person === user && (
                        <button className="edit-comm">edit</button>
                      )}
                    </div> */}
                  </li>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
