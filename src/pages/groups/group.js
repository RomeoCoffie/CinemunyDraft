import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
//import { QuizContext } from '../../context/quizcontext/Quizcontext';

export default function Group({ grpName, groupImgUrl, url, about, platform }) {
  // const [readMore, setReadMore] = useState(false);
  //const navigate = useNavigate();

  return (
    <div>
      <Card>
        {groupImgUrl && (
          <CardMedia sx={{ height: 190 }} image={groupImgUrl} title={grpName} />
        )}
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
          {platform === 'whatsapp' && <WhatsAppIcon sx={{ color: 'green' }} />}

          {platform === 'telegram' && (
            <div className="telegram">
              <TelegramIcon sx={{ color: 'white' }} />
            </div>
          )}

          {platform === 'facebook' && (
            <FacebookIcon sx={{ color: 'light-blue' }} />
          )}

          {/*  <Button size="small" onClick={() => navigate('/addgroup')}>
            add group
          </Button> */}
        </CardActions>
      </Card>
      <hr />
    </div>
  );
}
