const Node = require("../model/Node");

function findMainOperator(ruleString) {
    let openParens = 0;
    for (let i = 0; i < ruleString.length; i++) {
        if (ruleString[i] === '(') openParens++;
        if (ruleString[i] === ')') openParens--;

        // Find the main operator (AND/OR) outside of any parentheses
        if (openParens === 0) {
            if (ruleString.slice(i, i + 3) === 'AND') return { index: i, operator: 'AND' };
            if (ruleString.slice(i, i + 2) === 'OR') return { index: i, operator: 'OR' };
        }
    }
    return null;
}

// Helper function to remove outer parentheses if the whole string is wrapped in them
function removeOuterParentheses(ruleString) {
    ruleString = ruleString.trim();
    while (ruleString.startsWith('(') && ruleString.endsWith(')')) {
        let openParens = 0;
        let validToRemove = true;
        for (let i = 0; i < ruleString.length - 1; i++) {
            if (ruleString[i] === '(') openParens++;
            if (ruleString[i] === ')') openParens--;
            if (openParens === 0 && i < ruleString.length - 1) {
                validToRemove = false;
                break;
            }
        }
        if (validToRemove) {
            ruleString = ruleString.slice(1, -1).trim();
        } else {
            break;
        }
    }
    return ruleString;
}


function createRule(ruleString) {
    ruleString = removeOuterParentheses(ruleString);

    // Find the main operator (AND/OR) that splits the rule
    let mainOp = findMainOperator(ruleString);
    if (mainOp) {
        let leftPart = ruleString.slice(0, mainOp.index).trim();
        let rightPart = ruleString.slice(mainOp.index + mainOp.operator.length).trim();
        return new Node('operator', mainOp.operator, createRule(leftPart), createRule(rightPart));
    }

    // Base case: if no operator is found, it's an operand (condition)
    return new Node('operand', ruleString);
}


function combineRules(rules) {
    let combinedRoot = null;
    for (let rule of rules) {
        let ruleAst = createRule(rule);
        if (combinedRoot) {
            combinedRoot = new Node('operator', 'AND', combinedRoot, ruleAst);
        } else {
            combinedRoot = ruleAst;
        }
    }
    return combinedRoot;
}

function evaluateRule(node, data) {
    if (node.type === 'operand') {
        // Normalize the rule string by ensuring spaces around operators
        const normalizedOperand = node.value.replace(/(>=|<=|>|<|=)/g, ' $1 ');

        // Safely split the operand into components (left operand, operator, right operand)
        const [left, operator, right] = normalizedOperand.split(/\s+/).map(item => item && item.trim());

        // If the split didn't result in three parts, it's a malformed operand
        if (!left || !operator || !right) {
            throw new Error(`Malformed operand in rule: ${node.value}`);
        }

        const leftValue = data[left]; // Get the value from data based on the attribute

        if (leftValue === undefined) {
            throw new Error(`Attribute '${left}' is missing in the data`);
        }

        const rightValue = isNaN(right) ? right.replace(/'/g, '') : parseFloat(right); // Handle numeric comparisons

        switch (operator) {
            case '>':
                return leftValue > rightValue;
            case '<':
                return leftValue < rightValue;
            case '=':
                return leftValue === rightValue;
            case '>=':
                return leftValue >= rightValue;
            case '<=':
                return leftValue <= rightValue;
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }
    } else if (node.type === 'operator') {
        const leftEval = evaluateRule(node.left, data);
        const rightEval = evaluateRule(node.right, data);
        
        switch (node.value) {
            case 'AND':
                return leftEval && rightEval;
            case 'OR':
                return leftEval || rightEval;
            default:
                throw new Error(`Unknown operator type: ${node.value}`);
        }
    }

    throw new Error('Invalid node type');
}



module.exports={createRule,combineRules,evaluateRule}


