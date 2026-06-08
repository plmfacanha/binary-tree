import Node from "./Node.js";

class Tree {
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    // TODO: implement function
    const sortedArr = arr.sort((a, b) => a - b);

    const mid = Math.floor(sortedArr.length / 2);
    const root = new Node(sortedArr[mid]);

    console.log(sortedArr);
    return root;
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 3, 5, 67, 88, 99]);

console.log(tree.root);
