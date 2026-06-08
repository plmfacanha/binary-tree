class Tree {
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    // TODO: implement function
    const sortedArr = arr.sort((a, b) => a - b);

    const finalArr = [...new Set(sortedArr)];

    console.log(finalArr);
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.root;
