import React from "react";
import Button from "@material-ui/core/Button";
import "./relational.css";

export default function RelationToolbar (props) {
    return (
        <div>
            <Button id={"ra-project"} className={"ra-project"} variant={"contained"}></Button>

            <Button id={"ra-restrict"} className={"ra-restrict"} variant={"contained"}></Button>
        </div>
    );
}
