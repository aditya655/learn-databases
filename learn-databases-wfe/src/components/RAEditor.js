import React from "react";
import RelationalExpression from "../RelationalExpression";

export default class RAEditor extends React.Component {
    constructor(props) {
        super(props);

    }

    //Helps connect the RAComplete with RelationalExpression
    //Gives access to the disableHideExpressionPad
    handleExpressionTxtBox = (value) => {
        console.log(value);
        this.props.disableHideExpressionPad(value);
    }

    //Helps connect the RAComplete with RelationalExpression
    //Gives access to the disableHideEntityPad
    handleEntityTxtBox = (value) => {
        console.log(value);
        this.props.disableHideEntityPad(value)
    }

    handlePrint = (value) => {
        return value;
    }

    //Helps connect the RAComplete with RelationalExpression
    //Gives access to the handleSetCurrentNode
    handleSettingAsCurrent = (value) => {
        console.log(value);
        this.props.handleSetCurrentNode(value);
    }

    //TEMP function to test somethings
    /*
    handlePrintNodes = (value) => {
        let treeArray = this.props.handleGettingRATreeArray();
        let display = "";
        treeArray.forEach((element, index, array) => {
            display = display + " " + element.type;
        });

        return <span>{display}</span>;
    }
    */

    componentDidMount() {
        this.handlePrint(this.props.ast)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handlePrint(this.props.ast)
    }
    render() {
        return (
            <div>
                <RelationalExpression
                    handleExpressionTxtBox={this.handleExpressionTxtBox}
                    handleEntityTxtBox={this.handleEntityTxtBox}
                    ast={this.handlePrint(this.props.ast)}
                    handleSettingAsCurrent={this.handleSettingAsCurrent}
                    hideRAExpression={this.props.hideRAExpression}
                    hideRAEntity={this.props.hideRAEntity}
                />
            </div>
        );
    }
}

