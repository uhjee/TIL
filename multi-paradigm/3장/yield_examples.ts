/**
 * yield vs yield* 차이점 예제
 */

console.log('=== yield vs yield* 비교 ===\n');

// 1. yield - 단일 값 반환
function* yieldExample() {
  yield 1;
  yield [2, 3, 4]; // 배열 자체를 반환
  yield 'hello';
}

console.log('1. yield 예제:');
for (const value of yieldExample()) {
  console.log(value);
}
// 출력:
// 1
// [2, 3, 4]  <- 배열 자체가 하나의 값으로 반환
// hello

console.log('\n=== yield* 예제 ===\n');

// 2. yield* - 이터러블 위임
function* yieldStarExample() {
  yield 1;
  yield* [2, 3, 4]; // 배열의 각 요소를 개별적으로 yield
  yield 'hello';
}

console.log('2. yield* 예제:');
for (const value of yieldStarExample()) {
  console.log(value);
}
// 출력:
// 1
// 2  <- 배열의 요소들이 개별적으로 반환
// 3
// 4
// hello

console.log('\n=== 더 복잡한 예제 ===\n');

// 3. 제네레이터 함수를 yield*로 위임
function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}

function* letters() {
  yield 'a';
  yield 'b';
  yield 'c';
}

// yield 사용 - 제네레이터 객체 자체를 반환
function* combinedWithYield() {
  yield* ['시작'];
  yield numbers(); // 제네레이터 객체 자체를 반환
  yield* ['중간'];
  yield letters(); // 제네레이터 객체 자체를 반환
  yield* ['끝'];
}

console.log('3. yield로 제네레이터 반환:');
for (const value of combinedWithYield()) {
  console.log(value);
}

console.log('\n4. yield*로 제네레이터 위임:');
// yield* 사용 - 제네레이터의 모든 값을 위임
function* combinedWithYieldStar() {
  yield* ['시작'];
  yield* numbers(); // numbers()의 모든 값을 위임
  yield* ['중간'];
  yield* letters(); // letters()의 모든 값을 위임
  yield* ['끝'];
}

for (const value of combinedWithYieldStar()) {
  console.log(value);
}

console.log('\n=== 실용적인 예제 ===\n');

// 5. 트리 순회 예제
interface TreeNode {
  value: number;
  children?: TreeNode[];
}

const tree: TreeNode = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        { value: 4 },
        { value: 5 }
      ]
    },
    {
      value: 3,
      children: [
        { value: 6 },
        { value: 7 }
      ]
    }
  ]
};

// yield*를 사용한 깊이 우선 탐색
function* traverseTree(node: TreeNode): Generator<number> {
  yield node.value;
  
  if (node.children) {
    for (const child of node.children) {
      yield* traverseTree(child); // 재귀적으로 모든 값을 위임
    }
  }
}

console.log('5. 트리 순회 (yield* 사용):');
for (const value of traverseTree(tree)) {
  console.log(value);
}

// 6. 배열 평탄화 예제
function* flattenArray(arr: any[]): Generator<any> {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flattenArray(item); // 재귀적으로 배열을 평탄화
    } else {
      yield item;
    }
  }
}

console.log('\n6. 배열 평탄화:');
const nestedArray = [1, [2, 3], [4, [5, 6]], 7];
console.log('원본 배열:', nestedArray);
console.log('평탄화된 결과:');
for (const value of flattenArray(nestedArray)) {
  console.log(value);
}

// 7. 문자열 처리 예제
function* processStrings() {
  yield* 'Hello'; // 문자열의 각 문자를 개별적으로 yield
  yield ' ';
  yield* 'World'; // 문자열의 각 문자를 개별적으로 yield
}

console.log('\n7. 문자열 처리:');
const result = [...processStrings()].join('');
console.log('결과:', result);

// 각 문자 출력
console.log('각 문자:');
for (const char of processStrings()) {
  console.log(`'${char}'`);
}

// 이 파일을 모듈로 만들어 전역 스코프 충돌을 방지
export {}; 