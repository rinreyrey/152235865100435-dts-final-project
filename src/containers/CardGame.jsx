import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import {Button} from '@mui/material';
// import Link from '@mui/joy/Link';
import { Link as Lin } from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';
import { Rating } from '@mui/material';
import noimage from '../assets/noimage.webp';

export default function CardGame({data}) {
  var options = {year: 'numeric', month: 'short', day: 'numeric' };
  let longDate= new Date(data.released).toLocaleDateString('en-US',options);
  return (
    <div className="hovercheck">
    <Card variant="outlined" className="hovercheck2" sx={{ width:"100%", backgroundColor:"white" }}>
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
          {data.name}
      </Typography>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"0.3em",marginBottom:"0.5em"}}>
      <Rating name="read-only" value={data.rating} precision={0.1} readOnly />
      {data.metacritic? (<Button variant="outlined" size="small" startIcon={<img src='https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg' alt='metacritic' height={"20px"} style={{marginRight:"4px"}}/>}>
        
        {data.metacritic}
      </Button>):null}
      
      </div>
      <div className='genrenya' style={{display:"none"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"0.3em",marginBottom:"0.5em"}}>
      <Typography level="body2" >
          Released Date:
      </Typography>
      <Typography level="body2" >
          {longDate}
      </Typography>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"0.3em",marginBottom:"0.5em"}}>
      <Typography level="body2" >
          Genre:
      </Typography>
      </div>
      <div className='genres'>
      {data.genres.map((gen)=>{ return <Button variant="outlined" size="small" key={gen.id}>
      {gen.name}
          </Button>})}
      </div>
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
    </div>
  );
}
