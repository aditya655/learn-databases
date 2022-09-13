import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { useState } from 'react';
import TablesDropdown from './RAEntityDropdown';

export default function EntityDrop(databases) {
  const [database, setDatabase] = useState();
    const handleChange = (event) => {
        if (event.target.value) {
            setDatabase(event.target.value);
        }
    };
    var databaselist = databases.children
    console.log(databaselist)
    console.log("Entity database", databases.children)
    if (databaselist === "not found") {
        return (
            <div>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300, padding: "10px 10px 10px" }} size = "large">
                <InputLabel shrink htmlFor="select-native">
                    
                </InputLabel>
                <span>Select a Table:</span>
                <select 
                    id="dropdown"
                    value={database}
                    label={database}
                    onChange={handleChange}
                >
                    <option>Choose Database First</option>
                </select>
            </FormControl>
        </div>
        
        )
    }
    else{

    
    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300, padding: "10px 10px 10px" }} size = "large">
                <InputLabel shrink htmlFor="select-native">
                    
                </InputLabel>
                <span>Select a Table:</span>
                <select 
                    id="dropdown"
                    value={database}
                    label={database}
                    onChange={handleChange}
                >
                    <option></option>
                   <TablesDropdown database = {databaselist}></TablesDropdown>
                </select>
            </FormControl>
        </div>
        
    );
}
}