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
    } else if (value > parentNode.data) {
      parentNode.right = newNode;
    }
  }

  getTree(root) {
    if (root === null) return [];

    const left = root.left ? this.getTree(root.left) : [];
    const right = root.right ? this.getTree(root.right) : [];

    return left.concat([root.data]).concat(right);
  }

  deleteItem(value) {
    let parentNode = this.#getParentNode(this.root, value);
    let currNode = this.#getNode(this.root, value);

    if (currNode === null) console.log("Node doesn't exist in this tree!");

    // 1. in case the node to be deleted is the root
    if (parentNode === currNode) {
      const left = currNode.left ? this.getTree(currNode.left) : [];
      const right = currNode.right ? this.getTree(currNode.right) : [];
      this.root = this.#buildTree(left.concat(right));
      return;
    }

    // 2. in case the deleted item is not the root
    const left = currNode.left ? this.getTree(currNode.left) : [];
    const right = currNode.right ? this.getTree(currNode.right) : [];
    const newSubtree = this.#buildTree(left.concat(right));

    if (currNode.data < parentNode.data) {
      parentNode.left = newSubtree;
    } else {
      parentNode.right = newSubtree;
    }
  }

  #getLevelOrderNodes(nodes, callback) {
    if (nodes.length === 0) return;

    if (nodes[0] !== null) {
      callback(nodes[0].data);
      nodes.push(nodes[0].left, nodes[0].right);
    }

    return this.getLevelOrderNodes(nodes.slice(1), callback);
  }

  levelOrderForEach(callback) {
    if (!callback)
      throw new Error("Callback function must be passed as argument");

    // * Recursive Approach
    return this.getLevelOrderNodes([this.root], callback);

    // * Iterative Approach
    // let index = 0;
    // let queue = [];
    // queue.push(this.root);

    // let node = queue[index];

    // while (index < queue.length) {
    //   if (node !== null) {
    //     callback(node.data);
    //     queue.push(node.left, node.right);
    //   }
    //   node = queue[++index];
    // }
  }

  inOrderForEach(callback) {
    if (!callback)
      throw new Error("Callback function must be passed as argument");

    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        callback(node.data);
        traverse(node.right);
      }
    };
    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("Callback must be passed as argument!");

    const traverse = (node) => {
      if (node !== null) {
        callback(node.data);
        traverse(node.left);
        traverse(node.right);
      }
    };
    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("Callback must be passed as argument!");

    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        traverse(node.right);
        callback(node.data);
      }
    };
    traverse(this.root);
  }

  depth(value) {
    const getDepth = (node) => {
      if (node === null) return 0;

      if (node.data === value) return 0;

      return 1 + Math.min(getDepth(node.left), getDepth(node.right));
    };

    return getDepth(this.root);
  }

  height(value) {
    //? height = 1 + max(height(leftSubtree), height(rightSubtree))

    const getHeight = (node) => {
      if (node === null) return 0;

      return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    };

    const node = this.#getNode(this.root, value);

    return getHeight(node);
  }

  isBalanced() {
    // ? height(node.left) - height(node.right) <= 1

    const checkTreeBalance = (node) => {
      if (node === null) return true;

      const leftHeight = node.left ? this.height(node.left.data) : 0;
      const rightHeight = node.right ? this.height(node.right.data) : 0;

      if (Math.abs(leftHeight - rightHeight) > 1) return false;
    };

    return checkTreeBalance(this.root);
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

const tree = new Tree([8]);

tree.insert(4);
tree.insert(2);
// tree.insert(6);
// tree.insert(5);
prettyPrint(tree.root);
console.log(tree.isBalanced());
// tree.levelOrderForEach((value) => console.log(value));
// tree.inOrderForEach((value) => console.log(value));
// tree.preOrderForEach((value) => console.log(value));
// tree.postOrderForEach((value) => console.log(value));
// console.log(tree.height(8));
// console.log(tree.height(4));
// console.log(tree.height(6));
// console.log(tree.height(5));
// console.log(tree.depth(5));
// console.log(tree.depth(3));
// console.log(tree.depth(1));
// console.log(tree.depth(4));
// console.log(tree.depth(6));
