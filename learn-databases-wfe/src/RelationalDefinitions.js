
const RelationalASTTypes = {
    entity: "entity",
    project: "project",
    restrict: "restrict",
    aggregate: "aggregate",
    cartesian_product: "cartesian_product",
    theta_join: "theta_join",
    outer_join_left: "outer_join_left",
    outer_join_right: "outer_join_right",
    outer_join_full: "outer_join_full",
    semi_join_left: "semi_join_left",
    semi_join_right: "semi_join_right",
    division: "division",
    union: "union",
    intersection: "intersection",
    difference: "difference",
    alias: "alias"
};

const RelationalSymbols = {
    project: "\u220f",
    restrict: "\u03c3",
    aggregate: "\u03be",
    cartesian_product: "\u00c0",
    theta_join: "\u22c8",
    outer_join_left: "\u27d5",
    outer_join_right: "\u27d6",
    outer_join_full: "\u27d7",
    semi_join_left: "\u22c9",
    semi_join_right: "\u22ca",
    division: "\u00f7",
    union: "\u22c2",
    intersection: "\u22c3",
    difference: "\u002d"
};

const unary_operators = [
    RelationalASTTypes.aggregate,
    RelationalASTTypes.project,
    RelationalASTTypes.restrict
];
const set_operators = [
    RelationalASTTypes.difference,
    RelationalASTTypes.intersection,
    RelationalASTTypes.union
];
const join_operators = [
    RelationalASTTypes.outer_join_full,
    RelationalASTTypes.outer_join_left,
    RelationalASTTypes.outer_join_right,
    RelationalASTTypes.semi_join_left,
    RelationalASTTypes.semi_join_right,
    RelationalASTTypes.theta_join
];
const semi_join_operators = [
    RelationalASTTypes.semi_join_left,
    RelationalASTTypes.semi_join_right
];

class RelationalDefinitions {
    static isUnary(node) {
        return (unary_operators.includes(node.type));
    }
    static isJoin(node) {
        return (join_operators.includes(node.type));
    }
    static isSemiJoin(node) {
        return (semi_join_operators.includes(node.type));
    }
    static isSimple(node) {
        return ((node.type === RelationalASTTypes.project) ||
            (node.type === RelationalASTTypes.restrict) ||
            (node.type === RelationalASTTypes.entity));
    }
    static isSet(node) {
        return (set_operators.includes(node.type));
    }
    static isTable(node) {
        return (node.type === RelationalASTTypes.entity);
    }
    static isCartesian(node) {
        return (node.type === RelationalASTTypes.cartesian_product);
    }
    static isDivision(node) {
        return (node.type === RelationalASTTypes.division);
    }
}

exports.RelationalASTTypes = RelationalASTTypes;
exports.RelationalDefinitions = RelationalDefinitions;
exports.RelationalSymbols = RelationalSymbols;
