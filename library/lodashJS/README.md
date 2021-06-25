# lodash Lib.

> 유틸리티성 javascript 라이브러리

---

## 주요 함수

### isNil(value)

- val이 `null` or `undefined`일 경우 true 리턴

### isEmpty(value)

- object, collection, map, set 가 비었는지를 체크한다.

- 만약, 인자로 `object`, `collection`, `map`, `set`, `string` 이 아닌 "기초 원시값"이 온다면, true를 반환하기 때문에 조심해야한다.

  > ⚠ (주의) 참조형이 아닌 **primitive type**인 경우에 **primitive type** 데이터 값이 있더라도 empty로 판단한다.

  > ⚠ primitive type 중 "**string**"은 제외한다.
  >
  >  즉 null string도 isEmpty의 결과값은 true이고
  >
  > 일반 문자열의 isEmpty 결과값은 false이다.

- 즉, 참조형 데이터 타입에 변수에  데이터의 주소값이 할당되지 않은 경우, empty로 처리하는 것 같다.

  ```typescript
  // isEmpty
  console.log(isEmpty({})) // true
  console.log(isEmpty([])) // true
  
  console.log(isEmpty(0)) // true  ** 주의
  console.log(isEmpty(9)) // true
  console.log(isEmpty(true)) // true
  console.log(isEmpty(null)) // true
  console.log(isEmpty(undefined)) // true
  
  // string 관련 *** 
  console.log(isEmpty('')) // true
  console.log(isEmpty('happy')) // false *** 주의
  
  console.log(isEmpty({ name: '' })) // false
  console.log(isEmpty([1, 2, 3])) // false
  ```

  

### clone(value)

- val을 얕은 복사(Shallow Copy)하여 반환

### cloneDeep(value)

- 깊은 복사를 해서 반환

### debounce(callback, timer)

- 이벤트를 그룹화하여 특정시간이 지난 후 하나의 이벤트만 발생하도록 하는 기술
- 마지막 콜백 호출 이후로 일정 밀리세컨드 이후 지연된 호출을 하도록 처리
- input의 `onmousemove`, `change`, `onscroll` 등의 이벤트 핸들러로 사용한다면, api 호출하는 횟수가 크게 줄어들어 성능 향상 가능

### throttle(callback, timer)

- 이벤트를 일정 주기마다 발생하도록 하는 기술
- timer는 반복주기 개념
- 반복 주기 별로 한번씩만 콜백을 호출한다.
- debounce와의 가장 큰 차이점은 throttle은 적어도 x 밀리초마다 정기적으로 기능 동작을 보장한다는 것

