import React from 'react';
import Comments from './comments';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './commentsModal.css';

export default function Commentsmodal({
  id,
  user,
  setShowComment,
  showComment,
  comments,
  newComment,
  setNewComment,
  theComments,
  addComment,
  response,
}) {
  //const navigate = useNavigate();
  //resetting addcomment textfield
  /* useEffect(() => {
    if (response) {
      console.log(response);
      setNewComment('');
    }
  }, [response]); */
  return (
    <section
      /* onClick={() => setShowComment(false)} */
      className={`${
        showComment ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className="modal-content" onClick={() => setShowComment(false)}>
        <Comments
          user={user}
          id={id}
          setShowComment={setShowComment}
          showComment={showComment}
          comments={comments}
          theComments={theComments}
        />
        <form className="add-comment" onSubmit={addComment}>
          <label>
            <textarea
              value={newComment}
              required
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button className="addbtn">add</button>
          </label>
        </form>
      </div>
    </section>
  );
}
