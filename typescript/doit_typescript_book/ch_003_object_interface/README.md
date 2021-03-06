## <a id="ch_003">ch_003. 객체, 타입</a>

### 03-1 TS 변수 선언문

- **let, const** 

  - `const`는 초깃값 필수 명시

- **타입 주석 type annotation**

  - java의 타입과 달리 **소문자**로 명시

- new String() 와 같이  wrapper로 생성하지 않기를 권고(왜냐면 `typeof` 연산자의 결과가 object)

  - 포맷

  ```typescript
  let 변수이름: 타입 [= 초깃값]
  const 변수이름: 타입 = 초깂값
  ```

  예시코드

  ```typescript
  let n: number = 1
  let b: boolean = true
  let s: string = 'hello'
  let o: object = {}
  ```

- **타입 추론 type inference**

  ```typescript
  let n = 1 		// number로 추론
  let b = true	// boolean으로 추론
  let o = {}		// object로 추론
  ```

- **type 계층도**

  어떻게 그려야할 지 모르겠다 ...

  ```tex
  최상위 any
  ---
  중간
  + number, boolean, string (primitive)
  + object
  	+ interface, class
  ---
  최하위 undefined
  ```

  

- **any 타입**

  - 타입의 최상위

  - 어떤 타입의 데이터도  저장 가능

  ```typescript
  let a: any = 0
  a = 'hello'	// type error 발생 x
  a = true	// type error 발생 x
  a = {}		// type error 발생 x
  ```

- **undefined 타입**

  - `undefined` 자체가 **값**이자 **타입**, 둘 다 소문자로 표기 (null 도 마찬가지임. **값**이자 **타입**)

  - 최하위 타입

  ```typescript
  let u: undefined = undefined
  u = 1 // type error 발생
  ```




## 03-2 객체, 인터페이스

- object 는 interface 와 class의 상위 타입

- object 타입은 primitive를 제외하고 모든 object 타입 및 하위 타입을 담을 수 있다.

  ```typescript
  let o: object = {}
  o = {name: 'jee', age:5 }
  o = {height: 180, weight: 70} // 하지만, object 타입은 object의 property 타입 까지 정해두진 못함
  ```

- **인터페이스 선언문**

  ```typescript
  interface 인터페이스이름 {
      prop이름[?]: prop타입[, ...]
  }
  ```

  ```typescript
  // interface 선언
  interface iPerson {
      name: string
      age: number
      height?: number // * optional prop
  }
  ```

  인터페이스 인스턴스 생성

  ```typescript
  let good1: iPerson = {name: 'jack', age: 35}
  let good2: iPerson = {name: 'shellby', age: 42}
  let good3: iPerson = {name: 'mark', age: 12, height: 159} // optional property
  
  let bad1: iPerson = {name: 'loopy'} // age 미존재
  let bad2: iPerson = {name: 'blonde', age: 20, weight: 79}  // 'weight' prop 정의 x
  ```

  

- **익명 인터페이스 anonymous interface**

  - `interface` 키워드로 선언하지 않고, 사용부에서 익명으로 선언

    ```typescript
    let ai: {
        name: string
        age: number
        etc?: boolean
    } = { name: 'Jee', age: 50 }
    ```

  - 주로 함수를 구현할 때, 아래와 같이 **object 타입의 인자를 정의**할 때 사용

    ```typescript
    function printMe( me: {name: string, age: number, etc?: boolean} ) {
        console.log(
        	me.etc ? 
            	`${me.name} ${me.age} ${me.etc} ` :
            	`${me.name} ${me.age}`
        )
    }
    ```

    

## 03-2 객체와 클래스

### typescript 에서 클래스의 의미

- javascript 의 class는 ES6부터 사용
- class 이전에는 Function을 통해 사용
- 기존 oop와 같이 class 도 type 중 하나
- class 이름은 보통 대문자로 사용
- 클래스 내부에서의 this는 js와 같이 생성되는 인스턴스를 가리킴

### 클래스 선언문

- java 등의 객체지향 언어에서 제공하는 class, 접근제어자[private, public, protected], implements, extents 등과 같은 키워드 제공

```typescript
class 클래스이름 {
  [private | protected | public] 속성이름[?]: 속성타입[...]
}
```

클래스 선언과 인스턴스 생성

```typescript
class Person {
  public name: string;
  public age?: number;
}

let jack = new Person();
jack.name = 'jack';
jack.age = 30;
```

### 접근 제한자 access modifier

클래스 내부의 모든 곳(프로퍼티, 생성자, 메소드)에서 세팅이 가능하다.

