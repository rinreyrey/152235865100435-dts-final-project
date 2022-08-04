// di sini kita akan menggunakan state dan effect
import React, { useEffect,useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useGetGamesbySearch5Query } from '../services/rawgAPI';
import { useNavigate } from "react-router-dom";
// import { useSearchParams } from 'react-router-dom';
// import Autocomplete from '@mui/material/Autocomplete';


export default function ComboBox() {
  const navigate = useNavigate();
  const [comboBoxval,setVal] = useState("");
  // const [searchGame,setSearchGame] = useSearchParams("");
  const [comboBoxsearch,setValsearch] = useState([{name:"loading"}]);
  const { data, error, isLoading } = useGetGamesbySearch5Query(comboBoxval);
  const enterClicked = (event,value) => {
    if(event.key === "Enter"){
      navigate(`/games?q=${comboBoxval}`);
    }
  }
  const handleAutoComplete = (event,value)=>{
    setVal(value.name);
    navigate(`/games/${value.id}`);
  }
  const handleButtonSearch = ()=>{
    navigate(`/games?q=${comboBoxval}`);
  }
  
  useEffect(
    () => {
      if (isLoading) {
        return;
      }
      if (error) {
        return;
      }
      if(data) {
        let gameslist=[]
        function getNameAndId(value){
          gameslist.push({
            id:value.id,
            name:value.name
          })
        }
        data.results.forEach(getNameAndId);
        setValsearch(gameslist);
      }
    },
    // Sekarang dependency kita tergantung pada user dan isLoading dari useAuthState
    [data, error, isLoading]
  );
  
  return (
    <>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      loading={isLoading?true:false}
      noOptionsText={"No result found."}
      disableClearable={true}
      onInputChange={(event,value)=>setVal(value)}
      onChange={handleAutoComplete}
      options={comboBoxsearch}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option,value)=>option.name===value.name}
      sx={{ width: "30ch" }}
      size="small"
      forcePopupIcon={false}
      // popupIcon={""}
      renderInput={(params) => <TextField {...params} size='small' sx={{backgroundColor:"white"}} placeholder="Search" type={"search"} onKeyDown={enterClicked}
         />}
    />
    <Button size="large" variant='contained' onClick={handleButtonSearch}>
      <SearchIcon sx={{color:"white"}}/>
    </Button>
    </>
  );
}


