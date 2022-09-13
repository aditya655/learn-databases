import React, {Component, useRef} from "react";
import {Route} from "react-router-dom";
import {Switch} from "@material-ui/core";
import '../relational.css';
import {RelationalASTTypes, RelationalDefinitions, RelationalSymbols} from "../RelationalDefinitions";
import RATree from "./RAAST/RATree";
import Keypad from "./Keypad/KeypadComponent";
import RAExpressionInputPad from "./Keypad/RAExpressionInputPad";
import RAEditor from "./RAEditor";
import RelationalExpression from "../RelationalExpression";
import RAEntityInputPad from "./Keypad/RAEntityInputPad";

export default class RAComplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayInput: "",
            operatorInUse: null,
            selectionValue: "",
            RAST: new RATree(),
            currNode: null,
            jsonRA: "",
            hideRAExpression: 'hidden',
            hideRAEntity: 'hidden',
            newExpression: '',
            newEntity: '',
            RATreeArray: null,
            currEntity: '',
            currExpression: '',
            currEntityActive: null,
        }

    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleClick);
    }

    componentWillUnmount() {
        document.addEventListener("keydown", this.handleClick);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleClick = (value,id) => {

    };

    //This is a test function that is no longer in use
    //It was used to test RA pad buttons
    handleQuickPrint = value => {
        const newInput = this.state.displayInput;
        let display;

        if (this.state.displayInput !== undefined) {
            display = `${value}${newInput}(${(this.selectionValue)})`;
        }

        this.setState({
            displayInput: display
        })
    }

    //Sets the curret node to the value that is passed in
    //if the value is null then get the last added node from the tree
    //assign that as the current node
    handleSetCurrentNode = value => {
        console.log(this.state.currNode);
        let node;
        if (value) {
            node = value;
        }
        else {
            node = this.state.RAST.getLastAddedNode();
        }
        this.setState({
            currNode: node,
        }, ()=>{console.log(this.state.currNode)})
    }

    //Adds the RA value to the RATree, checks which values need to passed in
    handleAddToRATree = (value) => {
        console.log("entered into handleAddToRATree")
        if (this.state.currNode != null && this.state.currNode.type === "ghostAdd") {
            this.state.RAST.add(value, this.state.currNode);
        }
        else {
            let currEntityActive = this.state.currEntityActive;
            this.state.RAST.add(value, currEntityActive);
        }
        console.log("Done");
        this.handleSetCurrentNode();
        console.log("This is the current node: ", this.state.currNode);
        this.handlePrint();
    }

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleSelection = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.restrict;
        RANode.symbol = RelationalSymbols.restrict;
        RANode.id = -1;
        this.handleAddToRATree(RANode);

    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleProject = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.project;
        RANode.symbol = RelationalSymbols.project;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleAggregate = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.aggregate;
        RANode.symbol = RelationalSymbols.aggregate;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleCartesian = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.cartesian_product;
        RANode.symbol = RelationalSymbols.cartesian_product;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleInnerJoin = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.theta_join;
        RANode.symbol = RelationalSymbols.theta_join;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleLeftOuterJoin = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.outer_join_left;
        RANode.symbol = RelationalSymbols.outer_join_left;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleRightOuterJoin = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.outer_join_right;
        RANode.symbol = RelationalSymbols.outer_join_right;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleFullOuterJoin = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.outer_join_full;
        RANode.symbol = RelationalSymbols.outer_join_full;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleSemiJoinLeft = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.semi_join_left;
        RANode.symbol = RelationalSymbols.semi_join_left;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleSemiJoinRight = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.semi_join_right;
        RANode.symbol = RelationalSymbols.semi_join_right;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleDivision = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.division;
        RANode.symbol = RelationalSymbols.division;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleUnion= value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.union;
        RANode.symbol = RelationalSymbols.union;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleIntersection = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.intersection;
        RANode.symbol = RelationalSymbols.intersection;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //Create a new object with type, symbol, and id filled in. Then calls handleAddToRATree passing
    //in the new object.
    handleDifference = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.difference;
        RANode.symbol = RelationalSymbols.difference;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    //handles clearing out RAComplete to start a new RA expression
    handleClear = () => {
        delete this.state.RAST;
        this.setState({
            displayInput: "",
            operatorInUse: null,
            selectionValue: "",
            RAST: new RATree(),
            currNode: null,
            jsonRA: "",
            hideRAExpression: 'hidden',
            hideRAEntity: 'hidden',
            newExpression: '',
            newEntity: '',
            RATreeArray: null,
            currEntity: '',
            currExpression: '',
            currEntityActive: null,
        });
        this.handlePrint();
    };

    //Used for updating the jsonRA with the new RATree
    handlePrint = () => {
        let root = this.state.RAST.getRootNode();
        console.log(root);
        console.log(this.state.RAST.getNumberOfNodes());

        this.setState({
            jsonRA: root,
        });
    };

    //----------------------- expression pad/changing the expression value
    //Used for handling the change of the expression of a node that was selected.
    handleChangeExpression = () => {
        console.log(this.state.newExpression);
        let node = this.state.currNode;
        node.newExpression = this.state.newExpression;
        console.log("handle ChangeExpression");
        if (node === null) {
            return;
        }
        else {
            console.log("The value is: ", node);
            let root = this.state.RAST.getRootNode();
            this.state.RAST.updateNodeExpression(root, node.id, node.newExpression);

            this.handlePrint();
        }
    }

    //Takes in the new expression value and uses setState to update the temp newExpression
    //Then calls handleChangeExpression which will pass the new expression to the RATree
    //class to update the expression for the node.
    handleGettingNewExpression = value => {
        console.log(value);
        this.setState({
            newExpression: value,
        },() => {this.handleChangeExpression()});

    }

    //Disables that hidden for the expression pad
    disableHideExpressionPad = (value) => {
        this.handleSetCurrentNode(value);
        this.setState({
            currExpression: value.expression,
            hideRAExpression: '',
        });
    }

    //hides the expression pad
    hideExpressionPad = () => {
        this.setState({
            hideRAExpression: 'hidden',
        });
    }
    //-------------------entity pad/changing the entity value--------------
    //Used for handling the change of the entity of a node that was selected.
    handleChangeEntity = () => {
        console.log(this.state.newEntity);
        let node = this.state.currNode;
        node.newEntity = this.state.newEntity;
        if (node === null) {
            return;
        }
        else {
            let root = this.state.RAST.getRootNode();
            this.state.RAST.updateEntity(root, node.id, node.newEntity);
            this.handlePrint();
        }
    }

    //Takes in the new entity value and uses setState to update the temp newExpression
    //Then calls handleChangeEntity which will pass the new entity to the RATree
    //class to update the entity value.
    handleGettingNewEntity = value => {
        console.log(value);
        this.setState({
            newEntity: value,
        },() => {this.handleChangeEntity()});

    }

    //Disables that hidden in the entity pad
    disableHideEntityPad = (value) => {
        this.handleSetCurrentNode(value);
        this.setState({
            currEntity: value.value,
            hideRAEntity: '',
            currEntityActive: value,
        }, () => {console.log(this.state.currEntity)});
    }

    //hides the entity pad
    hideEntityPad = () => {
        this.setState({
            hideRAEntity: 'hidden',
            currEntityActive: null,
        });
    }

    /*No longer need code
    //Helper functions to link the current RATree and the RAEditor classes.
    handleGettingTreeSize = () => {
        let size = this.state.RAST.getNumberOfNodes();
        return size;
    }

    handleGettingTreeRoot = () => {

    }

    handleGettingRATreeArray = () => {
        let root = this.state.RAST.getRootNode();
        let tempArray = this.state.RAST.inorder(root);
        return tempArray;
    }
    */

    render() {
        return (
            <div>
                <RAEditor
                    ast={this.state.jsonRA}
                    disableHideExpressionPad={this.disableHideExpressionPad}
                    disableHideEntityPad={this.disableHideEntityPad}
                    handleGettingTreeSize={this.handleGettingTreeSize}
                    handleGettingRATreeArray={this.handleGettingRATreeArray}
                    handleSetCurrentNode={this.handleSetCurrentNode}
                    hideRAExpression={this.state.hideRAExpression}
                    hideRAEntity={this.state.hideRAEntity}
                />
                <RAExpressionInputPad
                    changeStatusHidden={this.state.hideRAExpression}
                    hideExpressionPad={this.hideExpressionPad}
                    handleGettingNewExpression={this.handleGettingNewExpression}
                    currentExpressionValue={this.state.currExpression}
                />
                <RAEntityInputPad
                    changeStatusHidden={this.state.hideRAEntity}
                    hideEntityPad={this.hideEntityPad}
                    handleGettingNewEntity={this.handleGettingNewEntity}
                    currentEntityValue={this.state.currEntity}
                />

                <Keypad
                    displayInput={this.state.displayInput}
                    handleClick={this.handleClick}
                    handleBackSpace={this.handleBackSpace}
                    handleClear={this.handleClear}
                    handleQuickPrint={this.handleQuickPrint}
                    handleSelection={this.handleSelection}
                    handleProject={this.handleProject}
                    handleAggregate={this.handleAggregate}
                    handleCartesian={this.handleCartesian}
                    handleInnerJoin={this.handleInnerJoin}
                    handleLeftOuterJoin={this.handleLeftOuterJoin}
                    handleRightOuterJoin={this.handleRightOuterJoin}
                    handleFullOuterJoin={this.handleFullOuterJoin}
                    handleSemiJoinRight={this.handleSemiJoinRight}
                    handleSemiJoinLeft={this.handleSemiJoinLeft}
                    handleDivision={this.handleDivision}
                    handleUnion={this.handleUnion}
                    handleIntersection={this.handleIntersection}
                    handleDifference={this.handleDifference}
                    handlePrint={this.handlePrint}
                />
            </div>
        );
    }
}
