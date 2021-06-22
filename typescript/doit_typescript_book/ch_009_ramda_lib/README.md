# ch.009 ramda library

## 09-1. ramda 라이브러리 개요

## 09-02. ramda 기본 사용법

### range 함수

```typescript
R.range(최소값, 최댓값)
```

- 최소값부터 최댓값-1까지 연속된 숫자 배열 생성

### tap 함수 - debugging

```typescript
R.tap(콜백함수)(배열)
```

### pipe 함수

- 함수를 조합하는 함수

사용(호출)

```typescript
import { range, pipe, tap } from 'ramda'

const array: number[] = range(1, 9 + 1)

// ! pipe 함수 사용
pipe(
  //
  tap((n) => console.log(n)),
)(array)

```

포인트가 없는 함수, 부분함수로 사용

```typescript
import { range, pipe, tap } from 'ramda'

// ! 포인트가 없는 함수 : 2차 고차 함수로 1번만 인자가 입력된 상태? 부분함수? 생성
export const dump = pipe(
  //
  tap((n) => console.log(n)),
)

// 마지막 파라미터 받음
dump(range(1, 100 + 1))

```

포인트가 없는 함수로 dump를 생성할 시, 반환값이 any가 되게 된다.

따라서  type assertion(타입 단언)을 사용해서 선언, 반환값 타입을 `T[]`로 변경

```typescript
// type assertion 타입 단언 사용 
//  - 반환값의 타입을 any -> T[]  변경
export const dump = <T>(array: T[]): T[] =>
  pipe(
    //
    tap((n) => console.log(n)),
  )(array) as T[] // 반환값 자체가 T[] 로 명시(명시적 형변환 느낌)
```

- **타입단언**: typescript의 타입추론 기능이 강력하긴 하지만, 필요에 따라, 수동으로 컴파일러에게 특정 변수에 대해 타입 힌트를 줘야할 때가 있다.

  (java 의 명시적 형변환 느낌이지만, 타입단언은 runtime에 영향을 미치지 않는다. 오로지 comple시에만 타입을 변경한다)

### 자동 커리 auto curry

람다 라이브러리 함수들은 다음과 같이 사용 가능

1. 매개변수 2개인 일반함수처럼 사용
2. 2차 고차함수로 사용

```typescript
import * as R from 'ramda'
console.log(  
    R.add(1, 2),   // 3   - 일반 함수
    R.add(1)(2)    // 3   - 고차 함수
)
```

### R.curryN 함수

람다 라이브러리 함수들은 자동 커리를 지원하기 위해, 매개변수의 개수를 모두 정해두었다.

따라서 다음과 같이 가변 인수 형태로 구현되지 않았다고 한다.

```typescript
export const sum = (...numbers: number[]): number => 
	numbers.reduce((result: number, sum: number) => result + sum, 0)

//호출
console.log(sum(1, 2, 3, 4))// 10
```

curryN 함수는 위와 같은 **'가변 인수를 받는 1차함수'**를 **'N개의 커리 매개변수를 받는 N차 고차함수'**로 변경한다

```typescript
R.curryN(N, 함수)
```

```typescript
//구현
const currySum: Function = curryN(4, sum)

```

```typescript
//호출

console.log(  			
    currySum(),            // [Function]  
	currySum(1),           // [Function]  
	currySum(1)(2),        // [Function]  
	currySum(1)(2)(3),     // [Function]  
	currySum(1)(2)(3)(4)   // 10
)

console.log(sum(1, 2, 3, 4))// 10
console.log(currySum(1)(2)(3)(4)) // 10
```



### 순수함수 pure function

람다 라이브러리는 순수함수를 고려해 설계되었다.]

따라서 항상 파라미터의 상태를 변화시키지 않고, 새로운 값을 반환한다.(외부 데이터에 영향 x)

예제

```typescript
import { pipe, map, add } from 'ramda';

const originArray: number[] = [1, 2, 3];
const resultArray = pipe(
  //
  map(add(1)),
)(originArray);

console.log(originArray); // [ 1, 2, 3 ] 파라미터에 영향 x
console.log(resultArray); // [ 2, 3, 4 ]
```



## 09-3. 배열에 담긴 수 다루기

### 선언형 프로그래밍 declarative programming

- 보통 함수형은 선언형으로 코드 작성

- 선언형 프로그래밍에서는 단순 데이터 값보다 배열 형태를 주로 사용

  ```typescript
  import * as R from 'ramda'
  
  // ! 기존 명령형 코드 - '값' 으로 데이터를 다룸
  const value = 1
  const newValue: number = R.inc(value)
  console.log(newValue)
  
  // ! 선언형 - '배열'로 데이터를 다룸
  const newArray: number[] = R.pipe(R.map(R.inc))([value])
  console.log(newArray)
  ```

