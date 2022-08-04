import React, { useEffect,useState } from 'react';
import PrimarySearchAppBar from './AppTop';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import {Link} from '@mui/material';
import {Rating} from '@mui/material';
import {CircularProgress} from '@mui/material';
import LinearProgressWithLabel from './LinearProgress';
import {
    auth
  } from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useGetGamesDetailQuery, useGetGameTrailerQuery } from '../services/rawgAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function DetailGames() {
    const navigate = useNavigate();
    let {id} = useParams();
    const [date,setDate] = useState("");
    const [ratingRead,setRating] = useState(0);

    const [user,isLoading] = useAuthState(auth);
    const { data:d1, error:err1, isLoading:load1 } = useGetGamesDetailQuery(id);
    const { data:d2, error:err2, isLoading:load2 } = useGetGameTrailerQuery(id);
    var options = {year: 'numeric', month: 'long', day: 'numeric' };
    let longDate= new Date(d1?.released).toLocaleDateString('en-US',options);
    
    useEffect(
        () => {
          if (isLoading) {
            // Tampilkan loading screen (bila ada)
            return;
          }
          // if (!user) {
          //   navigate("/");
          // }
          
          if(err1 || err2) {
            return;
          }
          if(load1 || load2){
            return;
          }
          if(d1){
            setDate(longDate);
            setRating(d1.rating);
          }
          
          
        },
        // Sekarang dependency kita tergantung pada user dan isLoading dari useAuthState
        [user, navigate, isLoading,load1,d1,err1,d2,load2,err2,longDate]
      );
    return(
        <>
        <PrimarySearchAppBar email={user?.email} />
        <div className='container-data'>
        <Typography variant='body1' sx={{mb:1}}>{err1?(<Typography variant='body1'>Error</Typography>):load1? (<CircularProgress />) : d1? (d1.parent_platforms.map((pf)=>{ return <Button size="small" variant="outlined" color='success' key={pf.platform.id}>{pf.platform.name}</Button>})) : null}</Typography>
          <Link href={d1?.website}><Typography variant='h3'>{d1?.name}</Typography></Link>
          <div style={{marginTop:"1em"}}>
          <Swiper
          modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            navigation
          >
            <SwiperSlide><center><img src={d1?.background_image} height="480" alt={d1?.name}></img></center></SwiperSlide>
            {d2?.results.map((mv)=>{ return <SwiperSlide key={mv.id}><center><Typography variant='h6' sx={{mb:1}}>{mv.name}</Typography><video width="854" height="480" controls><source src={mv.data[480]} type="video/mp4" /></video></center></SwiperSlide>})}
          </Swiper>
          </div>
          <Typography variant='h6' sx={{mt:2}}>Released: </Typography>
          <Typography variant='body1'>{date}</Typography>
          <Typography variant='h6' sx={{mt:2}}>Genres: </Typography>
          <Typography variant='body1'>{d1?.genres.map((genre)=>{ return <Button size="small" variant="outlined" key={genre.id}>{genre.name}</Button>})}</Typography>
          <Typography variant='h6' sx={{mt:2}}>Rating: </Typography>
          <div style={{display:"flex",gap:"0.5em",marginBottom:"0.3em",alignItems:"center"}}>
          <Rating name="half-rating-read" value={ratingRead} precision={0.1} readOnly />
          <Typography variant='body1'>{d1?.rating}</Typography>
          <Link href={d1?.metacritic_url}><Button variant='contained' color='success' size='small' startIcon={<img src='https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg' alt='metacritic' height={"20px"} style={{marginRight:"4px"}}/>}>{d1?.metacritic}</Button></Link>
          </div>
          
          
          {d1?.ratings.map((rate)=>{ return <><div style={{display:"flex"}} key={rate.id}><Typography variant='body2' width={"100px"}>{rate.title}</Typography><LinearProgressWithLabel value={rate.percent} /></div></>})}
          
          <Typography variant='h6' sx={{mt:2}}>Publishers: </Typography>
          <Typography variant='body1'>{d1?.publishers.map((pub)=>pub.name).join(", ")}</Typography>
          <Typography variant='h6' sx={{mt:2}}>Description: </Typography>
          <Typography variant='body1'>{d1?.description_raw}</Typography>
          <Typography variant='h6' sx={{mt:2}}>Tags: </Typography>
          <Typography variant='body1'>{d1?.tags.map((tag)=>{ return <Button size="small" variant="outlined" key={tag.id}>{tag.name}</Button>})}</Typography>
        </div>
        <Footer />
        </>
    );
}