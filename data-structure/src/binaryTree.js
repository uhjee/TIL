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

  //전위 순회 helper 함수
  #preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key); // !  자기 자신부터 실행
      this.#preOrderTraverseNode(node.left, callback);
      this.#preOrderTraverseNode(node.right, callback);
    }
  }

  // 후위 순회 helper 함수
  #postOrderTraverse(node, callback) {
    if (node !== null) {
      this.#postOrderTraverse(node.left, callback);
      this.#postOrderTraverse(node.right, callback);
      callback(node.key); // ! 자기 자신을 가장 나중에
    }
  }

  // 최소값 helper 함수
  #minNode(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  }

  // 최대값 helper 함수
  #maxNode(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  }

  // 최소값 helper 함수
  #findMinNode(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node;
    }
    return null;
  }
  // Search 함수 의 helper 함수
  #searchNode(node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return this.#searchNode(node.left, key);
    } else if (key > node.key) {
      return this.#searchNode(node.right, key);
      // key 와  node.key 가 같은 경우
    } else {
      return true;
    }
  }

  // remove helper 함수
  #removeNode(node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = this.#removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.#removeNode(node.right, key);
      return node;
      // key 와  node.key 가 같은 경우
    } else {
      // 경우 1. leaf 인 경우
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // 경우 2. 자식이 하나인 경우
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      //경우 3. 자식이 둘인 노드
      const aux = this.#findMinNode(node.right);
      node.key = aux.key;
      node.right = this.#removeNode(node.right, aux.key);
      return node;
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

  // 전위 순회 : 자기 자신을 가장 먼저 수행
  preOrderTraverse(callback) {
    this.#preOrderTraverseNode(this.root, callback);
  }

  // 후위 순회: 자기 자신을 가장 나중에 수행
  postOrderTraverse(callback) {
    this.#postOrderTraverse(this.root, callback);
  }

  // 최소값 : 가장 마지막 level의 가장 좌측의 값
  min() {
    return this.#minNode(this.root);
  }

  // 최대값: 가장 마지막 level의 가장 우측의 값
  max() {
    return this.#maxNode(this.root);
  }

  // 특정 key가 있는 지 Boolean 리턴
  search(key) {
    return this.#searchNode(this.root, key);
  }

  remove(key) {
    this.root = this.#removeNode(this.root, key);
  }
};