- tap으로 디버깅

  - pipe 안에서는 console.log를 직접  호출할 수 없다.

  ```typescript
  import * as R from 'ramda'
  
  // ! tap() 사용 - 로직 앞 뒤로 콘솔찍기
  const numbers: number[] = R.range(1, 9 + 1)
  
  // incNumbers라는 1차함수 만들기
  const incNumbers: Function = R.pipe(
    //
    R.tap((a) => console.log(`before inc: ${a}`)),
    R.map(R.inc),
    R.tap((a) => console.log(`after inc:  ${a}`)),
  )
  
  incNumbers(numbers)
  ```

  

### 사칙 연산 함수

```typescript
import * as R from 'ramda';

R.add(a: number)(b: number); // a + b
R.subtract(a: number)(b: number); // a - b
R.multiply(a: number)(b: number); // a * b
R.divide(a: number)(b: number); // a/b
```

- inc() 함수

  사실 add()를 사용해 만든 함수

  - **포인트가 있는 함수**로 구현

    ```typescript
    const inc (b: number): number => R.add(1)(b)
    ```

    

  - **포인트가 없는 함수**로 구현

    ```typescript
    const inc = R.add(1)
    ```

    

  - map 함수 내부에서 포인트가 있는 형태로 사용

    ```typescript
    R.map((n: number) => inc(n))
    ```

    이는 익명의 콜백함수를 만들어 map의 인자로 넘겨주는 형태

    inc() 자체가 콜백으로 동작할 수 있기 때문에 다음과 같이 표현 가능

    ```typescript
    R.map(inc)
    // of
    R.map(R.add(1))
    ```

    

### R.addIndex 함수

- R.map은 Array.prototype.map() 과 같이 index를 매개변수로 사용할 수 없다. 직접 새로운 함수를 만들어야 한다.

```typescript
const indexedMap = R.addIndex(R.map)
```

사용

```typescript
// 두 번째 매개변수로 index 제공
const indexedMap = R.addIndex(R.map);

const result = indexedMap(
  //
  (v: number, i: number) => R.add(v, i),
)(R.range(1, 5));

console.log(result); // [ 1, 3, 5, 7 ]
```



### R.flip

: 콜백함수의  매개변수 순서를 변경한다.(콜백함수는 2차 고차함수)

- R.subtract, R.divide는 매개변수의 순서에 따라 결과값이 달라진다.
- 따라서 매개변수의 순서를 변경할 수 있는 함수 필요

순서 변경 전 (10 - value)

```typescript
// subtract, divide 는 매개변수의 순서에 따라 값이 달라진다.
const subtract10 = R.subtract(10);

R.pipe(
  //
  R.map(subtract10), // 10 - value
  R.tap((n) => console.log(n)),
)(R.range(1, 10));

```

순서 변경 후(value - 10)

```typescript
// ! R.flip : 매개변수의 순서를 거꾸로 변경한다.
const subR = R.flip(R.subtract);

const subR10 = subR(10);

R.pipe(
  //
  R.map(subR10), // value - 10
  R.tap((n) => console.log(n)),
)(R.range(1, 9 + 1));
```



### 지수 연산자

```typescript
// 지수 연산자 **
// x의 n승 => x ** n
console.log(2 ** 10 // 1024
```



### 사칙 연산 함수들의 조합

> f(x) = ax2 + bx + c 수식 typescript 표현

1. typescirpt 로 구현

   ```typescript
   
   // * type 선언
   type NumberToNUmberFunc = (number) => number;
   
   // * 001. typescript 로 구현
   
   export const f =
     (a: number, b: number, c: number): NumberToNUmberFunc =>
     //
     (x: number): number =>
       a * x ** 2 + b * x + c;
   ```

   

2. ramda 사용해서 구현  - 고차함수들의 연속

   ```typescript
   // * 002. ramda 라이브러리 사용
   // R.add 는 2차 고차함수라는 걸 기억하자
   
   // 제곱을 구하는 2차함수 exp(N)(x) -> x의 N승
   const exp =
     (N: number) =>
     (x: number): number =>
       x ** N;
   
   const square = exp(2);
   
   // 괄호의 대 환장 파티...
   export const fUsingRamda =
     (a: number, b: number, c: number): NumberToNUmberFunc =>
     (x: number): number =>
       R.add(
         //
         R.add(
           //
           R.multiply(a)(square(x)),
         )(R.multiply(b)(x)),
   
         c,
       );
   
   console.log(fUsingRamda(2, 2, 2)(2));
   ```

   

## 09 - 4 서술자와 조건 연산

### 서술자 predicate

