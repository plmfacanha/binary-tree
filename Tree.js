import Node from "./Node.js";

class Tree {
  constructor(arr) {
    arr.sort((a, b) => a - b);
    this.root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    if (arr.length === 1) {
      return new Node(arr[0]);
    } else {
      const mid = Math.floor(arr.length / 2);
      const left = this.#buildTree(arr.slice(0, mid));
      const right = this.#buildTree(arr.slice(mid));

      const root = new Node(arr[mid]);
      root.left = left;
      root.right = right;
      return root;
    }
  }
}

const node = new Tree([1, 7, 4, 23, 8, 9, 3, 5, 67, 88, 99]);
