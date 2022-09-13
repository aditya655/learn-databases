import React from "react";
import {Box, Typography} from "@material-ui/core";
import RAComplete from "./components/RAComplete";
import RelationalExpression from "./RelationalExpression"
import ast from "./relational-expression-test";
import Dropdown from "./RelationalDropdown";
import Asynchronous from "./RelationalAsync";
import Databases from "./RelationalDatabases";
import TestSelect from "./RelationalDropTest";
import AsynchDropdown from "./RelationalAsynchronous";
import NativeDrop from "./RelationalNative";

export default class RelationalPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            schemas: null,
            RAValue: "",
            currentSchema: null
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

    handleCallback = (chosenDatabase) =>{
        this.setState({ currentSchema: chosenDatabase })
        console.log("handle Callback****", chosenDatabase)
    }

    render() {
        console.log(JSON.stringify(this.state.schemas));
        document.title = "Learn Database";
        const databaseList = (this.state.schemas != null) ? this.state.schemas : " NO database List";
        console.log("Database List:",databaseList)
        return databaseList != null ? (
            <div>
                <Box paddingLeft={7} paddingTop={1} paddingBottom={1}>
                    <Typography style={{ fontWeight: 'bold' }}>Relational Algebra</Typography>
                </Box>
                <Box paddingLeft={7}>
                    <AsynchDropdown parentCallback={this.handleCallback} databases={databaseList}>{databaseList}</AsynchDropdown>
                </Box>
                    
                <Box paddingLeft={10}>
                    <RelationalExpression database={this.state.currentSchema} ast={ast} />
                    <RAComplete />
                </Box> 
                
                
            </div>

        ): (<div>Loading...</div>)
    }
}