javascript에서 private한 변수의 접두어로 `_`을 붙여 사용하던 관습이 남아있다.

- default: `public` 
- private : java에서와 같이 클래스 내부에서만 접근 가능
- protected : 클래스 내부 그리고 상속받은 클래스에서만 접근 가능

### 생성자 메소드 constructor

```typescript
// 생성자
class Person1 {
  constructor(public name: string, public age?: number) {}	// ! 접근제어자 붙여야 함
}

const joy = new Person1('joy', 31);
```

- 접근제어자를 붙여줄 경우, 프로터피로 직접 선언 및 할당을 하지 않아도 된다. ( javscript와 같이 `this.프로퍼티 = 매개변수` 를 적어주지 않아도 된다. )

- 사실 아래처럼 펼쳐진 class 선언문을 위와 같이 함축한 것

  ```typescript
  class Person2 {
    name: string;	//생략
    age?: number;	//생략
    constructor(name: string, age?: number) {
      this.name = name;
      this.age = age;
    }
  }
  ```

#### 초기화 initialization

- 클래스의 property 값의 초기화는 아래 두가지 경우로만 세팅 가능

  1. property의 선언부에서 바로 할당
  2. constructor(){} 생성자 함수 내부에서 할당




### 인터페이스 구현 interface implements

```typescript
class 클래스이름 implements 인터페이스이름 {
  ..
}
```

- 인터페이스는 규약(spec) 을 정의해놓은 것일 뿐, 직접 구현은 구현해야하는 class에서 해야한다.

예제

```typescript
// 인터페이스 정의
interface IPerson3 {
  name: string;
  age?: number;
}

// 인터페이스 구현 (생성자 메소드)
class Person3 implements IPerson3 {
  constructor(public name: string, public weight: number, public age?: number) {}
}

let phil = new Person3('phil', 70, 29);

```



### 인터페이스의 상속(확장) extending interface

- 인터페이스 간 상속 가능 (다중 상속도 가능)
- 따라서 재사용성 높은 컴포넌트로 쪼갤 수 있다.

```typescript
// extending interface
interface iAnimal15 {
  name: string
}

interface iAnimal16 {
  age: number
}

interface iPerson15 extends iAnimal15, iAnimal16 {
  country: string
}

let person15 = {} as iPerson15
person15.name = 'jee'
person15.age = 16
person15.country = 'Korea'

console.log(person15)

```





### 추상 클래스 abstract class

```typescript
abstract class 클래스이름 {
  abstract 속성이름: 속성타입
  abstract 메소드이름() { }
}
```

- 추상 클래스는 new 키워드로 인스턴스를 생성할 수 없다.

### 클래스 상속 class extends

```typescript
class 서브클래스 extentds 수퍼클래스 {
	...
}
```



```typescript
// 추상 클래스 정의
abstract class Abstractperson5 {
  abstract name: string;
  constructor(public age?: number) {}
}

// 클래스 정의 및 추상 클래스 상속
class Person5 extends Abstractperson5 {
  constructor(public name: string, age?: number) {
    super(age); // super 키워드 - 부모의 생성자 호출
  }
}

// 인스턴스 생성
const ruru = new Person5('ruru', 52);
console.log(ruru);

```

### static 속성

- 클래스는 생성될 때, 내부적으로 스태틱 속성과 인스턴스 속성으로 분류되어 생성된다고 생각하면 편하다.

- 스태틱 속성은 모든 인스턴스가 공유하는 속성

```typescript
class 클래스이름 {
  static 정적속성이름: 속성타입
}
```

- `클래스이름.정적속성이름` 형태의 **dot notation**(점 표기법)을 통해 get, set 가능
- javascript 의 스태틱 메소드 & 프로토타입 메소드 개념 생각하기

```typescript
class Book {
  static initValue = 1000;
  constructor(public title: string, public author: string) {}
}

const book1 = new Book('javascript_dev', 'zeroxho');
console.log(book1);
console.log(Book.initValue);  // 클래스이름. 으로 접근, 인스턴스 변수명 x
```

```typescript

interface iAnimal {
  name: string
  legs?: number
  move(distance: number): void
}

class Bird implements iAnimal {
  constructor(public name: string) {}
  move(distance: number) {
    console.log(`${distance} 만큼 날았다.`)
  }
  // static mehtod 생성
  static isBird = (animal: iAnimal): boolean => {
    return animal instanceof Bird
  }
}

let bird1: Bird = new Bird('bird1')

// static method 호출...
console.log(Bird.isBird(bird1))	// true
console.log(Bird.isBird({ name: 'jeeha', move(num: number) {} })) // false

```