: Array.prototype.fileter의 콜백함수는 boolean 타입을 반환하는 함수

함수형 프로그래밍에서는 boolean 타입을 반환해, 어떤 조건에 부합하는 지 여부를 판단하는 함수를 **서술자**라 부름

```typescript
// * ramda 에서 제공하는 predicate 들
// 순서가 몹시 헷갈린다...
 R.lt(a)(b): boolean // a < b
```

```typescript
 R.lte(a)(b) : boolean // a < =  b
```

```typescript
 R.gt(a)(b): boolean // a > b
```

```typescript
 R.gte(a)(b):boolean // a > = b
```



### R.filter

- 콜백함수로 위의 predicate 함수를 사용
- `R.lte(3)(x)` 의 식은 `3 <= x` 을 의미

3보다 같거나 큰 수

```typescript
R.pipe(
  R.filter(R.lte(3)),
  R.tap((v) => console.log(v)),
)(R.range(1, 10));
// [  3, 4, 5, 6,  7, 8, 9 ]
```



7보다 작은 수

```typescript
//* 7보다 작은 수 뽑기
R.pipe(
  R.filter(R.gt(7)),
  R.tap((v) => console.log(v)),
)(R.range(1, 10));
```



3과 같거나 크고, 7보다 작은 수 - R.filter 함수 두 번 사용

```typescript
// * 3보다 같거나 크고 7보다 작은 수 뽑기
R.pipe(
  R.filter(R.lte(3)),
  R.filter(R.gt(7)),
  R.tap((v) => console.log(v)),
)(R.range(1, 10));
```



### R.allPass, R.anyPass

```typescript
R.allPass(predicate 배열)	// 베열의 조건을 모두 만족하면 true
```

```typescript
R.anyPass(predicate 배열) // 배열의 조건을 하나라도 만족하면 true 
```

3보다 크거나 같고 7보다 작은 수인지 판단하는 함수 생성

```typescript
import * as R from 'ramda';

type NumberToBooleanFunc = (n: number) => boolean;

// * min 과 같거나 크고 max보다 작은 범의의 수인지 판단하는 selectRange
export const selectRange = (min: number, max: number): NumberToBooleanFunc =>
  //
  R.allPass([R.lte(min), R.gt(max)]);
```

위 함수 사용 (포인트가 없는 함수로) - R.filter 함수 한 번 사용

```typescript
R.pipe(
  R.filter(selectRange(3, 6 + 1)),
  R.tap((v) => console.log(v)), // [ 3, 4, 5, 6 ]
)(R.range(1, 10));
```



### R.not 함수

: 입력이 true이면 false 반환, false면 true 반환

```typescript
import * as R from 'ramda';
import { selectRange } from './allPass_anyPass';

export const notRange = (min: number, max: number) =>
  //
  R.pipe(
    selectRange(min, max), 
    R.not // not 사용!
  );
```

호출

```typescript
// 호출
R.pipe(
  R.filter(notRange(3, 6 + 1)),
  R.tap((n) => console.log(n)), // [ 1, 2, 7, 8, 9 ]
)(R.range(1, 10)); 
```

### R.ifElse 함수

```typescript
R.ifElse(
  조건서술자,
  true일때실행할함수,
  false일때실행할함수
);
```

1부터 10까지 수 배열을 인자로 받고, 중간값인 6보다 같거나 큰 수는 1씩 증가, 작은 수는 1씩 감소

```typescript
import * as R from 'ramda';

// 1부터 10까지 수에서 중간값인 6보다 작은 수는 1씩 감소시키고, 같거나 큰 수는 1씩 증가시키는

const input: number[] = R.range(1, 10 + 1);
const halfValue = input[input.length / 2];

const subtractOrAdd = R.pipe(
  R.map(
    R.ifElse(
      R.lte(halfValue), // x => half <= x
      R.inc,
      R.dec,
    ),
  ),
  R.tap((n) => console.log(n)),
);

const result = subtractOrAdd(input); // [  0, 1, 2,  3,  4,   7, 8, 9, 10, 11]

```



## 09-5 문자열 다루기

### trim 문자열 앞 뒤의 백색 문자 자르기 

