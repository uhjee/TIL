# 4장. 리액트 실전 활용법

# 4.1 가독성과 생산성을 고려한 컴포넌트 코드 작성법

## 4.1.1 추천하는 컴포넌트 파일 작성법

### 컴포넌트 파일 작성 순서

```jsx
// 1. 속성값의 타입을 정의
MyComponent.propTypes = {
	// ...
};

// 2. 컴포넌트 함수
export default function MyComponent({ prop1, prop2 }) {
	// ...
}

const COLUMNES = [
	{ id: 1, name: 'phoneNumber', width: 200, color: 'white' },
	{ id: 1, name: 'city', width: 100, color: 'gray' },
	// ...
];

// 3. 컴포넌트 바깥의 변수와 함수들
const URL_PRODUCT_LIST = '/api/products';

function getTotalPrice({ price, total }) {
	// ...
}
```

1. 속성값의 타입 정의
    - 컴포넌트를 사용하는 입장에서 생각
    - 속성값 타입 위쪽으로는 import 코드만 오도록 작성

2. 컴포넌트 함수
    - 컴포넌트 함수의 매개변수는 명명된 매개변수로 정의(구조 분해 할당)
    - 컴포넌트 함수의 이름은 꼭 명시: 디버깅 시 편리

3. 컴포넌트 바깥의 변수와 함수들
    - 파일의 가장 밑에 정의
    - 특별한 이유가 없다면 상수 `const`로 정의
    - 상수의 변수명은 대문자로 작성
    - 컴포넌트 함수 내에서 커다란 객체를 생성하는 코드가 있을 때, 가능하다면 컴포넌트 외부에서 상수, 변수로 정의해서 사용
        - 렌더링 시, 불필요한 객체 생성을 피할 수 있다.

### 서로 연관된 코드를 한 곳으로 모으기

```jsx
function Profile({ userId }) {
	// 1. user 관련
	const [user, setUser] = useState(null);
	useEffect(() => {
		getUserApi(userId).then(data => setUser(data));
	}, [ userId ]);

	// 2. width 관련
	const [width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		const onResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
		}
	}, []);
	// ...
}
```

- 사용자 관련 정보와 창의 너비를 가져오는 기능을 한 곳으로 각각 모았다.
- 훅의 종류별로 모으기보다, 연관된 코드끼리 모으는 것이 좋다.

### 각 기능을 커스텀 훅으로 분리하기

```jsx
function Profile({ userId }) {
	const user = useUser(userId);
	const width = useWindowWidth();
	// ...
}

// 1. user 관련 커스텀훅
function useUser(userId) {
	const [user, setUser] = useState(null);
	useEffect(() => {
		getUserApi(userId).then(data => setUser(data));
	}, [ userId ]);

	return user;
}

// 2. width 관련 커스텀훅
function useWindowWidth() {
	const [width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		const onResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
		}
	}, []);

	return width;

}
```

- 컴포넌트 코드가 복잡하지 않은 경우에는 커스텀 훅이 오히려 가독성이 떨어질 수 있으니 주의한다.

## 4.1.2 속성값 타입 정의하기: prop-types

### prop-types

속성값의 타입 정보를 정의할 때 사용하는 리액트 공식 패키지

리액트가 렌더링하는 과정에서 잘못된 속성값 타입을 검사한 후, 콘솔에 에러 메세지 출력

개발 모드에만 동작

타입 정의 자체가 해당 컴포넌트에 대한 개발 문서가 될 수 있기 때문에 편리

### 예시 코드

```jsx
User.propTypes = {
	male: PropTypes.bool.isRequired,
	age: PropTypes.number,
	type: PropTypes.oneOf(["gold", "silver", "bronze"]),
	onChangeName: PropTypes.func,
	onChangeTitle: PropTypes.func.isRequired

};
```

```jsx
function User({ type, age, male, onChangeName, onChangeTitle }) {
	function onClick1 () {
		const msg = `type: ${type}, age: ${age ? age : '알수없음'}`;
		log(msg, { color: type === 'gold' ? 'red' : 'black' })
	}
	
	function onClick2 () {
		if(onChangeName) {
			onChangeName(name);
		}
		onChangeTitle(title);
		male ? goMalePage() : goFemalePage();
		// ...
	}
	// ...
}
```

- 함수 자체의 매개변수와 반환값까지 정의할 수는 없다.

### prop-types로 정의할 수 있는 타입

1. 리액트 요소

    PropTypes.element

    ```jsx
    MyComponent.protoTypes = {
    	menu: ProtoTypes.element
    	// <div>hello</div>  // 참
    	// <ComeComponent />  // 참
    	// 123 // 거짓
    }
    ```

2. 컴포넌트 함수가 반환할 수 있는 모든 것

    PropTypes.node

    ```jsx
    MyComponent.protoTypes = {
    	description: ProtoTypes.node
    	// number, string, array, element  // 참
    	// <ComeComponent />  // 참
    	// 123 // 참
    }
    ```

3. Message 클래스로 생성된 모든 객체

    PropTypes.instanceOf(Message),

    ```jsx
    MyComponent.protoTypes = {
    	message: ProtoTypes.instanceOf(Message)
    	// new Message()  // 참
    	// new Car()  // 거짓
    }
    ```

4. 배열에 포함된 '값' 중에서 하나를 만족

    PropTypes.oneOf([ 'john', 'mike' ])

    ```jsx
    MyComponent.protoTypes = {
    	name: ProtoTypes.oneOf([ 'john', 'mike' ])
    	// 'john'  // 참
    	// 'messy'  // 거짓
    }
    ```

5. 배열에 포함된 '타입' 중에서 하나를 만족

    PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])

    ```jsx
    MyComponent.protoTypes = {
    	width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
    	// 123  // 참
    	// 'messy'  // 참
    }
    ```

6. 특정 타입만 포함하는 배열

    PropTypes.arrayOf(PropTypes.number)

    ```jsx
    MyComponent.protoTypes = {
    	ages: PropTypes.arrayOf(PropTypes.number)
    	// [ 1, 5, 7 ]  // 참
    	// [ 'a', 'b' ]  // 거짓
    }
    ```

7. 객체의 속성값 타입을 정의

    PropTypes.shape({

    color: PropTypes.string,

    weight: PropTypes.number

    })

    ```jsx
    MyComponent.protoTypes = {
    info:	PropTypes.shape({
    	color: PropTypes.string,
    	weight: PropTypes.number
    })
    	// { color: 'red', weight: '123kg' } // 거짓
    }
    ```

8. 객체에서 모든 속성값의 타입이 같은 경우

    PropTypes.objectOf(PropTypes.number)

    ```jsx
    MyComponent.protoTypes = {
    	infos: PropTypes.objectOf(PropTypes.number)
    	// {prop1: 123, prop2: 567} // 참
    	// {prop1: 'red', prop2: 567} // 거짓
    }
    ```