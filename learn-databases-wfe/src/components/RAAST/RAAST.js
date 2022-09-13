import React, {Component} from "react";
import {RelationalASTTypes,RelationalSymbols,RelationalDefinitions} from "../../RelationalDefinitions";
import '../../relational.css';
import RelationalExpression from "../../RelationalExpression";

/* RANode - Root Abstract Class */
export default class RANode extends Component{
    constructor(nodeType, nodeSymbol) {
        super(nodeType, nodeSymbol);
        this.type = nodeType;
        this.parent = null;
        this.symbol = nodeSymbol;
        this.id = null;

        //TEMP
        this.left = null;
        this.right = null;

    }
}

/* RAEntityNode - Leaf Node - Entity / Table */
export class RAEntityNode extends RANode {
    constructor(entityName) {
        super(RelationalASTTypes.entity);
        this.value = entityName;
        //TEMP
        this.left = null;
        this.right = null;
    }
}

/* Operator Structural Classes */
export class RAUnaryNode extends RANode {
    constructor(nodeType, nodeSymbol) {
        super(nodeType, nodeSymbol);
        this.type = nodeType;
        this.right = null;
        this.expression = null;
        this.symbol = nodeSymbol;

        //TEMP
        this.left = null;
    }
}
export class RAAggregateNode extends RAUnaryNode {
    constructor() {
        super(RelationalASTTypes.aggregate);
        this.grouping = null;

        //TEMP
        this.right = null;
        this.left = null;
    }
}

export class RABinaryNode extends RANode {
    constructor(nodeType, nodeSymbol) {
        super(nodeType, nodeSymbol);
        this.type = nodeType;
        this.symbol = nodeSymbol;
        this.left = null;
        this.right = null;
    }
}

export class RAJoinNode extends RABinaryNode {
    constructor(nodeType, nodeSymbol) {
        super(nodeType, nodeSymbol);
        this.expression = null;
        this.type = nodeType;
        this.symbol = nodeSymbol;
        //TEMP
        this.left = null;
        this.right = null;
    }
}

export class RAGhostNode extends RANode {
    constructor(nodeSymbol) {
        super(nodeSymbol);
        this.type = "ghost";
        this.symbol = nodeSymbol;
    }
}

export class RAGhostAddNode extends RANode {
    constructor(nodeSymbol) {
        super(nodeSymbol);
        this.type = "ghostAdd";
        this.symbol = nodeSymbol;
    }
}

export class DisplayRANode extends React.Component {
    constructor(props) {
        super(props);

    }
}

//This class is used to render the entity type nodes correctly, and giving it
//the correct onClick ability
export class DisplayRAEntityNode extends DisplayRANode {
    constructor(props) {
        super(props);

        this.state = {
            defaultRelationalExpression: "relational_expression",
            currRelationalExpression: "curr_relational_expression",
            relationalExpression: "relational_expression",
            active: false,
        }
    }

    //checks to make sure that other node aren't active,
    //if they are set all inactive. Set this one as active, and call
    //handleEntity which will handle connecting to RAComplete and
    //disable the hidden for the text box.
    handleClick = (value) => {
        if (this.props.checkCurrentNodeStatus()) {
            console.log("ITs true")
            this.props.setAllInactive();
        }
        this.handleSetActive();
        this.props.handleEntity(value);
    }

    //Sets this node as active
    handleSetActive = () => {
        this.props.handleSetCurrentNode();
        this.setState({
            relationalExpression: this.state.currRelationalExpression,
            active: true,
        }, () =>{console.log(this.state.relationalExpression)});
    }

    //Sets this node as inactive
    handleInactive = (value) => {
        if (value === true) {
            this.setState({
                relationalExpression: this.state.defaultRelationalExpression,
                active: false,
            }, () =>{console.log(this.state.relationalExpression)});
        }
    }

    componentDidMount() {

    }

    //Runs every time that the website rerenders and checks if it is active.
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allInactive && this.state.active) {
            this.handleInactive(this.props.allInactive);
        }
    }

    render() {
        return (
            <i className={this.state.relationalExpression} onDoubleClick={() => this.handleClick(this.props.ast)}> {this.props.ast.value} </i>
        )
    }
}

//This class is used to render the unary type nodes correctly, and giving it
//the correct onClick ability
export class DisplayRAUnaryNode extends DisplayRANode {
    constructor(props) {
        super(props);

        this.state = {
            defaultRelationalExpression: "relational_expression",
            currRelationalExpression: "curr_relational_expression",
            relationalExpression: "relational_expression",
            active: false,
        }
    }

    //Sets the node as active and checks that others aren't active at the same time
    handleClick = value => {
        if (this.props.checkCurrentNodeStatus()) {
            this.props.setAllInactive();
        }
        this.handleSetActive();
    }

    //checks to make sure that other node aren't active,
    //if they are set all inactive. Set this one as active, and call
    //handleExpression which will handle connecting to RAComplete and
    //disable the hidden for the text box.
    handleExpressionClick = (value) => {
        if (this.props.checkCurrentNodeStatus()) {
            this.props.setAllInactive();
        }
        this.handleSetActive();
        this.props.handleExpression(value);
    }

