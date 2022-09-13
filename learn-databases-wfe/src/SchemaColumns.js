import React, { Component } from 'react';
import BasicTable from './SchemaTableView';
import { ColumnOrder } from './SchemaColumnOrder';


export default class ColumnsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: null,
            tables: null,
            columns: []
        };
    }
    //Query Database and fetch the Columns
    componentDidMount() {
        this.setState({ tables: this.props.tablename })
        this.setState({schema: this.props.databasename})
        const database = this.props.databasename
        const tablenameVar = this.props.tablename
        console.log("tablename****", tablenameVar);
        console.log("databaseName", database)
        const headers = { 'Content-Type': 'application/json' }
        fetch("https://localhost:5001/database/schema/"+database+"/"+tablenameVar, { headers })
            .then((res) => res.json())
            .then((data) =>  this.setState({columns: data}))
        
    }

    render() {
        const columnArray = this.state.columns;
        const orderedArray = ColumnOrder(columnArray)   

        return (<BasicTable  columns = {orderedArray}></BasicTable>)
    }
    
}