#### static 을 활용한 singleton pattern

```typescript
class SingleTon {
  private static instance: SingleTon | null = null

  public static getInstance(): SingleTon {
    if (SingleTon.instance === null) {
      SingleTon.instance = new SingleTon()
    }
    return SingleTon.instance
  }

  private constructor() {}
}

const singleA: SingleTon = SingleTon.getInstance()
const singleB: SingleTon = SingleTon.getInstance()

console.log(singleA === singleB)  // true
```



## indexable property, index signatures in class

- 동적으로 property를 생성하기 위해 사용

```typescript
interface iPerson10 {
  [index: string]: string | number; // indexable notation
}

class Person10 implements iPerson10 {
  [index: string]: string;
}

let person10 = new Person10();

person10.name = 'jeem';	// person10에는 없는 prop이지만, 할당 가능
console.log(person10.name);
```



## readonly property 

- 일부 property들은 객체가 처음 생성될 때(초기화 시)에만 값이 할당되어야 한다. 이러한 경우 readonly 유용
- 재할당 시, 린트 에러 발생

```typescript

interface iReadonly {
  readonly name: string
  readonly country: string
}

// 생성 시 초기값 할당
let readonly1: iReadonly = {
  name: 'jee',
  country: 'Korea',
}

readonly1.name = 'jee1' // 에러 발생, cannot assign to 'name' because it is 'read-only' property

```

## readonlyArray

- 모든 변경 메소드가 제거된 `Array<T>`
- `const`와의 차이점
  - 변수에 사용된다면 `const`, 프로퍼티에 사용된다면 `readonly`

```typescript
let readonlyArr: ReadonlyArray<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9]

readonlyArr.push(4) // 에러 발생, readonlyArr 는 push 라는 property를 갖고 있지 않다.
```







### 비구조화 할당 destructuring

ES5 의 개념과 동일

```typescript
interface IAnimal {
  name: string;
  legs: number;
}

const dog: IAnimal = { name: 'dog', legs: 5 };

// 비구조화 할당
let { name, legs } = dog;
```



### 나머지 연산자 rest operator & 펼침 연산자 spread operator

- 나머지 연산자

  ```typescript
  const address: any = {
    country: 'Korea',
    city: 'Seoul',
    address1: 'Gangnam',
    address2: '676-23',
  }
  
  // 나머지 연산자
  const {country, city, ...detail} = address;
  ```

- 펼침 연산자

  ```typescript
  const obj1: object = {
    name: 'rock',
    age: 39
  }
  
  const obj2: object = {
    country: 'England',
    language: 'Eng'
  }
  
  const obj3: object = {...obj1, ...obj2}
  ```



---

## 03-5 객체의 타입 변환

### 타입 변환 type conversion

- 형변환과 비슷한 말인 듯

```typescript
const obj1: object = {
  name: 'd loopy',
  age: 20,
};

console.log(obj1);

console.log(obj1.name);   // object 타입에는 name 프로퍼티가 없어서 오류 발생
console.log((<{ name: string }>obj1).name); // 형변환
```

- type conversion, type casting, type coercion 모두 유사한 개념
  - **type convetsion(**명시, 묵시 개념 포함) / **type castring(**명시적) / **type coercion**(묵시적)



### 타입 단언 type assertion

참고[_타입단언 설명](https://hyunseob.github.io/2017/12/12/typescript-type-inteference-and-type-assertion/)

- javascript 의 타입 변환 구문과 구별하기 위해 **단언**이라는 용어 사용

> '타입단언'은 '타입 캐스팅'이 아니다.

- 타입 단언은 런타임에 영향을 미치지 않지만, 타입 캐스팅은 컴파일 타임과 런타임 모두 타입을 변경시키는 영향을 미친다.

- 두 가지 형태로 사용이 가능하다. 내용은 동일

  ```typescript
  (<타입>인스턴스명)   // 타입 단언 방법 1
  (인스턴스명 as 타입)	// 타입 단언 방법 2
  ```

  
    ```typescript
   interface iPerson11 {
     name: string
     age?: number
   }
   
   // 타입 단언 1
   let person1 = <iPerson11>{}
   person1.name = 'jeeee'
   
   // 타입 단언 2
   let person2 = {} as iPerson11
   person1.name = 'jeee'
    ```
  
  
  
  ```typescript
  interface INameable {
    name: string;
  }
  
  let obj5: object = {
    name: 'jack',
  };
  
  let name1 = (<INameable>obj5).name; // 타입 단언 1
  let name2 = (obj5 as INameable).name; // 타입 단언 2
  ```
  
   

