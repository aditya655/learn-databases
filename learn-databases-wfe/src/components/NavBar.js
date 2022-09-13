import React from 'react'
import CustomButton from "./Buttons/CustomButton";
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";
import { positions } from '@material-ui/system';
import {Link as BrowserLink} from "react-router-dom";

//Using makestyles to style the nav bar
const styles = makeStyles({
    bar:{
        paddingTop: "1.15rem",
        backgroundColor: "#fff",
        ['@media (max-width:780px)']: {
            flexDirection: "column"
        }
    },
    title: {
        paddingRight: "30rem",
        paddingLeft: "1rem"
    },
    menuItem: {
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
        cursor: "pointer",
        position: "left",
        flexGrow: 1,
        "&:hover": {
            color:  "#4b2e83"
        }
    }
})

//Returns a toobar that works as the websites nav bar
function NavBar() {
    const classes = styles()
    return (
        <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>
            <Typography variant="h6" className={classes.title}>
                LEARNING DATABASES
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                <CustomButton to="/relational" txt="Relational"/>
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                <CustomButton to="/schema" txt="Schema"/>
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                <CustomButton to="/quiz" txt="Quiz"/>
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                <CustomButton to="/login" txt="Login"/>
            </Typography>

        </Toolbar>
    )
}

export default NavBar
