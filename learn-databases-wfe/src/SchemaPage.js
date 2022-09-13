
import * as React from 'react';
import SchemaTree from './SchemaTree';


export default class SchemaPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schemas: null,
            tableList: null
        };
    }
//Query Database for list of Databases
    
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
        const items = (this.state.schemas != null) ?
            this.state.schemas.map((database) =>
                <SchemaTree key={database}>{database}</SchemaTree>) : "";

        return (
            <div style={{maxWidth: 750}}>
                <p style={{ marginLeft: '3.5rem', marginTop: '3px', marginBottom: '23px', fontWeight: 'bold' }}>Schema Structure</p>
                <div style={{ marginLeft: '4rem' }}>
                    <h2 style={{ color: '#031259', marginTop: '3px', marginBottom: '1px', fontSize: "24px" }}> ►  Database Name</h2>
                    <h3 style={{ color: '#021EA4', marginTop: '1px', marginBottom: '1px', fontSize: "22px" }}><a style={{ marginLeft: '6rem' }}>►  Table Name</a></h3>
                    <h4 style={{ color: '#032DFE', marginTop: '1px', marginBottom: '13px', fontSize: "20px" }}><a style={{ marginLeft: '12rem' }}>Columns</a></h4>
                    
                </div>
                <li style={{ marginLeft: '3rem', listStyle: 'none' }}>{items}</li>
                
            </div>
        );
    }
}

