const Dictionary = require('./dictionary');
const { Queue } = require('./queue');

module.exports = class Graph {
  vertices = []; // 정점의 명칭
  adjList = new Dictionary(); // 인접 리스트 key: 정점 명칭 , value: 인접 정점 리스트

  // 각 정점의 색을 초기화한다(white: 방문, 탐색하지 않음 / gray: 방문은 했으나 탐색 않음 / black: 탐색을 마침)
  #initializeColor() {
    let color = [];
    for (let i = 0; i < this.vertices.length; i++) {
      color[this.vertices[i]] = 'white';
    }
    return color;
  }

  // 정점 추가
  addVertex(v) {
    this.vertices.push(v); // 정점 추가
    this.adjList.set(v, []); // 정점 인접 리스트 추가
  }

  // 간선 추가
  addEdge(v, w) {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
  }

  toString() {
    let s = '';

    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;

      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += '\n';
    }
    return s;
  }

  // ! 너비 우선 탐색 : 기준 정점의 인접 정점부터 탐색
  // 방문한 정점을 담는 자료구조 : Queue
  bfs(v, callback) {
    let color = this.#initializeColor();

    // 방문/탐색 정점을 저장할 Queue intance
    const queue = new Queue();
    // 출발 지점이 될 시작 정점 v
    queue.enqueue(v);

    while (!queue.isEmpty()) {
      let u = queue.dequeue();
      // 인접 접점 목록 추출
      let neighbors = this.adjList.get(u);

      color[u] = 'grey';

      for (let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i];
        if (color[w] === 'white') {
          color[w] = 'grey';
          queue.enqueue(w);
        }

        color[u] = 'black';
        if (callback) {
          callback(u);
        }
      }
    }
  }
};
