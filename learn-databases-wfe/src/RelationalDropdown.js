import React, { Component } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Databases from './RelationalDatabases';
import { Autocomplete } from '@mui/material';

class Dropdown extends Component {
    constructor(props) {
    super(props);
    this.state = {
      schemas: []
    };
    }
    componentDidMount() {
        const headers = {'Content-Type':'application/json'}
        fetch("https://localhost:5001/database/schema",{headers})
            .then((res) => res.json())
            .then((data) => 
            {this.setState({ schemas: data })
        })
    }
    render() { 
        let data 
        const { schemas } = this.state;
        const items = (this.state.schemas != null) ?
            this.state.schemas.map((database, i) =>
                <option key={i} value = {database}>{database}</option>) : "";
      return (
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
          <InputLabel id="demo-simple-select-autowidth-label"></InputLabel>
          <select
            onChange
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={data}
            autoWidth
          >
            {items}
          </select>
        </FormControl>
      );
        
    }
}
 
export default Dropdown;

























/*
export default function Dropdown() {
  const [database, setDatabase] = React.useState('');

  const handleChange = (event) => {
      setDatabase(event.target.value);
  };

  return (

      <FormControl  sx={{ m: 1, minWidth: 120  }} size="small">
        <InputLabel id="demo-simple-select-autowidth-label">Database</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={database}
          onChange={handleChange}
          autoWidth
              label="Database"
          >
             <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <Databases></Databases>
        </Select>
      </FormControl>
  
  );
}


<Select
          labelId="Database-dropdown-label"
          id="Database-dropdown"
          value={database}
          label="Database"
          onChange={handleChange}           
                >
                    {databases}
        </Select>
        export default function Dropdown() {
  const [database, setDatabase] = React.useState('');

  const handleChange = (event) => {
    setDatabase(event.target.value);
  };

  return (
    <div>
      <FormControl  sx={{ m: 1, minWidth: 120  }}>
        <InputLabel id="demo-simple-select-autowidth-label">Database</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={database}
          onChange={handleChange}
          autoWidth
                  label="Database"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
        */