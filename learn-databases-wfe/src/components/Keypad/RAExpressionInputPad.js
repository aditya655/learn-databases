import {Button, Input, TextField} from "@material-ui/core";
import React from "react";
import {withStyles} from '@material-ui/core/styles';
import '../../relational.css';
import {useState} from "react";

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

//This class handles the expression textbox, is set by default to be hidden and uses props to set the
//status of the inputpad and the getting the current expression value and the new updated expression value
class RAExpressionInputPad extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            expression: '',
            renderTimes: 0,
        }

    }

    //handles the submit by getting the new expression value expression state, then calls handleGettingNewExpression
    //from RAComplete passing in the expression value. Resets the hidden part of the pad and state values.
    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.expression);
        this.props.handleGettingNewExpression(this.state.expression);
        this.props.hideExpressionPad();
        this.setState({
            expression: '',
            renderTimes: 0,
        });
        e.target.reset();
    }

    //gets called every time that the textfield gets updated with a new value to update the expression state value.
    changeHandler = value => {
        this.setState({
            expression: value,
        })
    }

    //this gets called every new render of the page, this checks that the pad is being displayed
    //and hidden as needed.
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.changeStatusHidden == '' && this.state.renderTimes == 0) {
            this.setState({
                expression: this.props.currentExpressionValue,
                renderTimes: 1,
            }, () => {console.log(this.state.entity)});
        }
    }

    //Render part, displays the form, where the textfield and submit button are.
    render() {
        const {classes} = this.props;
        return (
            <div>
                <form hidden={this.props.changeStatusHidden} autoComplete="off" onSubmit={this.submitHandler}>
                    <TextField
                        id="ExpressionInput"
                        label="Expression"
                        type="text"
                        value={this.state.expression}
                        onChange={e => this.changeHandler(e.target.value)}
                    />
                    <Button
                        type="submit"
                        value="Submit"
                        className={classes.btn}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}

export default withStyles(useStyles)(RAExpressionInputPad)
