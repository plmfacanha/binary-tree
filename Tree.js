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

  getTree(root) {
    let left = [];
    let right = [];

    if (root === null) return [];

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

    // 1. in case the node to be deleted is the root
    if (parentNode === currNode) {
      // 2. in case the root has no children
      if (currNode.right === null && currNode.left === null) {
        this.root = null;
      }
      // 3. in case the root has the left children and empty right
      if (currNode.left !== null && currNode.right === null) {
        const updatedTree = this.getTree(currNode.left);
        this.root = this.#buildTree(updatedTree);
      }
      // 4. if root has right children and empty left
      else if (currNode.right !== null && currNode.left === null) {
        const updatedTree = this.getTree(currNode.right);
        this.root = this.#buildTree(updatedTree);
      } else {
        // 5. if root has both children
        const left = this.getTree(currNode.left);
        const right = this.getTree(currNode.right);

        this.root = this.#buildTree(left.concat(right));
      }
      return;
    }

    // 6. in case the deleted item is not the root
    let childrenBranches = [];

    if (currNode.left !== null && currNode.right === null) {
      childrenBranches = this.getTree(currNode.left);
    } else if (currNode.left === null && currNode.right !== null) {
      childrenBranches = this.getTree(currNode.right);
    } else if (currNode.left !== null && currNode.right !== null) {
      const leftBranch = this.getTree(currNode.left);
      const rightBranch = this.getTree(currNode.right);

      childrenBranches = leftBranch.concat(rightBranch);
    }

    // rebuild children into a balanced subtree and attach it
    const newSubtree = this.#buildTree(childrenBranches);
    if (currNode.data < parentNode.data) {
      parentNode.left = newSubtree;
    } else {
      parentNode.right = newSubtree;
    }

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

const tree = new Tree([4, 6, 7, 8, 9, 11]);

tree.insert(3);
tree.insert(13);
tree.insert(5);
tree.insert(1);

// tree.deleteItem(4);
// tree.deleteItem(11);
tree.insert(15);
tree.insert(14);
tree.insert(22);
tree.insert(13);
tree.insert(11);
tree.insert(12);
tree.deleteItem(11);
tree.deleteItem(14);
tree.deleteItem(4);

prettyPrint(tree.root);
