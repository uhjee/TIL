# 2장. ES6+ / Promise

# 2.1. 변수 정의 키워드 const, let

### 2.1.1. var 키워드의 문제점

참고

[var, let, constant](https://www.notion.so/var-let-constant-258aacb2234246f18dd146f66408025f) 
[(완)TDZ(Temporal Dead Zone)이란?](https://www.notion.so/TDZ-Temporal-Dead-Zone-576fbd401b194e4b97ebb50332c18a13) 

1. 함수 스코프를 가진다

    따라서 for 반복문에서 사용되는 var 변수는 계속 메모리에 남아있게 된다. 신기하게도...

    이를 해결하기 위해 IIFE 사용

    ```jsx
    // IIFE 를 통한 for문 var 변수의 스코프 제한
    (function () {
        var index;
        for(var i = 0; i< 10 ;i+=1){
            index = i;
        }
        console.log(index);
    })()
    console.log(i); // reference error 발생
    ```

    이를 제한하기 위해 즉시실행함수 사용

2. 호이스팅
3. 변수 재정의 가능

### 2.1.2. const, let 키워드

- 변수 스코프
    - 일반적인 프로그래밍에서 사용하는 개념 {} 사이에 변수에 대한 참조를 가둔다.
    - 바깥에서 접근하려고 하면 에러 발생
- 호이스팅
    - 호이스팅 자체는 이루어지나, 변수의 메모리에 대한 초기화가 이루어지지 않아, 참조하려고 하면, reference 에러 발생(TDZ 개념)
- const 는 재할당이 불가능할 뿐, 내부의 프로퍼티 추가 및 수정이 가능하다.

## 2.2 객체와 배열의 사용성 개선

### 2.2.1 객체와 배열을 간편하게 생성하고 수정하기

### 단축 속성명 (shorthand property names)

객체 리터럴 코드를 간편하게 작성 가능

```jsx
const name = 'jee';
const obj = {
	name, // 변수명과 프로퍼티 명이 같을 경우 해당 변수명만 작성
	age: 17,
}
```

### 계산된 속성명(computed property names)

`[ ]` 를 사용해 객체의 속성명을 동적으로 결정

```jsx
const obj = {};

const insert = (obj, key, value) => {
	obj[key] = value;
}
```

계산된 속성명을 사용해 컴포넌트 상태값(state) 변경하기

```jsx
class MyComponent extends React.Component {
  state = {
    countl: 0,
    count2: 0,
    count3: 0,
  };
  // ...
  onClick = index => {
    const key = 'count${index}';
    const value = this.state[key];
    this.setState({ [key]: value + 1 });
    O;
  };
}
```

### 전개 연산자 (spread operator)

배열이나 객체의 모든 속성을 풀어놓을 때 사용

```jsx
const arr = [1, 3, 5, 2, 7, 9];

const max = Math.max(...arr); // 9
```

- 객체를 복사할 때 유용
- 배열의 경우, 작성시와 같이 순서가 유지됨
- 두 개의 객체를 병합 가능
    - 중복된 프로퍼티명은 가장 마지막의 프로퍼티 값으로 인식

### 배열 비구조화(array destructuring)

순서가 중요하다.

```jsx
const arr = [1, 2, 3, 4, 5];

const [first, ...rest] = arr;

console.log(first); // [1]
console.log(rest);  // [2,3,4,5]
```

### 🔥 객체 비구조화(object destructuring)

순서 관계없음

```jsx
const obj = {age: 21, name: 'jee'};
const {age, name} = obj;

console.log(age); // 21
console.log(name); // jee
```

별칭 사용

```jsx
const obj = {age: 21, name: 'jee'};
const {age : newAge, name : newName} = obj; // 별칭 부여

console.log(newAge); // 21
console.log(newName); // jee
```

- 별칭은 변수명만 가능한 게 아니다. 참조로써 사용 가능

    ```jsx
    const result = {};
    ({foo: result.a, bar: result.b} = {foo: 123, bar: true});

    console.log(result); // {foo: 123, bar: true}
    ```

기본값 할당

`undefined` 인 경우에만 기본값이 세팅된다. 

⚠️ null 은 기본값 세팅이 되지 않으므로 주의

```jsx
const obj = {age: undefined, name: 'jee'};
const {age = 0, name} = obj; // * 기본값 세팅

console.log(age); // 0
console.log(name); // jee
```

for of 문에서 객체 비구조화 활용

```jsx
const arr = [
  {
    name: 'chuchara',
    age: 156,
    address: '너무 맛있는 곳',
  },
  {
    name: 'jeejee',
    age: 16,
    address: 'lalalasi lalalagu',
  },
];

for (const { name, age } of arr) { // 비구조화로 변수 선언
  console.log(`${name} 은 ${age}살`)
}
```

객체 비구조화에서 계산된 프로퍼티명 사용

- 반드시 별칭을 사용해야 한다.

```jsx
const index = 1;
const {[`key${index}`] : value} = {key1: 123};
```

## 2.3 강화된 함수의 기능

### 2.3.1 매개변수 기능

### 매개변수 기본값

⚠️ undefined인 경우에만 기본값 할당

```jsx
function printNum(num = 1) {
	console.log(num);
}

printNum() // 1
```

기본값으로 함수를 사용해 필수값 표현

⚠️ undefined인 경우에만 호출!

```jsx
const required = () => {
	throw new Error('no param!');
}

const printNum(num = required()) => {
	console.log(num);
}

printNum() // no param 에러 발생
```

### 나머지 매개변수

하나씩 분해해주는 spread operator 와 달리 여러 매개변수를 하나의 배열로 모아주는 개념

```jsx
const printLog = (...rest) => console.log(rest);

printLog(1, 2) // [1, 2]
```

### 명명된 매개변수

### 2.3.2 화살표 함수

일반함수와의 차이점

- this, arguments를 바인딩하지 않는다

## 2.4 향상된 비동기 프로그래밍 1: 프로미스

### 2.4.1 프로미스 이해하기

### 콜백 패턴의 문제

콜백이 중첩될 경우 코드가 상당히 복잡해진다.

코드 흐름이 순차적이지 않기 때문에 가독성이 떨어진다.

### 프로미스 세 가지 상태

1. 대기 중
2. 이행됨
3. 거부됨

### 프로미스 생성 방법

1. new 키워드로 프로미스 생성

    ```jsx
    const p1 = new Promise((resolve, reject) => {...});
    ```

2. 프로미스 스태틱 메소드 reject 사용

    ```jsx
    const p2 = Promise.reject('error message');
    ```

3. 프로미스 스태틱 메소드 resolve 사용

    ```jsx
    const p3 = Promise.resolve(param);
    ```

### 프로미스 호출(사용) 구조

```jsx
requestData() // promise객체 호출
	.then(data => {
		// ...
	}
	.catch(error => {
		// ...
	}
	.finally(() => {
		// ...
	});
```

### 2.4.2 프로미스 활용하기

### 병렬로 처리하기 : Promise.all

여러 개의 프로미스를 병렬로 처리할 때 사용하는 함수

then을 사용할 경우, 직렬(순서가 보장되며)로 실행되기 때문에, 여러 개의 비동기 처리를 병렬로 처리할 수 없는 단점이 존재

```jsx
Promise.all([
	requestData1(),
	requestData2(),	
	requestData3(),	
])
	.then(([data1, data2]) => {
		
	});
```

`Promise.all()` 은 프로미스의 객체를 매개변수로 받고, 프로미스를 반환한다.

입력된 모든 프로미스가 이행됨 상태가 되어야 이행됨 상태가 된다.

하나라도 거부됨 상태가 된 경우, 거부됨 상태 

### 가장 빨리 처리된 프로미스 가져오기 : Promise.race

### 프로미스를 이용한 데이터 캐싱

처리됨(이행됨) 상태가 되면, 그 상태를 유지하는 프로미스의 성질을 이용해 데이터 캐싱 가능

```jsx
let cachedPromise;
function getData() {
	cachedPromise = cachedPromise || requestData();
	return cachedPromise;
}
```

### 2.4.3 프로미스 사용 시 주의할 점

1. return 키워드 깜빡하지 않기

    ```jsx
    Promise.resolve(10)
    	.then((data) => {
    		Promise.resolve(20); // return 키워드 빼먹음   (1)
    	})
    	.then(data => {
    		console.log(data); // undefined (1) 에 return 을 작성해야 20 출력
    	});
    ```

2. 프로미스는 불변 객체라는 사실 명심
3. 프로미스를 중첩해서 사용하지 않기
4. 동기 코드의 예외처리 신경 쓰기

## 2.5 향상된 비동기 프로그래밍 2: async - await

비동기 프로그래밍을 동기 프로그래밍처럼 순차적으로 작성할 수 있도록 함수에 추가된 기능

### 2.5.1 async - await 이해하기

### async 키워드를 사용한 함수는 프로미스 객체를 리턴한다.

함수 내부에서 어떤 데이터를 리턴하는지 여부에 관계없이 프로미스 객체 리턴

1. 일반 데이터를 리턴

    ```jsx
    // async 함수
    async function getData(){
    	return 123;  // * Number 타입 리턴
    }

    // 사용 (promise 객체의 then 사용)
    getData().then(data => console.log(data)); // 123
    ```

2. 직접 프로미스 객체 리턴 → 해당 객체 그대로 리턴

    ```jsx
    // async 함수
    async function getData() {
    	return Promise.resolve(123); // Promise 타입 리턴
    }

    // 사용 (promise 객체의 then 사용)
    getData().then(data => console.log(data)); // 123
    ```

### await 키워드 사용법

- async 함수 내부에서 사용
- await 키워드 우측에 프로미스를 작성하면, 해당 프로미스가 처리됨(fullfiled OR rejected) 상태가 될 때까지 기다림
- 따라서 비동기 요청을 순차적으로 작성할 수 있다.

### 장점

- 프로미스로 작성한 코드보다 가독성이 뛰어남
    - 비동기 함수간 의존성이 높아질수록 뛰어남
        1. 프로미스로 작성

            ```jsx
            const getDataPromise = () => {
            	return asyncFunc1()
            		// all 메소드의 파라미터로 다음 then에 데이터 전달
            		.then(data1 => Promise.all([data1, asyncFun2(data1)])) 
            		.then(([data1, data2]) => {
            			return asyncFunc3(data1, data2);
            		})
            }
            ```

        2. async-await로 작성

            ```jsx
            const getDataAsync = async () => {
            	const data1 = await asyncFunc1();
            	const data2 = await asyncFunc2(data1);
            	return asyncFunc3(data1, data2);
            }
            ```

### 2.5.2 async-await 활용

### 비동기 함수를 병렬로 실행하기

- await 키워드를 나중에 사용하기
    - 프로미스 객체를 미리 생성 후, 기다리기 때문에 비동기함수는 병렬 처리된다.

        ```jsx
        async function getData() {
        	// 하위 두개 메소드 병렬로 요청 처리
        	const p1 = asyncFunc1();
        	const p2 = asyncFunc2();

        	// await 키워드를 뒤에 사용
        	const data1 = await p1; 
        	const data2 = await p2;
        }
        ```

        ```jsx
        // Promise.all 메소드를 활용해 더 간단히 표현
        async function getData() {
        	const [data1, data2] = await Promise.all([asyncFunc1(), asyncFunc2()]);
        }
        ```

### 예외처리

- try-catch 문 사용

```jsx
async function getData() {
	try {
	
		await doAsync();
		return doSync();
	
	} catch (error) {
		console.log(error);
	}
}
```

### Thenable 을 지원하는 async - await

- Thenable 인터페이스

    : 프로미스 객체가 아니더라도, then 메소드를 가진 객체

    async-await 는 ES6의 프로미스가 아니더라도 then 메소드를 가진 객체를 프로미스처럼 취급

    ```jsx
    // Thenable 객체 선언
    class ThenableExample {
    	then(resolve, reject) {
    		setTimeout(() => resolve(123), 1000);
    	}
    }

    // promise 처럼 사용 가능
    async function asyncFunc() {
    	const result = awiat new ThenableExample();
    	console.log(result); // 123
    }
    ```

## 2.6 템플릿 리터럴로 동적 문자열 생성

```jsx
const name = 'mike';
const score = 80;
 
const msg = `${name}은 ${score}점을 얻었다.`;
```

- 줄 바꿈도 인식한다.

    ```jsx
    // 줄 바꿈 인식
    const multiLine = `name: ${name}
    age: ${age}
    score: ${score}
    `;
    ```

## 2.7 실행을 멈출 수 있는 제네레이터

### Generator

: 함수의 실행을 중간에 멈추고 재개할 수 있는 독특한 기능

실행을 멈출 때, 값을 전달할 수 있기 때문에 반복문에서 제네레이터가 전달하는 값을 하나씩 꺼내서 사용할 수 있다.

⚠ 보통 컬렉션과 달리 값을 미리 만들어 놓지 않는다. (메모리 측면에서 효율적)

다른 함수와 협업 멀티태스킹  가능

### 2.7.1 제네레이터 이해하기

제네레이터는 아래 두개로 구성

1. 별표로 정의된 함수
2. 그 함수가 반환하는 제네레이터 객체(제네레이터 객체가 iterable 객체(next 메소드를 갖는 인터페이스))
    - `next`, `return`, `throw` 메소드를 갖고 있다.
        - next 메소드: value, done 프로퍼티를 갖는다.

간단 예제 코드

```jsx
// 제네레이터 함수 정의
function* f1() {
	try {
		console.log('#1');
		yield 10;
		console.log('#2');
		yield 20;
		console.log('#3');
		return 'finished';
	} catch(e) {
		console.log('# error: ', e);
	}
}

const gen = f1(); // 제네레이터 객체를 반환 * 내부코드는 아직 실행 x
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
```

아래와 같이 콘솔 출력

```jsx
// #1
// { value: 10, done: false }
// #2
// { value: 20, done: false }
// #3
// { value: finished, done: true }
```

- return 메소드

    return 메소드를 사용하면, 제네레이터 객체의 done 프로퍼티는 true로 변경

    ```jsx
    const gen = f1();
    console.log(gen.next());
    console.log(get.return('abc'));
    console.log(gen.next());

    // #1
    // { value: 10, done: false }
    // { value: 'abc', done: true }
    // { value: undefined, done: true }

    ```

- throw 메소드

    throw 메소드를 호출하면, 제네레이터 함수에 정의된 catch문으로 이동

    제네레이터 객체의 done 프로퍼티는 true로 변경

### 반복 가능하면서 반복자인 제네레이터 객체

: Iterable 객체이면서 Iterator 인 Generator 객체

- 반복자 Iterator
    - next 메소드를 갖고있다.
    - next 메소드는 value와 done 프로퍼티를 가진 객체를 반환한다.
    - done 속성값은 작업이 끝났을 때 참이 된다.

- 반복 가능한 객체 Iterable
    - `Symbol.iterator` 프로퍼티의 값으로 함수를 갖고 있다.
    - 해당 함수를 호출하면 반복자 Iterator를 반환한다.
    - Iterable 객체의 활용
        1. for... of 문
            - for...of 문은 반복 가능한 객체(Iterable)로부터 반복자(Iterator)를 얻는다.
            - 얻은 반복자를 통해 done 의 값이 true가 될 때까지 반복
        2. spread operator
            - 전개 연산자도 마찬가지로 done 값이 true가 될 때까지 반복

        ```jsx
        function* f2() {
          yield 10;
          yield 20;
          yield 30;
        }

        // 01. for...of
        for (const x of f2()) {
          console.log(x);
        }

        //10
        //20
        //30

        // 02. spread operator
        console.log([...f2()]);
        // [ 10, 20, 30 ]
        ```

    - 문자열, 배열은 대표적인 Iterable 객체

        ```jsx
        // ! Iterable 반복가능한 객체
        const arr = [1, 2, 3, 4];
        const iter = arr[Symbol.iterator]();
        console.log(iter.next());
        console.log(iter.next());

        //{ value: 1, done: false }
        //{ value: 2, done: false }
        ```

- 제네레이터 객체는 Iterable 이면서 Iterator이다.

    Symbol.iterator 의 반환값이 자기 자신

    ```jsx
    console.log(gen[Symbol.iterator]() === gen); // true
    ```

### 2.7.2 제네레이터 활용하기

함수형 프로그래밍의 대표적인 함수를 쉽게 구현할 수 있다...

- 제네레이터를 사용해 만든 함수들은 제네레이터 덕분에 새로운 배열 객체를 생성하지 않는다.

```jsx
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

// 호출
const result = take(
  3,
  map(
    filter(arr, n => n % 2 === 0),
    n => n * 10,
  ),
);
console.log([...result]);
```

### 지연 평가 lazy evaluation

연산이 필요한 순간에만 실행된다.(yield 개념)

값이 필요할 때만 제네레이터 객체를 통해 다음 값을 요청한다.

```jsx
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
console.log([...result]); // [ 20, 40, 60 ]
```

- 위 코드는 제네레이터가 아니라면 프로그램이 뻗기 좋은 무한 루프 실행

### 제네레이터 함수끼리 호출하기

- `yield*` 사용
- `yield*` 우측에는 반복가능한 객체(Iterable)가 올 수 있도록 설계됨

    ```jsx
    function* g1() {
      yield 2;
      yield 3;
    }

    function* g2() {
      yield 1;
      yield* g1(); // 제네레이터 호출
      yield 4;
    }

    console.log(...g2()); // 1 2 3 4
    ```

    위의 g2는 아래와 같이 표현 가능

    ```jsx
    function* g2() {
      yield 1;
    	for(const v of g1()) { // 제네레이터(이터러블 객체)를 for ...of로 돌린다
    		yield v;
    	}
      yield 4;
    }

    function* g2() {
      yield 1;
    	yield* [2, 3]; // 배열도 이터러블
      yield 4;
    }
    ```

### 제네레이터 함수로 데이터 전달하기

제네레이터 함수는 외부로부터 데이터를 받아서 소비할 수 있다.

next 메소드를 호출하는 쪽에서 next 메소드의 인수로 제네레이터 함수로 데이터 전달 가능

next 메소드를 통해 전달된 인수는 `yield` 결과값으로 받을 수 있다.

```jsx
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
```

### 협업 멀티태스킹

제네레이터는 다른 함수와 협업 멀티태스킹을 할 수 있다.

멀티태스킹: 여러 개의 태스크를 실행할 때, 하나의 태스크가 종료되기 전에 멈추고 다른 태스크가 실행되는 것

제네레이터는 실행을 멈추는 시점을 자발적으로 선택(yield 키워드를 통해)

```jsx
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

suji();

//민수: 안녕 나는 민수야
//수지:  안녕 나는 수지야
//민수: 만나서 반가워
//수지:  그래 반가워
//민수: 내일 영화 볼래?
//수지:  ...
//민수: 시간 안되니?
```

### 제네레이터 함수에서 예외가 발생한 경우

```jsx
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
```

- next를 호출할 때 에러 발생 → catch문으로 이동