```typescript
import * as R from 'ramda';

// ! type 선언
type StringToStringFunc = (string) => string;

// * trim
console.log(R.trim('\t hello         \n'));

// * toLower, toUpper
console.log(
  //
  R.toLower('HELLO, lolLOLELO'),
  R.toUpper('hellohello?'),
);

// * split(구분자)(문자열)
const words: string[] = R.split(' ')('hello my name is jee jee jee');
console.log(words);

// * join(구분자)(문자열)
console.log(R.join('_')(words));

// * toCamelCase -> 'no overload matches thius call' error 발생
const toCamelCase = (delim: string): StringToStringFunc => {
  const makeFirstToCapital = (word: string) => {
    const characters = word.split('');
    return characters.map((c, index) => (index === 0 ? c.toUpperCase() : c)).join('');
  };

  const indexedMap = R.addIndex(R.map);
  return R.pipe(
    R.trim,
    R.split(delim),
    R.map(R.toLower),
    indexedMap((value: string, index: number) =>
      index > 0
        ? //
          makeFirstToCapital(value)
        : value,
    ),
    // R.join(''), // 'no overload matches thius call' error 발생
  ) as StringToStringFunc;
};

console.log(toCamelCase(' ')('fuck the word'));
```

## 09-7. 렌즈를 이용한 객체의 속성 다루기

### 렌즈

: 하스켈 언어의 Control.Lens 라이브러리 내용 중, js 에서 동작할 수 있는 getter, setter 기능만 람다 함수로 구현한 것

속성 값을 얻구나 재할당하는 기능을 쉽게 할 수 있다.

> 1. R.lens 함수로 객체의 특정 속성에 대한 렌즈를 만든다
> 2. 렌즈를 R.view 함수에 적용해 속성값을 얻는다.
> 3. 렌즈를 R.set 함수에 적용해 속성값이 바뀐 새로운 객체를 얻는다.
> 4. 렌즈와 속성값을 바꾸는 함수를 R.over 함수에 적용해 값이 바뀐 새로운 객체를 얻는다.

### R.prop

: 객체의 속성값을 가져오는 함수; getter

### R.assoc

: 객체의 속성값 세팅하는 함수; setter

### R.lens

: 렌즈 기능 사용을 위해 렌즈 생성

```typescript
export const makeLens = (propName: string) => R.lens(R.prop(propName), R.assoc(propName))
```

### R.view, R.set, R.over

다음과 같은 getter, setter, 함수를 사용한 setter 생성

```typescript
import * as R from 'ramda'

export const makeLens = (propName: string) => 
R.lens(R.prop(propName), R.assoc(propName))

export const getter = (lens) => R.view(lens)
export const setter = (lens) => <T>(newValue: T) => R.set(lens, newValue)
export const setterUsingFunc = (lens) => <T,R>(func: (T) =>R) => R.over(lens, func)
```



사용 예제

- 직접 속성에 접근하는 일이 렌즈를 생성할 때 한번뿐이므로, 사이드 이펙트를 일으키지 않는 장점 

```typescript
import * as R from 'ramda'
import { makeLens, getter, setter, setterUsingFunc } from './lens'
import { IPerson, makeRandomIPerson } from '../model/person'

const nameLens = makeLens('name') // 속성으로 렌즈 생성
const getName = getter(nameLens)
const setName = setter(nameLens)
const setNameUsingFunc = setterUsingFunc(nameLens)

const person: IPerson = makeRandomIPerson()

const name = getName(person)
// console.log(name);
const newPerson = setName('jeehun jung')(person)
// console.log(newPerson);
const anotherPerson = setNameUsingFunc(name => `Mr. ${name}`)(person)
// console.log(anotherPerson);
const capitalPerson = setNameUsingFunc( R.toUpper)(person)
// console.log(capitalPerson);
```



### R.lensPath

```typescript
{
  name: 'AUSTIN GILL',
  age: 65,
  title: 'Service Manager',
  location: {
    country: 'LK',
    city: 'Sipijnov',
    address: '954 Cadis Road',
    coordinates: { latitude: 5.77025, longitude: -160.10787 }
  }
}
```

- 위와 같은 코드에서 내부의 `longitude` 속성에 접근하기 위해서는 다음과 같이 작성해야 한다.

  ```typescript
  person.location.coordinates.longitude
  ```

- 위아 같은 경로(path)의 속성을 렌즈로 만들면 다음과 같다

  ```typescript
  렌즈 = R.lensPath(['location', 'coordinates', 'longitude'])
  ```

사용

```typescript
import * as R from 'ramda'
import { makeLens, getter, setter, setterUsingFunc } from './lens'
import { IPerson, makeRandomIPerson } from '../model/person'

const longitudeLens = R.lensPath(['location', 'coordinates', 'longitude']) // lensPath 생성

const getLongitude = getter(longitudeLens)
const setLongitude = setter(longitudeLens)
const setLongitudeUsingFunc = setterUsingFunc(longitudeLens)

const person: IPerson = makeRandomIPerson()

const longitude = getLongitude(person)
console.log(longitude);
const newPerson = setLongitude(0.1234567)(person)
console.log(newPerson);
const anotherPerson = setLongitudeUsingFunc(R.add(0.123456))(person)
console.log(anotherPerson);
```



