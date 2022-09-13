import React, {Component} from "react";
import RANode, {RAJoinNode, RAUnaryNode, RAEntityNode, RABinaryNode, RAGhostNode, RAGhostAddNode} from "./RAAST.js";
import {RelationalASTTypes,RelationalSymbols,RelationalDefinitions} from "../../RelationalDefinitions";

export default class RATree extends Component {

    constructor(props) {
        super(props);
        this.root = null;

        this.state = {
            numberOfNodes: 0,
            numberOfEntities: 0,
            lastAddedNode: null,
            lastAddedEntity: null,
            currentNode: null,
            currentNodePassed: false,
            tempEntityNames: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    //Called to increase the node count
    incrementCount = () => {
        this.state.numberOfNodes += 1;
    }

    //Called to increase the entities count
    incrementNumberOfEntities = () => {
        this.state.numberOfEntities +=1;
        this.incrementCount();
    }

    //Add function creates a new node and then calls addNode to connect the new node to the last added node
    //or the current node.
    add = (value, currNode) => {
        console.log("entered with a value of")
        let node;
        //Checking if a currentNode is passed in, if so the new node will be added after it
        //pushing the other nodes down
        if (currNode === null) {
            //Getting the root node
            node = this.root;
            console.log("Here");

        }
        //Checking that the currentNode isn't the last added one.
        else if (this.state.lastAddedNode.right.id != currNode.id){
            console.log("Here");
            node = currNode;
            this.state.currentNodePassed = true;
        }
        //if current node is the same as the last added one.
        else {
            console.log(this.state.lastAddedNode);
            console.log(currNode.parent);
            node = this.state.lastAddedNode;
        }
        let newNode;
        let entity;

        //Used for testing
        if (value === RelationalASTTypes.entity) {
            console.log("The value is an entity");
        }
        //Checking is the value is unary
        else if (RelationalDefinitions.isUnary(value)) {
            console.log("The value is unary");
            //Adding the count of nodes in the tree
            this.incrementCount();

            //Creating a new unary node
            newNode = new RAUnaryNode(value.type, value.symbol);
            newNode.expression = "TEMP";
            newNode.id = this.state.numberOfNodes;

            //creating a new entity
            let entityName = this.getEntityName(this.getNumberOfEntities());
            entity = new RAEntityNode(entityName);
            this.incrementNumberOfEntities();
            entity.id = this.state.numberOfNodes;

            //assigning the entity and node to each other
            newNode.right = entity;
            entity.parent = newNode;

            //if the root is empty, assign the new node to the root
            //else call addNode passing the root and the new node into it
            if (node === null) {
                this.root = newNode;
                console.log("Created new node");
                this.state.lastAddedNode = newNode;
                return;
            }
            else {
                this.addNode(node, newNode);
            }
        }
        //Checking is the value is join
        else if (RelationalDefinitions.isJoin(value)) {
            console.log("The value is a join");
            //Adding to the count of nodes in the tree
            this.incrementCount();

            //Creating a new join node
            newNode = new RAJoinNode(value.type, value.symbol);
            newNode.expression = "TEMP";
            newNode.id = this.state.numberOfNodes;
            let rightEntity;
            let leftEntity;

            //Checking if number of nodes in the tree is greated than one
            //This is done to to see if two entities need to be created.
            if (this.getNumberOfNodes() > 1) {
                //Checking if the current node is passed in, as this
                //requires placing the new node in a special location
                if (this.state.currentNodePassed) {
                    console.log(node.parent);
                    console.log(this.state.lastAddedNode)
                    console.log(this.getNumberOfNodes());

                    //Creating a Ghost node, this will hold the place
                    //of the current nodes entity
                    let temp = new RAGhostNode();
                    temp.type = "ghost";
                    temp.id = node.id;
                    temp.right = newNode;
                    temp.parent = node.parent;
                    temp.value = "";

                    this.incrementCount();

                    //Creating a new RA entity and assigning it as
                    //the left side of the new node
                    leftEntity = new RAEntityNode(node.value)
                    leftEntity.id = this.getNumberOfNodes();
                    leftEntity.type = node.type;
                    leftEntity.parent = newNode;
                    newNode.left = leftEntity;
                    node.parent.left = temp;
                    console.log(temp);
                    console.log(leftEntity);
                    console.log(node);

                    /*
                    leftEntity = currNode.right;
                    //currNode.right = null;
                    newNode.left = leftEntity;
                    */

                }
                else {
                    console.log(this.state.lastAddedNode);
                    console.log(node);

                    //if the current node wasn't passed and get the right entity of the
                    //last added node and move it to the new nodes left.
                    let lastNode = this.getLastAddedNode();
                    leftEntity = lastNode.right;
                    lastNode.right = null;
                    newNode.left = leftEntity;
                    leftEntity.parent = newNode;
                }
            }
            //Creating a new entity node and assigning it brand new information
            else {
                let entityNameLeft = this.getEntityName(this.getNumberOfEntities());
                leftEntity = new RAEntityNode(entityNameLeft)
                this.incrementNumberOfEntities();
                leftEntity.id = this.state.numberOfNodes;
                newNode.left = leftEntity;
                leftEntity.parent = newNode;
            }

            //Creating a new entity node to be assigned to the right child of the new node.
            let entityNameRight = this.getEntityName(this.getNumberOfEntities());
            rightEntity = new RAEntityNode(entityNameRight)
            this.incrementNumberOfEntities();
            rightEntity.id = this.state.numberOfNodes;
            newNode.right = rightEntity;
            rightEntity.parent = newNode;

            //if the root is empty, assign the new node to the root
            //else call addNode passing the root and the new node into it
            if (node === null) {
                //this.root = newNode;
                /*
                let ghostAdd = new RAGhostAddNode();
                ghostAdd.symbol = '+';
                this.root = ghostAdd;
                this.addNode(ghostAdd, newNode);

                 */
                this.root = newNode;
                console.log("Created new node");
                this.state.lastAddedNode = newNode;
                return;
            }
            else {
                this.addNode(node, newNode);
            }
        }
        else if (RelationalDefinitions.isSet(value) || RelationalDefinitions.isCartesian(value) || RelationalDefinitions.isDivision(value)) {
            console.log("Fell into the set/cartestian/division part of the tree");
            //Adding to the count of nodes in the tree
            this.incrementCount();

            //Creating a new node
            newNode = new RABinaryNode(value.type, value.symbol);
            newNode.id = this.state.numberOfNodes;
            let rightEntity;
            let leftEntity;

            //Checking if number of nodes in the tree is greated than one
            //This is done to to see if two entities need to be created.
            if (this.getNumberOfNodes() > 1) {
                //Checking if the current node is passed in, as this
                //requires placing the new node in a special location
                if (this.state.currentNodePassed) {
                    console.log(this.getNumberOfNodes());

                    //Creating a Ghost node, this will hold the place
                    //of the current nodes entity
                    let temp = new RAGhostNode();
                    temp.type = "ghost";
                    temp.id = node.id;
                    temp.right = newNode;
                    temp.parent = node.parent;
                    temp.value = "";

                    this.incrementCount();

                    //Creating a new RA entity and assigning it as
                    //the left side of the new node
                    leftEntity = new RAEntityNode(node.value)
                    leftEntity.id = this.getNumberOfNodes();
                    leftEntity.type = node.type;
                    leftEntity.parent = newNode;
                    newNode.left = leftEntity;
                    node.parent.left = temp;
                    console.log(temp);
                    console.log(leftEntity);
                    console.log(node);


                    /*
                    leftEntity = currNode.right;
                    //currNode.right = null;
                    newNode.left = leftEntity;
                    */

                }
                else {
                    console.log(this.state.lastAddedNode);
                    console.log(node);

                    //if the current node wasn't passed and get the right entity of the
                    //last added node and move it to the new nodes left.
                    console.log(this.getNumberOfNodes());
                    let lastNode = this.getLastAddedNode();
                    leftEntity = lastNode.right;
                    lastNode.right = null;
                    newNode.left = leftEntity;
                    leftEntity.parent = newNode;
                }
            }
            //Creating a new entity node and assigning it brand new information
            else {
                let entityNameLeft = this.getEntityName(this.getNumberOfEntities());
                leftEntity = new RAEntityNode(entityNameLeft)
                this.incrementNumberOfEntities();
                leftEntity.id = this.state.numberOfNodes;
                newNode.left = leftEntity;
                leftEntity.parent = newNode;
            }

            //Creating a new entity node to be assigned to the right child of the new node.
            let entityNameRight = this.getEntityName(this.getNumberOfEntities());
            rightEntity = new RAEntityNode(entityNameRight)
            this.incrementNumberOfEntities();
            rightEntity.id = this.state.numberOfNodes;
            newNode.right = rightEntity;
            rightEntity.parent = newNode;

            //if the root is empty, assign the new node to the root
            //else call addNode passing the root and the new node into it
            if (node === null) {
                //this.root = newNode;
                /*
                let ghostAdd = new RAGhostAddNode();
                ghostAdd.symbol = '+';
                this.root = ghostAdd;
                this.addNode(ghostAdd, newNode);

                 */
                this.root = newNode;
                console.log("Created new node");
                this.state.lastAddedNode = newNode;
                return;
            }
            else {
                this.addNode(node, newNode);
            }
        }
        else {
            console.log("Didn't fall into any type");
        }

    }

    //addNode function that takes in two values the node - should be the root of a tree
    //newNode - should be the new node that needs to be added into the tree
    addNode = (node, newNode) => {
        console.log("addNode called");
        console.log(newNode.type)
        if (RelationalDefinitions.isUnary(newNode)) {
            if (node.right === null) {
                console.log("Added a unary node");
                node.right = newNode;
                this.state.lastAddedNode = newNode;
            }
            else {
                this.addNode(node.right, newNode);
            }
        }
        else if (RelationalDefinitions.isJoin(newNode)) {
            if (node.right === null) {
                console.log("Added a join node");
                node.right = newNode;
                this.state.lastAddedNode = newNode;
            }
            else {
                this.addNode(node.right, newNode);
            }
        }
        else if (RelationalDefinitions.isSet(newNode)) {
            if (node.right === null) {
                node.right = newNode;
                this.state.lastAddedNode = newNode;
            }
            else {
                this.addNode(node.right, newNode);
            }
        }
        else {
            if (node.right === null) {
                node.right = newNode;
                this.state.lastAddedNode = newNode;
            }
            else {
                this.addNode(node.right, newNode);
            }
        }
    }

    //Returns the root node to caller
    getRootNode = () => {
        return this.root;
    }

    //Returns the total number of nodes to caller
    getNumberOfNodes = () => {
        return this.state.numberOfNodes;
    }

    //Returns that total number of entities
    getNumberOfEntities = () => {
        return this.state.numberOfEntities;
    }

    //Returns temp name in the array at that location
    getEntityName = (value) => {
        return this.state.tempEntityNames[value];
    }

    //Returns the last added node
    getLastAddedNode = () => {
        return this.state.lastAddedNode;
    }

    //Goes through the tree looking for the id match and updating the expression
    updateNodeExpression = (node, id, value) => {
        console.log(id);
        //console.log(node.left);
        if (node === null) {
            return;
        }
        else if (node.id === id) {
            node.expression = value;
        }
        else if (node !== null) {
            node.right && this.updateNodeExpression(node.right, id, value);
            node.left && this.updateNodeExpression(node.left, id, value);
        }
    }

    //Goes through the tree looking for the id match and updating the entity
    updateEntity = (node, id, value) => {
        console.log(node);
        if (node === null) {
            return;
        }
        if (node.id === id) {
            node.value = value;
        }
        else if (node !== null) {
            node.right && this.updateEntity(node.right, id, value);
            node.left && this.updateEntity(node.left, id, value);
        }
    }

    /* No longer needed
    inorder = (node) => {
        console.log("inorder function called function");
        let treeArray = new Array();
        if (node !== null) {
            console.log("Calling the inorderHelper function");
            this.inorderHelper(node, treeArray);
        }
        return treeArray;
    }

    inorderHelper = (node, treeArray) => {
        if (node !== null) {
            console.log("Pushing onto the array");
            //console.log(node);
            treeArray.push(node);
            node.left && this.inorderHelper(node.left, treeArray);
            node.right && this.inorderHelper(node.right, treeArray);
        }
        else {
            return treeArray;
        }
    }
    */
}
