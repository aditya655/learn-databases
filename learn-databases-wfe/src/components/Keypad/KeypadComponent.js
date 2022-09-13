import React from "react";
import RAPad from "./RAPad";

//Keypad handles the link between RAComplete and RAPad
export default function Keypad(props) {
    return (
        <React.Fragment>
            <RAPad
                handleClick={props.handleClick}
                handleBackSpace={props.handleBackSpace}
                handleClear={props.handleClear}
                handleSelection={props.handleSelection}
                handleProject={props.handleProject}
                handleAggregate={props.handleAggregate}
                handleCartesian={props.handleCartesian}
                handleInnerJoin={props.handleInnerJoin}
                handleLeftOuterJoin={props.handleLeftOuterJoin}
                handleRightOuterJoin={props.handleRightOuterJoin}
                handleFullOuterJoin={props.handleFullOuterJoin}
                handleSemiJoinRight={props.handleSemiJoinRight}
                handleSemiJoinLeft={props.handleSemiJoinLeft}
                handleDivision={props.handleDivision}
                handleUnion={props.handleUnion}
                handleIntersection={props.handleIntersection}
                handleDifference={props.handleDifference}
                handlePrint={props.handlePrint}
            />
        </React.Fragment>
    );
}
