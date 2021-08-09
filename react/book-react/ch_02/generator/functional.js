function* map(iterable, mapper) {
  for (const v of iterable) {
    yield mapper(v);
  }
}

function* filter(iterable, test) {
  for (const v of iterable) {
    if (test(v)) {
      yield v;
    }
  }
}

function* take(n, iterable) {
  for (const v of iterable) {
    if (n <= 0) return;
    yield v;
    n--;
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const mapResult = map('happy', v => `value: ${v}`);
// console.log([...mapResult]); // generator 객체이기 때문에 speard 연산자로 펴준다.
const takeResult = take(2, arr);
// console.log([...takeResult]);

// const result = take(
//   3,
//   map(
//     filter(arr, n => n % 2 === 0),
//     n => n * 10,
//   ),
// );
// console.log([...result]);

// ! 자연수의 집합 표현
function* naturalNums() {
  let v = 1;
  while (true) {
    // 무한 루프 실행 (하지만 제네레이터 특성 덕에 무한 돌지 않음)
    yield v++;
  }
}

const values = naturalNums();

const result = take(
  3,
  map(
    filter(values, n => n % 2 === 0),
    n => n * 10,
  ),
);
// console.log([...result]);

function* g1() {
  yield 2;
  yield 3;
}

function* g2() {
  yield 1;
  yield* g1(); // 제네레이터 호출
  yield 4;
}

// console.log(...g2()); // 1 2 3 4

// ! next 메소드를 활용해 제네레이터 함수로 데이터 전달하기
function* f5() {
  const data1 = yield;
  console.log(data1);
  const data2 = yield;
  console.log(data2);
}

const gen5 = f5();
gen5.next(); // 제네레이터 함수의 실행이 시작되도록 하는 역할
gen5.next(10);
gen5.next(20);

// ! 협업 멀티 태스킹
function* minsu() {
  const myMsgList = [
    '안녕 나는 민수야',
    '만나서 반가워',
    '내일 영화 볼래?',
    '시간 안되니?',
    '내일 모레는 어때?',
  ];
  for (const msg of myMsgList) {
    console.log('수지: ', yield msg); // yield를 통해 자발적으로 멈춤
  }
}

function suji() {
  const myMsgList = ['', '안녕 나는 수지야', '그래 반가워', '...'];
  const gen = minsu(); // 제네레이터 객체
  for (const msg of myMsgList) {
    console.log('민수:', gen.next(msg).value);
  }
}

// suji();

// ! 예외처리
function* genFunc() {
  throw new Error('some error');
}

function func() {
  const gen = genFunc(); // 제네레이터 객체 생성시에는 에러 발생 X
  try {
    gen.next(); // 이 때 에러 발생
  } catch (e) {
    console.log('in catch: ', e);
  }
}

func();
