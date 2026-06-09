import Node from "./Node.js";

class Tree {
  constructor(arr) {
    arr.sort((a, b) => a - b);
    this.root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    if (arr.length === 0) return null;
    if (arr.length === 1) {
      return new Node(arr[0]);
    } else {
      const mid = Math.floor(arr.length / 2);
      const left = this.#buildTree(arr.slice(0, mid));
      const right = this.#buildTree(arr.slice(mid + 1));

      const root = new Node(arr[mid]);
      root.left = left;
      root.right = right;
      return root;
    }
  }

  includes(value) {}
}
const list = Array.from({ length: 40 }, () => Math.floor(Math.random() * 101));
const tree = new Tree([...new Set(list)]);
const root = tree.root;

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

prettyPrint(root);
