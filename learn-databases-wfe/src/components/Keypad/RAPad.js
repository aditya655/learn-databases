import React, {useRef, useState} from "react";
import {Button, ThemeProvider, Typography} from '@material-ui/core'
import '../../relational.css';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {RelationalASTTypes, RelationalSymbols} from "../../RelationalDefinitions";
import {Text, TouchableOpacity} from "react-native";

//Creates the style for the RA butttons
const useStyles = makeStyles({
    btn: {
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        padding: "0 25px",
        boxSizing: "border-box",
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
})

//RAPad function holds a grid with all of the RA buttons, each button has a value with the RA type,
//as well as an onClick that calls its the RA types function in RAComplete to haddle adding it into the tree
export default function RAPad(props) {
    const classes = useStyles();
    const [unaryButtonsDisabled, setUnaryButtonsDisabled] = useState(false);
    
    
    return (
        <div className="RA-Pad">
            <Grid container alignContent={"center"} alignItems={"center"}>

                {/*Button for the Selection*/}
                <Button
                    className={classes.btn}
                    value={RelationalASTTypes.restrict}
                    id = "SelectionBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    //onClick={e => props.handleClick(e.currentTarget.value, e.currentTarget.id)}
                    onClick={e => {props.handleSelection(e.currentTarget.value); setUnaryButtonsDisabled(false);}}
                    disabled={unaryButtonsDisabled}
                >
                    {RelationalSymbols.restrict}
                </Button>

                {/*Button for the Project*/}
                <Button
                    className={classes.btn}
                    value={RelationalASTTypes.project}
                    id = "ProjectBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    //onClick={e => props.handleClick(e.currentTarget.value, e.currentTarget.id)}
                    onClick={e => {props.handleProject(e.currentTarget.value); setUnaryButtonsDisabled(false);}}
                    disabled={unaryButtonsDisabled}
                >
                    {RelationalSymbols.project}
                </Button>

                {/*Button for the Aggregate*/}
                <Button
                    className={classes.btn}
                    value={RelationalASTTypes.aggregate}
                    id = "AggregateBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    //onClick={e => props.handleClick(e.currentTarget.value, e.currentTarget.id)}
                    onClick={e => {props.handleAggregate(e.currentTarget.value); setUnaryButtonsDisabled(false);}}
                    disabled={unaryButtonsDisabled}
                >
                    {RelationalSymbols.aggregate}
                </Button>

                {/*Button for the Cartesian*/}
                <Button
                    className={classes.btn}
                    value={RelationalASTTypes.cartesian_product}
                    id = "CartesianBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    //onClick={e => props.handleClick(e.currentTarget.value, e.currentTarget.id)}
                    onClick={e => props.handleCartesian(e.currentTarget.value)}
                    disabled={false}
                >
                    {RelationalSymbols.cartesian_product}
                </Button>

                {/*Button for the Inner Join*/}
                <Button
                    className={classes.btn}
                    value = {RelationalASTTypes.theta_join}
                    id = "InnerJoinBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    //onClick={e => props.handleClick(e.currentTarget.value, e.currentTarget.id)}
                    onClick={e => props.handleInnerJoin(e.currentTarget.value)}
                    disabled={false}
                >
                    {RelationalSymbols.theta_join}
                </Button>

                {/*Button for the Left Outer Join*/}
                <Button
                    className={classes.btn}
                    value = {RelationalASTTypes.outer_join_left}
                    id = "LeftOuterJoinBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    //onClick={e => props.handleClick(e.currentTarget.value, e.currentTarget.id)}
                    onClick={e => props.handleLeftOuterJoin(e.currentTarget.value)}
                    disabled={false}
                >
                    {RelationalSymbols.outer_join_left}
                </Button>

                {/*Button for the Right Outer Join*/}
                <Button
                    className={classes.btn}
                    value = {RelationalASTTypes.outer_join_right}
                    id = "RightOuterJoinBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    //onClick={e => props.handleClick(e.currentTarget.value, e.currentTarget.id)}
                    onClick={e => props.handleRightOuterJoin(e.currentTarget.value)}
                    disabled={false}
                >
                    {RelationalSymbols.outer_join_right}
                </Button>

                {/*Button for the Full Outer Join*/}
                <Button
                    className={classes.btn}
                    value = {RelationalASTTypes.outer_join_full}
                    id = "FullOuterJoinBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    //onClick={e => props.handleClick(e.currentTarget.value, e.currentTarget.id)}
                    onClick={e => props.handleFullOuterJoin(e.currentTarget.value)}
                    disabled={false}
                >
                    {RelationalSymbols.outer_join_full}
                </Button>

                {/*Button for the Semi Join Left*/}
                <Button
                    className={classes.btn}
                    value = {RelationalASTTypes.semi_join_left}
                    id = "SemiJoinLeftBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    onClick={e => props.handleSemiJoinLeft(e.currentTarget.value, e.currentTarget.id)}
                    disabled={false}
                >
                    {RelationalSymbols.semi_join_left}
                </Button>

                {/*Button for the Semi Join Right*/}
                <Button
                    className={classes.btn}
                    value = {RelationalASTTypes.semi_join_right}
                    id = "SemiJoinRightBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    onClick={e => props.handleSemiJoinRight(e.currentTarget.value, e.currentTarget.id)}
                    disabled={false}
                >
                    {RelationalSymbols.semi_join_right}
                </Button>

                {/*Button for the Division*/}
                <Button
                    className={classes.btn}
                    value = {RelationalASTTypes.division}
                    id = "DivisionBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    onClick={e => props.handleDivision(e.currentTarget.value, e.currentTarget.id)}
                    disabled={false}
                >
                    {RelationalSymbols.division}
                </Button>

                {/*Button for the Division*/}
                <Button
                    className={classes.btn}
                    value = {RelationalASTTypes.union}
                    id = "DivisionBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    onClick={e => props.handleUnion(e.currentTarget.value, e.currentTarget.id)}
                    disabled={false}
                >
                    {RelationalSymbols.union}
                </Button>

                {/*Button for the Intersection*/}
                <Button
                    className={classes.btn}
                    value = {RelationalASTTypes.intersection}
                    id = "IntersectionBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    onClick={e => props.handleIntersection(e.currentTarget.value, e.currentTarget.id)}
                    disabled={false}
                >
                    {RelationalSymbols.intersection}
                </Button>

                {/*Button for the Difference*/}
                <Button
                    className={classes.btn}
                    value = {RelationalASTTypes.difference}
                    id = "DifferenceBtn"
                    style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    onClick={e => props.handleDifference(e.currentTarget.value, e.currentTarget.id)}
                    disabled={false}
                >
                    {RelationalSymbols.difference}
                </Button>

                {/*Button for the clear*/}
                <Button
                    className={classes.btn}
                    //style={{fontFamily: "relational_database_scriptMD"}}
                    variant="contained"
                    onClick={() => {props.handleClear(); setUnaryButtonsDisabled(false);}}
                >
                    Clear
                </Button>

            </Grid>
        </div>
    );

}
