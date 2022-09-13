import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import CircularProgress from '@mui/material/CircularProgress';

export default class NativeDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            items: [],
            databaselist:[]
        };
    }

    handleChange = (event, value) => {
        this.setState({ data: event.target.value })
        console.log("**handle Change", value)
        this.props.parentCallback(this.state.data);
        
    };
    componentDidMount() {
        console.log("NativeProps",this.props)
        this.setState({items: (this.props.databases!=null? this.props.databases:["No databases returned"])})
        
    }

    render() {
        return (
            <Autocomplete
                disablePortal
                id="database-dropdown"
                options={this.state.items}
                label={this.state.data}
                value={this.state.data}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Database" />}
                onChange={this.handleChange}
                onChange={(event, value) => this.props.parentCallback(value)}

            />
       
        
        );
    }
}

/*
const items = (databaselist != null) ?
            databaselist.map((dbase, i) =>
                <option key={dbase} value = {dbase}>{dbase}</option>) : "";
                return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300, padding: "10px 10px 10px" }}
                size="large">
                <InputLabel shrink htmlFor="select-native">
                    
                </InputLabel>
                <span>Select a Database:</span>
                <select 
                    id="dropdown"
                    value={database}
                    label={database}
                    onChange={handleChange}
                >
                    <option></option>
                   {items} 
                </select>
            </FormControl>
        </div>
        
    );

    const items = (databaselist != null) ?
            databaselist.map((dbase, i) =>
            [{ label: { dbase }, id: {i} }]) : "";
    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300, padding: "10px 10px 10px" }}
                size="large">
                <InputLabel shrink htmlFor="select-native">
                    
                </InputLabel>
                <span>Select a Database:</span>
                <Autocomplete
                    disablePortal
                    id="dropdown"
                    options={items}
                    sx={{ width: 300 }}
                    value={database}
                    label={database}
                    onChange={handleChange}
                />
            </FormControl>
        </div>
        
    );


    const test = (databaselist != null) ?
        Array.from(databaselist.map((value, key) => ({ value, key }))) : ''
    console.log("this is a test", test)



    export default function NativeDrop(databases) {

    const [database, setDatabase] = useState();

    const handleChange = (event, value) => {
        console.log("database dropdown", database)
        setDatabase(event.target.value);
        setDatabase(value)
            console.log("database dropdown", database)
            this.props.parentCallback(database);
        
    };

    const databaselist = databases.children
    console.log(databaselist)

    const items = (databaselist != null) ? databaselist : ["No databases returned"];
    return (
        <Autocomplete
            disablePortal
            id="database-dropdown"
            options={items}
            label={database}
            value={database}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="Database" />}
            onChange={handleChange}
            onChange={(event, value) => console.log(value)}
            onChange={(event, value) => this.props.parentCallback(event.target.value)}

        />
       
        
    );
}

<Autocomplete
                disablePortal
                id="database-dropdown"
                options={this.state.items}
                label={this.state.data}
                value={this.state.data}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Database" />}
                onChange={this.handleChange}
                onChange={(event, value) => this.props.parentCallback(value)}

            />
                */