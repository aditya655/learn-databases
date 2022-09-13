import {Button, Input, TextField} from "@material-ui/core";
import React from "react";
import {withStyles} from '@material-ui/core/styles';
import '../../relational.css';
import { useState } from "react";
import { Box } from "@material-ui/core";
import TablesDropdown from "./RAEntityDropdown";
import EntityDrop from "./RAEntityDrop";


//Creates the theme for the sumbit buttton
const useStyles = theme =>({
    btn: {
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        padding: "0px 25px 0px 25px",
        boxSizing: "border-box",
        border: 0,
        borderRadius: 0,
        background: "#e8e3d3 ",
        color: "#000000",
        transform: "none",
        fontFamily: "relational_database_scriptMD",
        textTransform: "none",

        transition: "background .3s,border-color .3s,color .3s",
        "&:hover": {
            backgroundColor:  "#4b2e83"
        },
    }
});

//This class handles the entity textbox, is set by default to be hidden and uses props to set the
//status of the inputpad and the getting the current entity value and the new updated entity value
class RAEntityInputPad extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            entity: '',
            renderTimes: 0,
        }
    }

    //handles the submit by getting the new entity value entity state, then calls handleGettingNewEntity
    //from RAComplete passing in the entity value. Resets the hidden part of the pad and state values.
    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.entity);
        this.props.handleGettingNewEntity(this.state.entity);
        this.props.hideEntityPad();
        this.setState({
            entity: '',
            renderTimes: 0,
        });
        e.target.reset();
    }

    //gets called every time that the textfield gets updated with a new value to update the entity state value.
    changeHandler = (value) => {
        this.setState({
            entity: value,
        })
    }

    //this gets called every new render of the page, this checks that the pad is being displayed
    //and hidden as needed.
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.changeStatusHidden == '' && this.state.renderTimes == 0) {
            this.setState({
                entity: this.props.currentEntityValue,
                renderTimes: 1,
            }, () => {console.log(this.state.entity)});
        }
    }
    getDatabaseID() {
        var databasename
        if (document.getElementById("dropdown") != null) {
            databasename = document.getElementById("dropdown").value
            console.log("Entity Input DatabaseName", databasename)
        }else{databasename = "not found"}
       return(databasename) 
    }
    //Render part, displays the form, where the textfield and submit button are.
    render() {
        const { classes } = this.props;
        var datalist
        return (
            <div>
                <form hidden={this.props.changeStatusHidden} autoComplete="off" onSubmit={this.submitHandler}>
                    <TextField
                        id="EntityInput"
                        label="Entity"
                        type="text"
                        value={this.state.entity}
                        onChange={e => this.changeHandler(e.target.value)}
                    />
                    <Button
                        type="submit"
                        value="Submit"
                        className={classes.btn}
                    >
                        Submit
                    </Button>
                    <Box>
                        <EntityDrop>{datalist = this.getDatabaseID()}</EntityDrop>
                    </Box>
                </form>
            </div>
        )
    }
}

export default withStyles(useStyles)(RAEntityInputPad)

/*

                        <EntityDrop database={this.getDatabaseID()}>{this.getDatabaseID()}</EntityDrop>

        var databasename = document.getElementById("dropdown").value
        console.log("Entity Input DatabaseName", databasename)
        */
