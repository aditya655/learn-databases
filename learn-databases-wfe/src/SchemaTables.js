import React, { Component } from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import ColumnsPage from './SchemaColumns';

export default class TablesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: null,
            tables: null
        };
    }
    componentDidMount() {
        this.setState({schema: this.props.databaseName})
        const database = this.props.databaseName
        console.log("databasename****",database);
        const headers = { 'Content-Type': 'application/json' }
        fetch("https://localhost:5001/database/schema/" + database, { headers })
            .then((res) => res.json())
            .then((data) =>  this.setState({tables: data}))
        
    }
    render() {
        const database = this.props.databaseName
        console.log(this.props)
        const tables = (this.state.tables != null) ? this.state.tables.map((table) =>
            <TreeItem style={{ color: '#021EA4', fontWeight: 'bold', fontSize: "20px" }} nodeId={table} key={table} label={table} tablename={table} databasename={this.props.databaseName}>
                <ColumnsPage tablename={table} databasename={database}></ColumnsPage>
            </TreeItem>) :
            "";
            
        return (<ul>{tables}</ul> )
    }
    
}

 
