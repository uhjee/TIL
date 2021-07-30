class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

// 이진 탐색 트리
module.exports = class BinarySearchTree {
  root = null;

  #insertNode(node, newNode) {
    // 자신보다 작으면 left에 참조
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.#insertNode(node.left, newNode);
      }
      // 자신보다 클 경우, right에 참조
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.#insertNode(node.right, newNode);
      }
    }
  }

  // 중위 순회 helper 함수
  #inOrderTraverseNode(node, callback) {
    // 재귀호출이 중단되는 시점(기본 상태)
    if (node !== null) {
      this.#inOrderTraverseNode(node.left, callback); // left(작은 값)부터 순회
      callback(node.key); // callback 함수 호출
      this.#inOrderTraverseNode(node.right, callback);
    }
  }

  insert(key) {
    const newNode = new Node(key);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.#insertNode(this.root, newNode);
    }
  }

  // ? 순회(Traversal)
  // 중위 순회: 작은 값부터 큰 값으로 순회
  inOrderTraverse(callback) {
    this.#inOrderTraverseNode(this.root, callback);
  }
};
