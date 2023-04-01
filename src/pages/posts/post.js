import React, { useEffect } from 'react';
import { useState } from 'react';
import Youtubeplayer from './youtubeplayer';
import { arrayUnion, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../components/firebase/config';
import { Container } from '@mui/system';
//import { doc, updateDoc } from 'firebase/firestore';
import { useFiresotre } from '../../Hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow/index.js';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CommentIcon from '@mui/icons-material/Comment';

import DeleteIcon from '@mui/icons-material/Delete';
import { useCollection } from '../../Hooks/useCollection';

import { makeStyles } from '@mui/styles';

import { Helmet } from 'react-helmet';
import Headtags from '../../components/Headtags';
import Comments from './comments';
import Commentsmodal from './commentsmodal';
import { Card, CardContent, Grid } from '@mui/material';
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import './post.css';

const useStyles = makeStyles({
  media: {
    marginTop: 10,
    display: 'block',
    width: '100%',

    paddingTop: '100%',
  },
  swiperContainer: {
    height: 'auto',
    objectFit: 'cover !important',
    width: '100% !important',
    maxWidth: 'none !important',
    paddingBottom: 3,
    '& .swiper-pagination-bullet': {
      background: 'blue',
    },
    '& .swiper-button-next:after': {
      fontSize: 3,
    },
    '& .swiper-button-prev:after': {
      fontSize: 13,
    },
  },
});
//import { deleteDoc } from 'firebase/firestore';

//import formatDistanceToNow from 'date-fns/formatDistanceToNow';

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
  const { media, swiperContainer } = useStyles();
  const { documents: users } = useCollection('users');

  const theRef = doc(db, 'Posts', id);
  const navigate = useNavigate();

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

  //adding comments
  const addComment = () => {
    if (user) {
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
      //setShowComment(false);
    } else {
      navigate('/login');
      console.log('login to comment');
    }
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
  const nextImage = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prevImage = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  /*   useEffect(() => {
    if (comments || likes) {
      setNumOfComments(comments.length);
      setNumOfLikes(likes.length);
    }
  }, []); */

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
      />
    );
  }

  return (
    <main className="post-main">
      <Headtags postImgUrl={postImgUrl[0]} description={description}></Headtags>
      <Helmet>
        <meta property="og:image" key="og:image" content={postImgUrl[0]} />
        <meta property="og:type" content="article" />
        <meta property="og:title" name={postTilte} />
        <meta property="og:description" description={description} />
        <meta
          name={postTilte}
          key={postTilte || description}
          content={postTilte || description}
        />
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
          subheader={formatDistanceToNow(createdAt.toDate(), {
            addSuffix: true,
          })}
        />

        <CardContent>
          <Typography variant="body" color="text.primary">
            {description}
          </Typography>
        </CardContent>

        {/*  displays images in a swiper*/}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          /*  onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')} */
          /* className={swiperContainer} */
        >
          {postImgUrl.map((image, index) => (
            <SwiperSlide key={index}>
              <img className="postimage" src={image} />
            </SwiperSlide>
          ))}
        </Swiper>

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

          <IconButton onClick={seeComments}>
            {comments.length}
            <CommentIcon />
          </IconButton>
          <div className="facebook">
            <FacebookShareButton
              url={postImgUrl[index]}
              quote={postTilte || description}
              hashtag={description}
              className="facebook"
            >
              <FacebookIcon size={17} />
            </FacebookShareButton>

            <ShareIcon />

            <WhatsappShareButton
              url={postImgUrl[index]}
              quote={description}
              className="facebook"
            >
              <WhatsappIcon size={17} />
            </WhatsappShareButton>
          </div>
        </CardActions>
      </Card>
      {comments.length === 0 && (
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

      {/*  Comments Section */}
      {showComment && user && (
        <>
          <Commentsmodal
            user={user}
            id={id}
            setShowComment={setShowComment}
            showComment={showComment}
            comments={comments}
            newComment={newComment}
            setNewComment={setNewComment}
            addComment={addComment}
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
