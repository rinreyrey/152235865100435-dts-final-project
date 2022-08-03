import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectOrder({handleOrder}) {
  const [orderBy, setOrderBy] = React.useState('');

  const handleChange = (event) => {
    setOrderBy(event.target.value);
    handleOrder([true,event.target.value]);
  };

  return (
    <Box sx={{ minWidth: 120,maxWidth: 200,marginBottom: "2em" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Order By :</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={orderBy}
          label="Order By"
          onChange={handleChange}
        >
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"released"}>Released Date</MenuItem>
          <MenuItem value={"rating"}>Rating</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
