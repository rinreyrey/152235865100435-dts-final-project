import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import {Button} from '@mui/material';
import Link from '@mui/joy/Link';
import { Link as Lin } from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';
import { Rating } from '@mui/material';
import noimage from '../assets/noimage.webp';

export default function CardGame({data}) {
  var options = {year: 'numeric', month: 'short', day: 'numeric' };
  let longDate= new Date(data.released).toLocaleDateString('en-US',options);
  return (
    <Card variant="outlined" sx={{ width:"100%" }}>
      <CardOverflow>
        <AspectRatio ratio={1.33}>
          <img
            src={data.background_image? data.background_image:noimage}
            alt=""
          />
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="danger"
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
          }}
        >
          <Favorite />
        </IconButton>
      </CardOverflow>
      <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
        <Link href="#multiple-actions" overlay underline="none">
          {data.name}
        </Link>
      </Typography>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"0.3em",marginBottom:"0.5em"}}>
      <Rating name="read-only" value={data.rating} precision={0.1} readOnly />
      {data.metacritic? (<Button variant="contained" size="small" startIcon={<img src='https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg' alt='metacritic' height={"20px"} style={{marginRight:"4px"}}/>}>
        
        {data.metacritic}
      </Button>):null}
      
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"0.3em",marginBottom:"0.5em"}}>
      <Typography level="body2" >
          Released Date:
      </Typography>
      <Typography level="body2" >
          {longDate}
      </Typography>
      </div>
      <CardOverflow
        variant="soft"
        sx={{
          display: 'flex',
          gap: 1.5,
          py: 1.5,
          px: 'var(--Card-padding)',
          borderTop: '1px solid',
          borderColor: 'neutral.outlinedBorder',
          bgcolor: 'background.level1',
          justifyContent: 'center'
        }}
      >
        <Lin to={`/games/${data.id}`} level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          View Detail
        </Lin>
      
      </CardOverflow>
    </Card>
  );
}
