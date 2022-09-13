import React from 'react'
import {Button} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import {Link as BrowserLink} from "react-router-dom";

//Using useStyles to create a style of button that will be used in the nav bar
const useStyles = makeStyles({
    btn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        padding: "0 25px",
        boxSizing: "border-box",
        borderRadius: 0,
        background: "#e8e3d3 ",
        color: "#000000",
        transform: "none",
        boxShadow: "6px 6px 0 0 #4b2e83",
        transition: "background .3s,border-color .3s,color .3s",
        "&:hover": {
            backgroundColor:  "#4b2e83"
        },
    }
})

//A custom button that uses that style from above
function CustomButton(props) {
    const classes = useStyles()

    return (
        <Button
            className={classes.btn}
            component={BrowserLink}
            to={props.to}
            variant="contained"
        >
            {props.txt}
        </Button>
    )
}

export default CustomButton
