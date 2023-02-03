import React from 'react';
import { useState } from 'react';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';
import { AiOutlineLike, AiOutlineArrowUp } from 'react-icons/ai';
import { GiSelfLove } from 'react-icons/gi';
import { RiShareForwardLine } from 'react-icons/ri';
import Youtubeplayer from './youtubeplayer';
import { arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from '../../components/firebase/config';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { useFiresotre } from '../../Hooks/useFirestore';
import { deleteDoc } from 'firebase/firestore';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share';

import './post.css';
import { Helmet } from 'react-helmet';
import Headtags from '../../components/Headtags';
import Comments from './comments';

export default function Post({
  description,
  postTilte,
  postImgUrl,
  source,
  copyright,
  createdAt,
  youTubeLink,
  postType,
  user,
  id,
  likes,
  comments,
}) {
  const [index, setIndex] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [newComment, setNewComment] = useState(null);
  const { deleteDocument, response } = useFiresotre('Posts');

  const theRef = doc(db, 'Posts', id);

  //adding comments
  const addComment = () => {
    const person = user.uid;
    const commentId = `${Math.random()},${person}`;

    const commentToAdd = {
      createdAt: Timestamp.fromDate(new Date()),
      content: newComment,
      user: user.uid,
      display: user.displayName,
      img: user.photoURL,
      commId: commentId,
    };
    updateDoc(theRef, {
      comments: arrayUnion(commentToAdd),
    });
    console.log(commentToAdd);
    setShowComment(false);
  };

  //slidding images
  const checkNumber = (number) => {
    if (number > postImgUrl.length - 1) {
      return 0;
    }
    if (number < 0) {
      return postImgUrl.length - 1;
    }
    return number;
  };
  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  //delete post
  /*  const deletePost = async (id) => {
    const ref = doc(db, 'Posts', id);
    console.log(ref);

    try {
      await deleteDoc(ref);
    } catch (error) {
      console.log(error);
    }
  }; */

  // Likes
  const handleLike = () => {
    console.log(id);
    if (likes?.includes(user.uid)) {
      console.log('already liked');
    } else {
      updateDoc(theRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log('liked');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Youtube trailer display
  if (postType === 'trailer') {
    return (
      <Youtubeplayer
        youTubeLink={youTubeLink}
        description={description}
        postTilte={postTilte}
        copyright={copyright}
        createdAt={createdAt}
      />
    );
  }

  return (
    <main>
      <hr className="tophorizon" />
      <div className="post-grid">
        {/*  <Headtags postImgUrl={postImgUrl} description={description}></Headtags> */}
        <Helmet>
          {/* <meta
            name={postTilte}
            key={postTilte || description}
            content={postTilte}
          />
          <meta
            name={description}
            key={postTilte || description}
            content={description}
          /> */}
          {/*  <meta property="og:image" key="og:image" content={postImgUrl[0]} /> */}
          <meta property="og:type" content="article" />
          <meta property="og:title" content={postTilte} />
          <meta property="og:description" content={description} />
        </Helmet>
        <div className="titlediv">
          <h4>{postTilte}</h4>
          {user && (
            <button onClick={() => deleteDocument(id)} className="del-comm">
              X
            </button>
          )}
        </div>

        <div className="postinfo">
          <p>
            {readMore ? description : `${description.substring(0, 300)}`}
            &nbsp;
            <button className="showmore" onClick={() => setReadMore(!readMore)}>
              {readMore ? <AiOutlineArrowUp /> : '...'}
            </button>
          </p>
        </div>
        {postImgUrl && postImgUrl.length > 1 && (
          <div>
            <button className="prev" onClick={prevPerson}>
              <BsChevronDoubleLeft />
            </button>
          </div>
        )}

        {postImgUrl && (
          <div
            className={`${postImgUrl.length > 1 ? 'image-div' : 'oneimage'}`}
          >
            <img className="postimage" src={postImgUrl[index]}></img>
          </div>
        )}

        {postImgUrl && postImgUrl.length > 1 && (
          <div>
            <button className="nextone" onClick={nextPerson}>
              <BsChevronDoubleRight />
            </button>
          </div>
        )}
        <div>
          <a className="source" href={source}>
            {/* //Share */}
            <RiShareForwardLine />
          </a>
          <FacebookShareButton
            url={'http://www.cinemuny.com'}
            quote={description}
            hashtag={description}

            /* className={classes.socialMediaButton} */
          >
            <FacebookIcon size={15} />
          </FacebookShareButton>

          <WhatsappShareButton
            url={'http://www.cinemuny.com'}
            quote={description}
            hashtag="#camperstribe"
            /* className={classes.socialMediaButton} */
          >
            <WhatsappIcon size={15} />
          </WhatsappShareButton>
        </div>

        <div>
          <button className="showcomment" onClick={() => setShowComment(true)}>
            Comment
          </button>
        </div>

        <div>
          <button onClick={handleLike}>
            <GiSelfLove
              className={`${likes?.includes(user.uid) ? 'like' : 'unlike'}`}
            />
          </button>
        </div>
        <div className="addcomment-container">
          {showComment && (
            <form className="add-comment" onSubmit={addComment}>
              <label>
                <textarea
                  required
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button className="addbtn">add</button>
              </label>
            </form>
          )}
        </div>

        <hr className="downhorizon" />

        {comments && (
          <Comments
            user={user}
            id={id}
            setShowComment={setShowComment}
            showComment={showComment}
            comments={comments}
          />
        )}
      </div>
    </main>
  );
}
