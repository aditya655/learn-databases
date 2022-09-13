

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dropdown from './RelationalDropdown';
import Databases from './RelationalDatabases';

export default function TestSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <Databases/>
        </Select>
      </FormControl>
    </Box>
  );
}


/*
const [database, setDatabase] = React.useState([]);
    const handleChange = (event) => {
        if (event.target.value) {
            setDatabase(event.target.value);
        }
    };
    const databaselist = databases.children
    console.log(databaselist)
    console.log(database)
    const items = (databaselist != null) ?
            databaselist.map((database, i) =>
                <option key={i} value = {database}>{database}</option>) : "";
    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300, padding: "10px 10px 10px" }} size = "large">
                <InputLabel shrink htmlFor="select-native">
                    
                </InputLabel>
                <span>Select a Database:</span>
                <select 
                    labelId="database-drowdown"
                    id="dropdown"
                    value={database}
                    label="Database"
                    onChange={handleChange}
                >
                   {items} 
                </select>
            </FormControl>
        </div>
        
    );


/*
*Richard Ross
*CSS 497 Capstone
*Faculty Research Project
*Sponsor: Mark Kochanski
*Learning Databases
*Spring 2022
*/



    