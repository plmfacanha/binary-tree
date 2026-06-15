import Node from "./Node.js";

class Tree {
  constructor(arr) {
    const sorted = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.#buildTree(sorted);
  }

  #buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const left = this.#buildTree(arr.slice(0, mid));
    const right = this.#buildTree(arr.slice(mid + 1));

    const root = new Node(arr[mid]);
    root.left = left;
    root.right = right;
    return root;
  }

  #searchNode(node, value) {
    if (node === null) return false;

    if (value === node.data) return true;

    if (value < node.data) {
      return this.#searchNode(node.left, value);
    } else if (value > node.data) {
      return this.#searchNode(node.right, value);
    }
  }

  includes(value) {
    return this.#searchNode(this.root, value);
  }

  insert(value) {
    const parentNode = this.#getNode(this.root, value);

    if (value === parentNode.data) return; // skip duplicates

    const newNode = new Node(value);

    if (value < parentNode.data) {
      parentNode.left = newNode;
    } else {
      parentNode.right = newNode;
    }
  }

  #getParentNode(node, value) {
    if (value < node.data && node.left.data !== value) {
      return this.#getParentNode(node.left, value);
    } else if (value > node.data && node.right.data !== value) {
      return this.#getParentNode(node.right, value);
    }

    return node;
  }

  #getNode(node, value) {
    if (node === null) return node;

    if (value > node.data && node.right !== null) {
      return this.#getNode(node.right, value);
    } else if (value < node.data && node.left !== null) {
      return this.#getNode(node.left, value);
    }

    return node;
  }

  getTree(root) {
    let left = [];
    let right = [];

    if (root === null) return arr;

    if (root.left) {
      left = this.getTree(root.left);
    }

    if (root.right) {
      right = this.getTree(root.right);
    }

    return left.concat([root.data]).concat(right);
  }

  deleteItem(value) {
    let parentNode = this.#getParentNode(this.root, value);
    let currNode = this.#getNode(this.root, value);

    if (currNode === null) console.log("Node doesn't exist in this tree!");

    console.log("Parent node is: ", parentNode);
    console.log("Current node is: ", currNode);

    // 1. in case the node to be deleted is the root
    if (parentNode === currNode) {
      // 2. in case the root has no children
      if (currNode.right === null && currNode.left === null) {
        this.root = null;
      }
      // 3. in case the root has the left children and empty right
      if (currNode.left !== null && currNode.right === null) {
        const tree = this.getTree(currNode.left);
        this.root = this.#buildTree(tree);
      }
      // 4. if root has right children and empty left
      else if (currNode.right !== null && currNode.left === null) {
        const tree = this.getTree(currNode.right);
        this.root = this.#buildTree(currNode.right);
        // 5. if root has both children
      } else {
      }
    }

    // 6. in case the deleted item is not the root
    // if (parentNode.data < value) {
    //   parentNode.right = null;
    // } else if (parentNode.data > value) {
    //   parentNode.left = null;
    // }

    // if (currNode.left !== null) {
    //   this.insert(currNode.left.data);
    // }

    // if (currNode.right !== null) {
    //   this.insert(currNode.right.data);
    // }

    return;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree([15]);

// tree.insert(11);
// tree.insert(10);
tree.insert(3);
tree.insert(2);
tree.insert(6);
tree.insert(5);
tree.insert(11);
tree.insert(9);
tree.insert(7);
tree.insert(8);
tree.insert(1);
tree.deleteItem(15);
prettyPrint(tree.root);
