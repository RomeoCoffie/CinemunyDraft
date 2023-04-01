import React from 'react';
import { useState } from 'react';
import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import './youtube.css';

export default function Youtubeplayer({
  description,
  postTilte,

  copyright,
  createdAt,
  youTubeLink,
  postType,
}) {
  //const [mylink, setMyLink] = useState('ZYyDrhM_jho');

  //function to get ID from YouTubeLink
  const getId = (url) => {
    const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
  };

  const newLink = getId(youTubeLink);
  return (
    <div className="player">
      <Container>
        <iframe
          className="video"
          src={`https://www.youtube.com/embed/${newLink}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />

        <Typography variant="body" color="text.secondary">
          {description}
        </Typography>
      </Container>
      <hr />
    </div>
  );
}
