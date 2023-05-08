import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authcontext/AuthContext';
import { db } from '../../components/firebase/config';
import { arrayUnion, Timestamp, updateDoc, doc } from 'firebase/firestore';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import './youtube.css';

export default function Youtubeplayer({
  description,
  postTilte,
  copyright,
  createdAt,
  youTubeLink,
  postType,
  //handleLike,
  likes,
  /*  theComments,
  seeComments, */
  id,
  user,
}) {
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  //const [mylink, setMyLink] = useState('ZYyDrhM_jho');
  const theRef = doc(db, 'Posts', id);
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

  //function to get ID from YouTubeLink
  const getId = (url) => {
    const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
  };

  const newLink = getId(youTubeLink);
  return (
    <div className="player">
      <Card>
        <iframe
          className="video"
          src={`https://www.youtube.com/embed/${newLink}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {postTilte}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
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
          {/*  {theComments && (
            <>
              <IconButton onClick={seeComments}>
                {theComments.length || 0}
                <CommentIcon />
              </IconButton>
            </>
          )} */}

          <div className="facebook">
            {/* <FacebookShareButton
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
            </WhatsappShareButton> */}
          </div>
        </CardActions>
      </Card>

      <hr />
    </div>
  );
}
