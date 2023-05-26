import React, { useEffect, useContext, useState, useRef } from 'react';
import Youtubeplayer from './youtubeplayer';
import { arrayUnion, Timestamp, updateDoc, doc } from 'firebase/firestore';
//import { doc, updateDoc } from 'firebase/firestore';

//MUI stuff
import { useFiresotre } from '../../Hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent } from '@mui/material';
//import { useCollection } from '../../Hooks/useCollection';
import { makeStyles } from '@mui/styles';
import {
  FacebookShareButton,
  WhatsappShareButton,
  //TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  //TwitterIcon,
} from 'react-share';

//SwiperJS stuff
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Styles must use direct files imports
import 'swiper/scss'; // core Swiper
import 'swiper/scss/navigation'; // Navigation module
import 'swiper/scss/pagination'; // Pagination module

//components & Hooks
import { Helmet } from 'react-helmet';
import Headtags from '../../components/Headtags';
//import Comments from './comments';
import Commentsmodal from './commentsmodal';
import { useAddDocs } from '../../Hooks/useAddDocs';
import { TkimoviesContext } from '../../context/tkimovies/tkimovies';
import { db } from '../../components/firebase/config';

import './post.css';

const useStyles = makeStyles({
  media: {
    marginTop: 10,
    display: 'block',
    width: '100%',

    paddingTop: '100%',
  },
  swiper: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
  },
});

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
}) {
  const [index, setIndex] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [descLength, setDescLength] = useState(null);
  //const [longrShort, setLongrShort] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [inputError, setInputError] = useState(null);
  const { deleteDocument } = useFiresotre('Posts');
  const [theComments, setTheComments] = useState(null);
  const { media, swiperContainer } = useStyles();
  const { addDocument, response } = useAddDocs('comments');
  const { commentss } = useContext(TkimoviesContext);
  // const { documents: users } = useCollection('users');

  const theRef = doc(db, 'Posts', id);
  const navigate = useNavigate();
  const postComments = useRef(theComments).current;

  //permission to see comments
  const seeComments = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user) {
      setShowComment(true);
    }
  };

  useEffect(() => {
    if (commentss) {
      setTheComments(commentss.filter((coment) => coment.postId === id));
    }
    if (description) {
      setDescLength(description.length);
    }
  }, [postComments, response, commentss]);

  //Checks desciption length and sets readmore to true/false
  /* if (descLength && descLength > 200) {
    setLongrShort(true);
  } */
  /* 
  if (theComments || descLength) {
    console.log(theComments);
  } */

  //Add Comments
  const addComment = async (e) => {
    e.preventDefault();
    if (user) {
      if (newComment) {
        await addDocument({
          createdAt: Timestamp.fromDate(new Date()),
          content: newComment,
          user: user.uid,
          display: user.displayName,
          photoURL: user.photoURL,
          postId: id,
        });
        //incase comments modal isn't opened
        if (!showComment) {
          setShowComment(true);
        }
      } else {
        setInputError('you must input a comment');
        console.log(inputError);
      }
    } else {
      navigate('/login');
      console.log('login to comment');
    }
    console.log(response);
  };

  //resetting addcomment textfield
  useEffect(() => {
    if (response) {
      console.log(response);
      setNewComment('');
    }
  }, [response]);

  // Adding Likes
  const handleLike = () => {
    if (user) {
      console.log(id);
      if (likes && likes.includes(user.uid)) {
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
    } else {
      console.log('login to like');
      navigate('/login');
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
        addComment={addComment}
        handleLike={handleLike}
        theComments={theComments}
        seeComments={seeComments}
        id={id}
        user={user}
        likes={likes}
      />
    );
  }

  return (
    <main className="post-main">
      <Headtags description={description} postTilte={postTilte}></Headtags>
      <Helmet>
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:url"
          content="https://takling-movies.web.app/"
        ></meta>

        <meta property="og:type" content="article" />
        <meta property="og:title" name={postTilte || description} />
        <meta
          property="og:description"
          description={description || postTilte}
        />
        {postImgUrl && <meta property="og:image" content={postImgUrl[0]} />}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {postImgUrl && <meta property="og:image" content={postImgUrl[0]} />}
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
      </Helmet>
      <Card>
        <CardHeader
          // avatar={<Avatar sx={{ bgcolor: red[500] }}>Cine</Avatar>}
          action={
            user &&
            user.admin && (
              <IconButton
                onClick={() => deleteDocument(id)}
                aria-label="settings"
              >
                <DeleteIcon />
              </IconButton>
            )
          }
          title={copyright}
          subheader={
            <span style={{ fontSize: 12, marginBottom: 0, marginTop: 0 }}>
              {formatDistanceToNow(createdAt.toDate(), {
                addSuffix: true,
              })}
            </span>
          }
          /* subheader={formatDistanceToNow(createdAt.toDate(), {
            addSuffix: true,
          })} */
        />

        <CardContent>
          {postTilte && (
            <Typography
              sx={{ textDecoration: 'underline', fontStyle: 'italic' }}
              variant="h6"
            >
              {postTilte}
            </Typography>
          )}
          <Typography
            onClick={() => setReadMore(true)}
            // variant="body"
            color="text.primary"
          >
            {readMore ? description : `${description.substring(0, 200)}`}
          </Typography>
          {!readMore && descLength > 200 && <h3>...</h3>}
        </CardContent>

        {/*  displays images in a swiper*/}
        <div className="swiper-container">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className="swiper-container"

            /*  onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')} */
            /* className={swiperContainer} */
          >
            {postImgUrl.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="image-div">
                  <img className="postimage" src={image} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bottom of Postcard */}

        <CardActions disableSpacing>
          {user && likes && (
            <IconButton onClick={handleLike}>
              {likes.length}
              <FavoriteIcon
                className={`${likes.includes(user.uid) ? 'like' : 'unlike'}`}
              />
            </IconButton>
          )}
          {!user && likes && (
            <IconButton onClick={handleLike}>
              {likes.length}
              <FavoriteIcon className="unlike" />
            </IconButton>
          )}
          {!user && !likes && (
            <div>
              <IconButton onClick={handleLike}>
                <FavoriteIcon className="unlike" />
              </IconButton>
            </div>
          )}

          {user && !likes && (
            <div>
              <IconButton onClick={handleLike}>
                <FavoriteIcon className="unlike" />
              </IconButton>
            </div>
          )}
          {theComments && (
            <>
              <IconButton onClick={seeComments}>
                {theComments.length || 0}
                <CommentIcon />
              </IconButton>
            </>
          )}

          <div className="facebook">
            <FacebookShareButton
              url="https://takling-movies.web.app/"
              quote={postTilte || description}
              hashtag={description}
              className="facebook"
            >
              <FacebookIcon size={17} />
            </FacebookShareButton>

            <ShareIcon />

            <WhatsappShareButton
              url="https://takling-movies.web.app/"
              quote={description}
              className="facebook"
            >
              <WhatsappIcon size={17} />
            </WhatsappShareButton>
          </div>
        </CardActions>
      </Card>

      <form className="add-comment" onSubmit={addComment}>
        <label>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button className="addbtn">comment</button>
        </label>
      </form>

      {/*  Comments Section */}
      {showComment && user && (
        <>
          <Commentsmodal
            user={user}
            id={id}
            setShowComment={setShowComment}
            showComment={showComment}
            theComments={theComments}
            newComment={newComment}
            setNewComment={setNewComment}
            addComment={addComment}
            response={response}
          />
        </>
      )}
      <hr className="downhorizon" />
      <hr className="tophorizon" />

      {/*   {user && (
        <button onClick={() => deleteDocument(id)} className="del-comm">
          X
        </button>
      )} */}
    </main>
  );
}
