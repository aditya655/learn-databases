import React, { Component, useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import { MenuItem } from '@material-ui/core';
import { Fragment } from 'react';


class Databases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schemas: null,
            database: null
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
            console.log("render");
        console.log(JSON.stringify(this.state.schemas));
            const options = (this.state.schemas != null) ? this.state.schemas.map((database) =>
                <MenuItem value={database} key={database}>{database}</MenuItem>) : "";
        return (<Fragment>{options}</Fragment>);
    }
}
 
export default Databases;
