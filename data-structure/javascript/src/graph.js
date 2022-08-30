const Dictionary = require('./dictionary');
const { Queue } = require('./queue');

module.exports = class Graph {
  vertices = []; // 정점의 명칭
  adjList = new Dictionary(); // 인접 리스트 key: 정점 명칭 , value: 인접 정점 리스트

  /**
   * 각 정점의 색을 초기화한다(white: 방문, 탐색하지 않음 / gray: 방문은 했으나 탐색 않음 / black: 탐색을 마침)
   *  @return [Array]
   */
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

    let d = []; // 시작정점v 와 u까지의 거리
    let pred = []; //최단 경로를 계산하기 위한 선행자

    // 출발 지점이 될 시작 정점 v
    queue.enqueue(v);

    while (!queue.isEmpty()) {
      // queue가 빌 때까지 순회
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
      }

      color[u] = 'black';
      if (callback) {
        callback(u);
      }
    }
  }

  // 기준 정점 v 로부터 각 정점에 대한 거리를 반환
  BFS(v) {
    let color = this.#initializeColor();

    // 방문/탐색 정점을 저장할 Queue intance
    const queue = new Queue();

    let d = []; // 시작정점v 와 u까지의 거리
    let pred = []; //최단 경로를 계산하기 위한 선행자

    // 출발 지점이 될 시작 정점 v
    queue.enqueue(v);

    // 최단 거리를 관련 초기화 반복문
    for (let i = 0; i < this.vertices.length; i++) {
      d[this.vertices[i]] = 0;
      pred[this.vertices[i]] = null;
    }

    while (!queue.isEmpty()) {
      // queue가 빌 때까지 순회
      let u = queue.dequeue();
      // 인접 접점 목록 추출
      let neighbors = this.adjList.get(u);

      color[u] = 'grey';

      for (let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i];
        if (color[w] === 'white') {
          color[w] = 'grey';

          d[w] = d[u] + 1; // w까지의 거리
          pred[w] = u; // 선행자 세팅
          queue.enqueue(w);
        }
      }

      color[u] = 'black';
    }
    return {
      distance: d,
      predecessors: pred,
    };
  }

  /**
   * 깊이 우선 탐색(dfs)  함수의 헬퍼함수
   * 재귀 호출을 통해 callstack에 쌓인다.
   */
  #dfsVisit(u, color, callback) {
    color[u] = 'grey';
    if (callback) {
      callback(u);
    }

    // 인접 리스트 조회
    const neighbors = this.adjList.get(u);

    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === 'white') {
        this.#dfsVisit(w, color, callback); // 인접 리스트의 각 정점들에 대해 재귀함수 호출
      }
    }
    color[u] = 'black';
  }

  dfs(callback) {
    const color = this.#initializeColor();

    for (let i = 0; i < this.vertices.length; i++) {
      if (color[this.vertices[i]] === 'white') {
        // 재귀 함수 호출
        this.#dfsVisit(this.vertices[i], color, callback);
      }
    }
  }

  // 소요된 시간(전역 관리)
  time = 0;

  /**
   * 깊이 우선 탐색(dfs)  함수의 헬퍼함수 - 방문 시간, 탐색 시간, 선행자
   * 재귀 호출을 통해 callstack에 쌓인다.
   */
  #DFSVisit(u, color, d, f, p) {
    console.log(`방문: ${u}`);
    color[u] = 'grey';
    // 시간 추가
    d[u] = ++this.time;

    // 인접 리스트 조회
    const neighbors = this.adjList.get(u);

    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === 'white') {
        p[w] = u;
        this.#DFSVisit(w, color, d, f, p); // 인접 리스트의 각 정점들에 대해 재귀함수 호출
      }
    }
    color[u] = 'black';
    f[u] = ++this.time;
    console.log(`탐색 : ${u}`);
  }

  DFS() {
    const color = this.#initializeColor();
    let d = []; // 방문 시간
    let f = []; // 탐색 시간
    let p = []; // 선행자
    this.time = 0; // time class property 초기화

    for (let i = 0; i < this.vertices.length; i++) {
      const tempU = this.vertices[i];
      f[tempU] = 0;
      d[tempU] = 0;
      p[tempU] = null;
    }

    for (let i = 0; i < this.vertices.length; i++) {
      if (color[this.vertices[i]] === 'white') {
        // 재귀 함수 호출
        this.#DFSVisit(this.vertices[i], color, d, f, p);
      }
    }
    return {
      discovery: d,
      finished: f,
      predecessors: p,
    };
  }
};
