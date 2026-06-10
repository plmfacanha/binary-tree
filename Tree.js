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

  includes(value) {
    let currNode = this.root;

    if (currNode === null) return false;

    while (currNode !== null) {
      if (value === currNode.data) {
        return true;
      }

      if (value < currNode.data) {
        currNode = currNode.left;
      } else if (value > currNode.data) {
        currNode = currNode.right;
      }
    }

    return false;
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

const tree = new Tree([...new Set([1, 3, 4, 6, 7])]);
const root = tree.root;

prettyPrint(root);

tree.includes(6);