    //Sets node as active
    handleSetActive = () => {
        this.props.handleSetCurrentNode();
        this.setState({
            relationalExpression: this.state.currRelationalExpression,
            active: true,
        }, () =>{console.log(this.state.relationalExpression)});
    }

    //Sets node as inactive
    handleInactive = (value) => {
        if (value === true) {
            this.setState({
                relationalExpression: this.state.defaultRelationalExpression,
                active: false,
            }, () =>{console.log(this.state.relationalExpression)});
        }
    }

    componentDidMount() {

    }

    //Runs every time that the website rerenders and checks if it is active.
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allInactive && this.state.active) {
            this.handleInactive(this.props.allInactive);
        }
    }
    render() {
        return (
            <span>
                <span>(&nbsp;
                <span className={this.state.relationalExpression} onClick={() => this.handleClick(this.props.ast.type)}>{RelationalSymbols[this.props.ast.type]}&nbsp;</span>
                <sub className={this.state.relationalExpression} onDoubleClick={() => this.handleExpressionClick(this.props.ast)}>{this.props.ast.expression}</sub>
                </span>
            </span>
        )
    }
}

//This class is used to render the join type nodes correctly, and giving it
//the correct onClick ability
export class DisplayRAJoinNode extends DisplayRANode {
    constructor(props) {
        super(props);

        this.state = {
            defaultRelationalExpression: "relational_expression",
            currRelationalExpression: "curr_relational_expression",
            relationalExpression: "relational_expression",
            active: false,
        }
    }

    //Sets the node as active
    handleClick = value => {
        if (this.props.checkCurrentNodeStatus()) {
            this.props.setAllInactive();
        }
        this.handleSetActive();
    }

    //checks to make sure that other node aren't active,
    //if they are set all inactive. Set this one as active, and call
    //handleExpression which will handle connecting to RAComplete and
    //disable the hidden for the text box.
    handleExpressionClick = (value) => {
        if (this.props.checkCurrentNodeStatus()) {
            this.props.setAllInactive();
        }
        this.handleSetActive();
        this.props.handleExpression(value);
    }

    //Sets the node as active
    handleSetActive = () => {
        this.props.handleSetCurrentNode();
        this.setState({
            relationalExpression: this.state.currRelationalExpression,
            active: true,
        }, () =>{console.log(this.state.relationalExpression)});
    }

    //Sets the node as inactive
    handleInactive = (value) => {
        if (value === true) {
            this.setState({
                relationalExpression: this.state.defaultRelationalExpression,
                active: false,
            }, () =>{console.log(this.state.relationalExpression)});
        }
    }

    componentDidMount() {

    }

    //Runs every time that the website rerenders and checks if it is active.
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allInactive && this.state.active) {
            this.handleInactive(this.props.allInactive);
        }
    }

    render() {
        return (
            <span>
                <span className={this.state.relationalExpression} onClick={() => this.handleClick(this.props.ast.type)}>&nbsp;{RelationalSymbols[this.props.ast.type]}</span>
                <sub className={this.state.relationalExpression} onDoubleClick={() => this.handleExpressionClick(this.props.ast)}>
                {(this.props.ast.hasOwnProperty('expression')) ? (<sub className={this.state.relationalExpression} >&nbsp;{this.props.ast.expression}</sub>) : ''}
                </sub>
            </span>
        )
    }
}

//This class is used to render the ghost type nodes correctly, and giving it
//the correct onClick ability
export class DisplayRAGhostNode extends DisplayRANode {
    constructor(props) {
        super(props);

        this.state = {
            defaultRelationalExpression: "relational_expression",
            currRelationalExpression: "curr_relational_expression",
            relationalExpression: "relational_expression",
            active: false,
        }
    }

    //helps set as active
    handleClick = () => {
        if (this.props.checkCurrentNodeStatus()) {
            this.props.setAllInactive();
        }
        this.handleSetActive();
    }

    //sets the node as active
    handleSetActive = () => {
        this.props.handleSetCurrentNode(this.props.ast);
        this.setState({
            relationalExpression: this.state.currRelationalExpression,
            active: true,
        }, () =>{console.log(this.state.relationalExpression)});
    }

    //sets the node as inactive
    handleInactive = (value) => {
        if (value === true) {
            this.setState({
                relationalExpression: this.state.defaultRelationalExpression,
                active: false,
            }, () =>{console.log(this.state.relationalExpression)});
        }
    }

    componentDidMount() {

    }

    //Runs every time that the website rerenders and checks if it is active.
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allInactive && this.state.active) {
            this.handleInactive(this.props.allInactive);
        }
    }
    render() {
        return (
            <span>
                <span>
                    <span className={this.state.relationalExpression} onDoubleClick={() => this.handleClick()}>{this.props.ast.symbol}</span>
                </span>
            </span>
        )
    }
}