[[참고] debounce와 throttle  아주 좋은 글](https://webclub.tistory.com/607)



### groupBy(collection, 그룹핑할 키 or 함수)

코드

```typescript
const gridList = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
]

console.log(groupBy(gridList, 'x'))
```

콘솔 결과

```typescript
{ 
  '1': [ { x: 1, y: 1 }, { x: 1, y: 2 } ],
  '2': [ { x: 2, y: 1 }, { x: 2, y: 2 } ]
}
```

코드

```typescript

const floatList = [1.2, 1.7, 3.7, 2.5, 3.2, 3.5, 2.8]

console.log(groupBy(floatList, Math.floor))
```

결과

```typescript
{ '1': [ 1.2, 1.7 ], '2': [ 2.5, 2.8 ], '3': [ 3.7, 3.2, 3.5 ] }
```

### flatten

```typescript
// ! flatten
const gridList2 = [
  [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
]

console.log(flatten(gridList2))
```

결과

```typescript
[ { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ]
```



### uniqBy()

```typescript
// ! uniqBy
const objList = [{ x: 1 }, { x: 1 }, { x: 2 }, { x: 2 }, { x: 2 }, { x: 3 }, { x: 3 }]

console.log(uniqBy(objList, 'x'))

```

결과

```typescript
[ { x: 1 }, { x: 2 }, { x: 3 } ]
```





### range(from: number, to: number ) : number[]   (rangeRight)

- from부터 to - 1까지의 number[]를 반환한다.

  ```type
  import { range, rangeRight } from 'lodash'
  
  for (let value of range(1, 10 + 1)) {
    console.log(value) // 1,2,3, ..., 10
  }
  
  // 역순
  for (let value of rangeRight(1, 10 + 1)) {
    console.log(value) //10, 9, 8, ... , 1
  }
  ```

  

### pull(array, value)

- value에 해당하는 값을 삭제한다.
- ⚠ 원본 배열도 함께 변경된다

```typescript
import { pull, pullAll } from 'lodash'

const numArr: number[] = [1, 2, 3, 3, 3, 4, 4, 5, 5, 5]

console.log(pull(numArr, 5))
//[  1, 2, 3, 3,  3, 4, 4 ]

console.log(numArr) // 원본 배열 변경
//[  1, 2, 3, 3,  3, 4, 4 ]

```



### pullAll(array, valueArray)

- pull의 두 번째 파라미터인 value 를 array 형태로 전달한다.
- ⚠ 원본 배열도 함께 변경된다

```typescript
import { pull, pullAll } from 'lodash'

const numArr: number[] = [1, 2, 3, 3, 3, 4, 4, 5, 5, 5]

console.log(pullAll(numArr, [1, 2]))
//[  3, 3, 3, 4,  4, 5, 5, 5 ]

```

### pick

```typescript
pick<T extends object, U extends keyof T>(object: T, ...props: Array<Many<U>>): Pick<T, U>
```

- object의 특정 property들만 모아서 새로운 object를 만들어 반환

```typescript
import { pick, omit } from 'lodash'

let obj = { a: 1, b: '2', c: 3 }

console.log(pick(obj, 'a', 'c')) // { a: 1, c: 3 }

```



### omit

```typescript
omit<T extends object, K extends PropertyName[]>(object: T | null | undefined, ...paths: K): Pick<T, Exclude<keyof T, K[number]>>
```

- object의 특정 property들을 삭제한 새로운 object 반환

```typescript
import { pick, omit } from 'lodash'

let obj = { a: 1, b: '2', c: 3 }

console.log(omit(obj, 'a')) // { b: '2', c: 3 }
```



### differenceWith

```jsx
(alias) (method) differenceWith<T1, T2>(array: List<T1> | null | undefined, values: List<T2>, comparator: Comparator2<T1, T2>): T1[] (+3 overloads)
```

: 첫 번째 인자로 받는 배열과 두 번째 인자로 받는 배열을 비교하여, 다른 요소들만 새로운 배열로 반환(첫 번째 배열 기준)

- 애플망고에서는 테이블이 수정되었는 지 판단할 때 자주 사용되는 것 같다.

  원본 테이블데이터와 현재 ui의 테이블데이터와 비교해서 사용

  differenceWith 함수에 의해 반환된 배열만 update 파라미터로 넣어준다.

```tsx
import { differenceWith, isEqual } from 'lodash'

// * 배열과 두 번째 인자로 받는 배열을 비교해 같지 않는 요소들을 새로운 배열로 반환한다.
// * 각 array 요소에 comparator를 사용할 수 있다.
// * 주로 isEqual 과 함께 사용

// 1 depth
const arr = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
]

const diffNewArr = differenceWith(arr, [{ x: 1, y: 2 }], isEqual)

console.log(diffNewArr) // [ { x: 2, y: 1 } ]

// 2 depth 도 되는 듯 하다.. 신기하네
const deepObjArr = [
  { name: 'foo', detail: { height: 190, weight: 200 } },
  { name: 'bar', detail: { height: 50, weight: 290 } },
]
const deepObjArr1 = [
  { name: 'foo', detail: { height: 190, weight: 200 } },
  { name: 'bar', detail: { height: 50, weight: 29 } },
]

const diffDeepObjArr = differenceWith(deepObjArr, deepObjArr1, isEqual )
console.log(diffDeepObjArr);
```
