class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type; // "operator" or "operand"
        this.value = value; // value for operands (e.g., "age > 30")
        this.left = left; // left child (for operators)
        this.right = right; // right child (for operators)
    }
}
module.exports = Node