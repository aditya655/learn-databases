import React from "react";
import './relational.css';
import {RelationalASTTypes,RelationalSymbols,RelationalDefinitions} from "./RelationalDefinitions";
import {DisplayRAEntityNode, DisplayRAJoinNode, DisplayRAUnaryNode, DisplayRAGhostNode} from "./components/RAAST/RAAST";

const unary_operators = [
    RelationalASTTypes.aggregate,
    RelationalASTTypes.project,
    RelationalASTTypes.restrict
];
/*
const set_operators = [
    RelationalASTTypes.difference,
    RelationalASTTypes.intersection,
    RelationalASTTypes.union
];
*/
const join_operators = [
    RelationalASTTypes.outer_join_full,
    RelationalASTTypes.outer_join_left,
    RelationalASTTypes.outer_join_right,
    RelationalASTTypes.semi_join_left,
    RelationalASTTypes.semi_join_right,
    RelationalASTTypes.theta_join
];

export default class RelationalExpress extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            currentNodeSet: false,
            relationalExpression: "relational_expression",
            currRelationalExpression: "curr_relational_expression",
            setActive: false,
            allInactive: true,
            allExpressionInactive: true,
            ghostActive: false,
        }
    }

    printAST = ast => {
        return (
            this.printASTNode(ast)
        );
    }

    //Helps the expression text box show
    handleExpression = (value) => {
        this.props.handleExpressionTxtBox(value);
    }

    //Helps the entity text box show
    handleEntity = (value) => {
        this.props.handleEntityTxtBox(value);
    }

    //Sets the current node, this allows for the color to change
    //on the current node
    handleSetCurrentNode = (value) => {
        this.setState({
            currentNodeSet: true,
            allInactive: false,
            setActive: true,
        }, ()=>{console.log(this.state.setActive)})
        if (value != null) {
            if (value.type === "ghostAdd") {
                this.setState({
                    ghostActive: true,
                }, ()=>{console.log(this.state.ghostActive)})
                this.props.handleSettingAsCurrent(value);
            }
        }
    }

    //This is called to set all of the nodes to inactive, setting them back to default color
    handleAllInactive = () => {
        this.setState({
            currentNodeSet: false,
            setActive: false,
            allInactive: true,
            ghostActive: false,
        }, ()=>{console.log(this.state.setActive)})
    }

    //helper class for handleAllInactive since setState didn't want to update
    setAllInactive = () => {
        console.log("Here")
        this.setState({
            currentNodeSet: false,
            setActive: false,
            allInactive: true,
            ghostActive: false,
        }, ()=>{this.handleAllInactive()})
    }

    //returns if a current node is set
    checkCurrentNodeStatus = () => {
        return this.state.currentNodeSet;
    }

    componentDidMount() {
        this.printAST(this.props.ast);
    }

    ////Runs every time that the website rerenders and if setAllInactive needs to be called
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.printAST(this.props.ast);

        if (((this.props.hideRAExpression === 'hidden' && this.props.hideRAEntity === 'hidden') && !this.state.ghostActive)&& this.state.allInactive === false) {
            this.setAllInactive();
        }
    }

    //Displays the RATree
    printASTNode = (ast) => {
        if (ast != null) {
            console.log(ast);
            if (ast.type === RelationalASTTypes.entity) {
                return (
                    <span>
                        <DisplayRAEntityNode
                            ast={ast}
                            handleEntity={this.handleEntity}
                            handleSetCurrentNode={this.handleSetCurrentNode}
                            checkCurrentNodeStatus={this.checkCurrentNodeStatus}
                            setAllInactive={this.setAllInactive}
                            allInactive={this.state.allInactive}
                            handleAllInactive={this.handleAllInactive}
                        />
                        {this.printASTNode(ast.right)}
                    </span>
                );
            } else if (RelationalDefinitions.isUnary(ast)) {
                console.log("Is a unary");
                return (<span>
                        <DisplayRAUnaryNode
                            ast={ast}
                            handleExpression={this.handleExpression}
                            handleSetCurrentNode={this.handleSetCurrentNode}
                            checkCurrentNodeStatus={this.checkCurrentNodeStatus}
                            setAllInactive={this.setAllInactive}
                            allInactive={this.state.allInactive}
                            handleAllInactive={this.handleAllInactive}
                        />
                        &nbsp;{this.printASTNode(ast.right)}&nbsp;
                    )</span>
                );
            } else if (RelationalDefinitions.isJoin(ast)) {
                console.log("Is a join");
                return (<span>(
                    <span className={this.state.relationalExpression}>&nbsp;{this.printASTNode(ast.left)}</span>
                    <DisplayRAJoinNode
                        ast={ast}
                        handleExpression={this.handleExpression}
                        handleSetCurrentNode={this.handleSetCurrentNode}
                        checkCurrentNodeStatus={this.checkCurrentNodeStatus}
                        setAllInactive={this.setAllInactive}
                        allInactive={this.state.allInactive}
                        handleAllInactive={this.handleAllInactive}
                    />
                    <span className={this.state.relationalExpression}>&nbsp;{this.printASTNode(ast.right)}&nbsp;</span>
                    )</span>);

            } else if (RelationalDefinitions.isSet(ast) || RelationalDefinitions.isCartesian(ast) || RelationalDefinitions.isDivision(ast)) {
                return (<span className={this.state.relationalExpression}>(
                    {this.printASTNode(ast.left)}
                    &nbsp;{RelationalSymbols[ast.type]}
                    &nbsp;{this.printASTNode(ast.right)}
                    )</span>);
            } else if (ast.type === "ghost") {
                return (<span className={this.state.relationalExpression}>
                    {this.printASTNode(ast.right)}
                    </span>);
            } else if (ast.type === "ghostAdd") {
                return (<span className={this.state.relationalExpression}>
                    <DisplayRAGhostNode
                        ast={ast}
                        handleSetCurrentNode={this.handleSetCurrentNode}
                        checkCurrentNodeStatus={this.checkCurrentNodeStatus}
                        setAllInactive={this.setAllInactive}
                        allInactive={this.state.allInactive}
                        handleAllInactive={this.handleAllInactive}
                    />
                    &nbsp;{this.printASTNode(ast.right)}
                    </span>);
            } else {
                return (<span className={this.state.relationalExpression}>(
                    &nbsp;{this.printASTNode(ast.left)}
                    {RelationalSymbols[ast.type]}
                    {this.printASTNode(ast.right)}&nbsp;
                    )</span>);
            }
        }
    }

    render() {
        return (
            <div>
                {this.printAST(this.props.ast)}
            </div>
        );
    }
}
