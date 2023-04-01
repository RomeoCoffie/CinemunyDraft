import React from 'react';
import { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
//import { QuizContext } from '../../context/quizcontext/Quizcontext';

export default function Group({ grpName, img, url, about, ppleOnline }) {
  const [readMore, setReadMore] = useState(false);

  return (
    <div>
      <Card>
        <CardMedia sx={{ height: 190 }} image={img} title={grpName} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {grpName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {about}
          </Typography>
        </CardContent>
        <CardActions>
          <a className="join" href={url}>
            Join
          </a>
          <Button size="small">add group</Button>
        </CardActions>
      </Card>
      <hr />
    </div>
  );
}
