'use strict';

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        var node = new Node(data, null, null);
        if (this.root == null) {
            this.root = node;
        } else {
            var currentNode = this.root;
            while (true) {
                if (data < currentNode.data) {
                    if (currentNode.left == null) {
                        currentNode.left = node;
                        break;
                    } else {
                        currentNode = currentNode.left;
                    }
                } else if (data > currentNode.data) {
                    if (currentNode.right == null) {
                        currentNode.right = node;
                        break;
                    } else {
                        currentNode = currentNode.right;
                    }
                } else {
                    break;
                }
            }
        }
    }

    contains(data) {
        var found = false;
        var currentNode = this.root;
        while (currentNode && !found) {
            if (data < currentNode.data) {
                currentNode = currentNode.left;
            } else if (data > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                found = true;
            }
        }
        return found;
    }

    remove(data) {
        var found = false;
        var currentNode = this.root;
        var parentNode;
        var replacementNode;
        var replacementParent;
        var childCounter;
        while (!found && currentNode) {
            if (data < currentNode.data) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } else if (data > currentNode.data) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else {
                found = true;
            }
        }
        if (found) {
            childCounter = (currentNode.left !== null ? 1 : 0) +
                (currentNode.right !== null ? 1 : 0);
            if (currentNode === this.root) {
                switch (childCounter) {
                    case 0:
                        this.root = null;
                        break;
                    case 1:
                        this.root = (currentNode.right === null ? currentNode.left : currentNode.right);
                        break;
                    default:
                        replacementNode = this.root.left;
                        while (replacementNode.right !== null) {
                            replacementParent = replacementNode;
                            replacementNode = replacementNode.right;
                        }
                        if (replacementParent !== null) {
                            replacementParent.right = replacementNode.left;

                            replacementNode.right = this.root.right;
                            replacementNode.left = this.root.left;
                        } else {
                            replacementNode.right = this.root.right;
                        }
                        this.root = replacementNode;
                }
            } else {
                switch (childCounter) {
                    case 0:
                        if (currentNode.data < parentNode.data) {
                            parentNode.left = null;
                        } else {
                            parentNode.right = null;
                        }
                        break;
                    case 1:
                        if (currentNode.data < parentNode.data) {
                            parentNode.left = (currentNode.left === null ? currentNode.right : currentNode.left);
                        } else {
                            parentNode.right = (currentNode.left === null ? currentNode.right : currentNode.left);
                        }
                        break;
                    default:
                        replacementNode = currentNode.right;
                        replacementParent = currentNode;
                        while (replacementNode.left !== null) {
                            replacementParent = replacementNode;
                            replacementNode = replacementNode.left;
                        }
                        replacementParent.right = replacementNode.right;
                        replacementNode.right = currentNode.right;
                        replacementNode.left = currentNode.left;
                        if (currentNode.data < parentNode.data) {
                            parentNode.left = replacementNode;
                        } else {
                            parentNode.right = replacementNode;
                        }
                }
            }
        }
    }

    traverse(value) {
        function repeat(node) {
            if (node) {
                if (node.left !== null) {
                    repeat(node.left);
                }
                if (node.right !== null) {
                    repeat(node.right);
                }
                value.call(this, node);
            }
        }
        repeat(this.root);
    }

    size() {
        var size = 0;
        this.traverse(function(node) {
            size++;
        });
        console.log(size);
        return size;
    }

    isEmpty() {
        return this.root == null ? true : false;
    }
}