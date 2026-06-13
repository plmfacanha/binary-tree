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

  #getNode(node, value) {
    if (value > node.data && node.right !== null) {
      return this.#getNode(node.right, value);
    } else if (value < node.data && node.left !== null) {
      return this.#getNode(node.left, value);
    }

    return node;
  }

  insert(value) {
    const currNode = this.#getNode(this.root, value);

    if (value === currNode.data) return; //skip duplicates

    const newNode = new Node(value);

    if (value < currNode.data) {
      currNode.left = newNode;
    } else {
      currNode.right = newNode;
    }
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

const tree = new Tree([1, 4, 6]);
const root = tree.root;

tree.insert(5);
tree.insert(7);
tree.insert(3);
prettyPrint(root);
