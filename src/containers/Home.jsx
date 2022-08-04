import React, { useEffect,useState } from 'react';
import PrimarySearchAppBar from './AppTop';
import Footer from './Footer';
import SelectOrder from './SelectOrder';
import CardGame from './CardGame';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import {Pagination} from '@mui/material';
import {CircularProgress} from '@mui/material';
import {
    auth
  } from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useGetGamesQuery,useGetGamesOrderByNameQuery,
  useGetGamesOrderByRatingQuery,
  useGetGamesOrderByReleasedQuery } from '../services/rawgAPI';

export default function Home() {
    const navigate = useNavigate();
    const [dataGames,setDataGames] = useState([]);
    const [page,setPage] = useState(1);
    const [ordBy,setOrdBy] = useState([false,""]);
    const [user,isLoading] = useAuthState(auth);
    const { data:d1, error:err1, isLoading:load1 } = useGetGamesQuery(page);
    const { data:d2, error:err2, isLoading:load2 } = useGetGamesOrderByNameQuery(page);
    const { data:d3, error:err3, isLoading:load3 } = useGetGamesOrderByRatingQuery(page);
    const { data:d4, error:err4, isLoading:load4 } = useGetGamesOrderByReleasedQuery(page);
    const handlePagination = (event, value) => {
      setPage(value);
      navigate(`/${value}`);
    };
    
    useEffect(
        () => {
          if (isLoading) {
            // Tampilkan loading screen (bila ada)
            return;
          }
          // if (!user) {
          //   navigate("/");
          // }
          if(ordBy[0]===false){
          if(err1) {
            return;
          }
          if(load1){
            return;
          }
          if(d1){
            setDataGames(d1.results);
          }
          }
          else if(ordBy[0]===true){
            if(ordBy[1]==="released"){
              if(err4) {
                return;
              }
              if(load4){
                return;
              }
              if(d4){
                setDataGames(d4.results);
              }
            }
            else if(ordBy[1]==="name"){
              if(err2) {
                return;
              }
              if(load2){
                return;
              }
              if(d2){
                setDataGames(d2.results);
              }
            }
            else if(ordBy[1]==="rating"){
              if(err3) {
                return;
              }
              if(load3){
                return;
              }
              if(d3){
                setDataGames(d3.results);
              }
            }
          }
        },
        // Sekarang dependency kita tergantung pada user dan isLoading dari useAuthState
        [user, navigate, isLoading,load1,d1,err1,load2,d2,err2,load3,d3,err3,load4,d4,err4,page,ordBy]
      );
    return(
        <>
        <PrimarySearchAppBar email={user?.email} />
        <div className='container-data'>
        <Typography variant='h5' sx={{marginBottom:"0.5em"}}>All Games</Typography>
        <SelectOrder handleOrder={setOrdBy}/>
        <Grid container alignItems="center"
  justifyContent="center" columnSpacing={{ sm: 6, xs:0 }} rowSpacing={{xs:2}}>
        {err1 || err2 || err3 || err4 ? <Typography variant='h6'> Error </Typography>: load1 || load2 || load3 ||load4? <CircularProgress />: d1? (dataGames.map((d)=><Grid item lg={2.1} md={3.5} sm={4.5} key={d.id}>
          <CardGame data={d}/>
        </Grid>)) : null}
        
        </Grid>
        </div>
        <div className='pagination'>
        <Pagination count={1000} page={page} onChange={handlePagination} variant="outlined" shape="rounded" color="primary"/>
        </div>
        <Footer />
        </>
    );
}