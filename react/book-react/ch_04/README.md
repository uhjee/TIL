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

## 4.1.3 가독성을 높이는 조건부 렌더링 방법

### 조건부 렌더링 Conditional rendering

컴포넌트 함수 내부에서 특정 값에 따라 선택적으로 렌더링하는 것

삼항 연산자를 사용하는 경우도 많지만,  JSX 문법에서는 `&&`  연산자가 가독성이 더 좋다.

특히 삼항 연산자는 중첩해서 사용 시, 가독성이 많이 떨어진다.

### && 연산자

마지막으로 검사한 값을 truthy 또는 falsy로 반환한다.

따라서 렌더링할 리액트 요소를 && 연산자의 끝에 작성하고, 앞쪽에는 해당 조건을 작성하는 방법으로 작성

[참 같은 값 - 용어 사전 | MDN](https://developer.mozilla.org/ko/docs/Glossary/Truthy)

- 삼항 연산자 사용 조건부 렌더링 예제

    ```jsx
    function Greeting({ isLogin, name, cash }) {
    	return (
    		<div>
    			저희 사이트에 방문해 주셔서 감사합니다.
    				{ isLogin ? (
    					<div>
    						<p> { name } 님 안녕하세요.</p>
    						<p>  현재 보유하신 금액은 { cash } 원입니다.</p>
    					</div>
    				) : null }
    		</div>
    	)
    }
    ```

- && 연산자 사용 조건부 렌더링 예제

    ```jsx
    function Greeting({ isLogin, name, cash }) {
    	return (
    		<div>
    			저희 사이트에 방문해 주셔서 감사합니다.
    				{ isLogin && (
    					<div>
    						<p> { name } 님 안녕하세요.</p>
    						<p>  현재 보유하신 금액은 { cash } 원입니다.</p>
    					</div>
    				)}
    		</div>
    	)
    }
    ```

    ### && 연산자 주의점

    - falsy:  `0`, `-0`,  `""` , `false` , `null`, `undefined`, `NaN`

        위의  falsy 데이터가 그대로 반환될 수 있으므로, 항상 해당 변수의 기본값을 설정해두거나, null 체크를 직접해야할 수 있다.

    - 빈 배열, 빈 객체

        빈 배열이나 빈 객체는 truthy로 분류된다. 따라서 직접 체크해야 한다.

## 4.1.4 관심사 분리를 위한 프레젠테이션, 컨테이너 컴포넌트 구분하기

비지니스 로직과 상탯값의 유무에 따라 프레젠테이션과 컨테이너로 불리는 두 가지 컴포넌트로 구분

### 프레젠테이션 컴포넌트

- 조건
    1. 비지니스 로직이 없다.
    2. 상탯값이 없다. (단, 마우스 오버와 같은 UI 효과를 위한 상탯값은 제외)

---

# 4.2 useEffect 훅 실전 활용법

## 4.2.1 의존성 배열을 관리하는 방법

### 의존성 배열

- useEffect 훅에 입력하는 두 번째 매개변수
- 의존성 배열의 변수 내용이 변경되었을 때, 부수효과 함수 실행
- 쉽게 버그로 이어지기 때문에, 가능하면 입력하지 않는 것이 좋다.

### 부수 효과 함수에서 API를 호출하는 경우

- 의존성 배열을 잘못 관리하는 경우

    ```jsx
    const [needDetail, setNeedDetail] = useState(false);
    useEffect(() => {
    	fetchUser(userId, needDetail).then(data => setUser(data));
    }, [userId]); // userId만 등록, needDetail 미등록
    ```

    - 의존성 배열에 needDetail 변수를 등록하지 않음
- 위와 같은 문제를 해결하기 위해 리액트에서 제공하는 eslint 규칙 **exhaustive-deps**
    - exhaustive-deps : 잘못된 의존성 배열을 찾아서 알려줌
    - 꼭 사용하자

### useEffect 훅에서 async await 함수 사용하기

- 부수효과 함수를 async await 함수로 만들면 에러 발생
- 이유는 부수 효과 함수의 반환값은 항상 함수 타입이어야 하기 때문(async 함수의 리턴값은 resolve 된 Promise 객체)
- 부수효과 함수의 반환값
    - 오직 함수여야 한다.
    - 반환된 함수는 부수 효과 함수가 호출되기 직전과 컴포넌트가 사라지기 직전에 호출된다.

- useEffect 훅에서 async await 함수 사용하기
    1. 내부에 async 함수 정의

        ```jsx
        useEffect(() => {
        	// async 함수 정의
        	async function fetchAndSetUser() {
        		const data = await fetchUser(userId);
        		setUser(data);
        	}
        	
        	// 호출
        	fetchAndSetUser();
        }, [userId]);
        ```

    1. 재사용을 위해 async 함수를 useEffect 훅 외부로 빼내기

        ```jsx
        function Profile({ userId }) {
        	const [user, setUser] = useState();

        	// 외부에 위치
        	async function fetchAndSetUser(needDetail) {
        		const data = await fetchUser(userId, needDetail);
        		setUser(data);
        	}
        	
        	useEffect(() => {
        		fetchAndSetUser(false);
        	}, [fetchAndSetUser]); // 의존성 배열에 함수 등록
        }
        ```

        - 재사용은 가능하지만, 렌더링 시마다 새로운 `fetchAndSetUser` 함수가 생성되므로, 렌더링시마다 useEffect 내부에서 호출된다.

    2. useCallback 훅을 사용해 메모이제이션

        ```jsx
        function Profile({ userId }) {
        	const [user, setUser] = useState();

        	// 외부에 위치
        	const fetchAndSetUser = useCallback(
        		async (needDetail) => {
        			const data = await fetchUser(userId, needDetail);
        			setUser(data);
        		}, [userId]  // useCallback 함수의 의존성 배열에 userId 등록
        	);

        	
        	useEffect(() => {
        		fetchAndSetUser(false);
        	}, [fetchAndSetUser]); // 의존성 배열에 함수 등록
        }
        ```

        - 이제야 userId가 변경될 때에만 `fetchAndSetUser` 함수가 호출된다

    ## 4.2.2 의존성 배열을 없애는 방법

    의존성 배열을 관리하는데 생각보다 많은 시간과 노력이 들어가기 때문에, 사용하지 않는 것이 좋다.

    ### 부수 효과 함수 내부에서 분기 처리하기

    부수 효과 함수 내에서 실행 시점을 조절할 수 있다.

    ```jsx
    function Profile({ userId }) {
    	const [user, setUser] = useState();

    	async function fetchAndSetUser(needDetail) {
    		const data = await fetchUser(userId, needDetail);
    		setUser(data);
    	}
    	
    	useEffect(() => {
    		if(!user || user.id !== userId){ // user.id가 현재와 다를 경우에만 호출하도록 분기
    			fetchAndSetUser(false);
    		}
    	}); // 의존성 배열 삭제
    }
    ```

    ### useState 의 상탯값 변경 함수에 함수 입력하기

    상탯값을 의존성 배열로 관리하지 않을 수 있다.

    ```jsx
    function MyComponent() {
    	const [coount, setCount] = useState(0);
    }

    useEffect(() => {
    	function onClick() {
    		setCount(prev => prev + 1); // 콜백함수 전달
    	}
    	window.addEventListener("click", onClick);
    }); // 의존성 배열 삭제
    ```

    - 상탯값 변경 함수에 콜백함수를 전달하면, 이전 상탯값을 매개변수로 받을 수 있다는 점 이용

    ### useReducer 사용하기

    여러 상탯값을 참조하면서 값을 변경할 때에는 useReducer 훅을 사용하는 것이 좋다.

    ```jsx
    function Timer({ initialTotalSeconds }) {
    	const [state, dispatch] = useReducer(reducer, { // 두 번째 매개변수: 초기 상탯값
    		hour: Math.floor(initialTotalSeconds / 3600),
    		minute: Math.floor((initialTotalSeconds % 3600) / 60),
    		second: initialTotalSeconds % 60,
    	});

    	const { hour, minute, second } = state;
    	useEffect(() => {
    		const id = setInterval(dispatch, 1000); // dispatch를 내부에서 호출
    		return () => clearInterval(id); // 부수효과의 반환 함수
    	}); // 의존성 배열 삭제
    	// ...
    }

    // reducer 함수: 상탯값 변경 함수
    function reducer(state) {
    	const { hour, minute, second } = state;
    	if( second ) {
    		return { ...state, second: second - 1 };
    	} else  if( minute ) {
    		return { ...state, minute: minute -1, second: 59 };
    	} else if ( hour ) {
    		return { hour: hour -1, minute: 59, second: 59 };
    	} else {
    		return state;
    	}
    }
    ```

    ### useRef 활용하기

    속성값으로 전달되는 함수는 자주 변경되는 겨우가 많다.

    해당 속성값이 렌더링 결과에 영향을 주는 값이 아니라면 useRef 훅을 사용해 의존성 배열을 없앨 수 있다.

    - 속성값으로 전달된 함수는 함수 내용은 그대로지만 렌더링 시 변경되는 경우가 많다.
    - 이로 인해 부수 효과 함수가 불필요하게 자주 호출된다.

    ```jsx
    function MyComponent({ onClick }){
    	// onClick을 useRef에 저장
    	const onClickRef = useRef();
    	useEffect(() => {
    		onClickRef.current = onClick;
    	});

    	useEffect(() => {
    		window.addEventListener("click", () => {
    			onClickRef.current();
    		})
    	}); // 의존성 배열 삭제
    }
    ```

    - useRef에는 렌더링 결과와 무관한 값만 저장(useRef에 저장된 값이 변경되도 컴포넌트는 다시 렌더링되지 않음)

    ---

    # 4.3 렌더링 속도를 올리기 위한 성능 최적화 방법

    리액트가 실행될 때 가장 많은 CPU 리소스를 사용하는 것은 렌더링

    리액트는 데이터(상탯값과 속성값)와 컴포넌트 함수로 화면을 그린다.

    대부분의 연산은 컴포넌트 함수의 실행과 가상 돔에서 발생

    속성값이나 상탯값이 변경되면 리액트가 자동으로 컴포넌트 함수를 이용해서 화면을 다시 그린다.

    ### 데이터 변경으로 인한 렌더링 과정

    1. 이전 렌더링 결과를 재사용할 지 판단
        - 속성값이나 상탯값의 이전 이후 값을 비교
        - React.memo를 사용해 속성값, 상탯값이 변경되었을 때만 렌더링하게 할 수 있다.
        - 렌더링이 필요하다고 판단하면 컴포넌트 함수 호출
    2. 컴포넌트 함수를 호출
        - 새로운 가상 돔을 만들고, 이전에 만들었던 가상 돔과 비교해서 변경점을 찾는다.
    3. 가상 돔끼리 비교해서 변경된 부분만 실제 돔에 반영

    ## 4.3.1 React.memo로 렌더링 결과 재사용하기

    리액트는 속성값, 상탯값이 변경될 경우 해당 컴포넌트 함수를 호출해 다시 렌더링

    React.memo 함수로 감싼 컴포넌트라면 속성값 비교 함수가 호출되어, 이전 값과 비교

    ### React.memo 의 두 번째 매개변수

    - 속성값 비교 함수
    - 속성값 비교함수에서 참을 반환하면 이후 단계를 진행하지 않고, 이전 렌더링 결과 재사용
    - 기본값으로 얕은 비교를 수행하는 기본 함수가 사용됨

    ## 4.3.2 속성값과 상탯값을 불변 변수로 관리하는 방법

    ### 함수의 값이 변하지 않도록 관리하기

    컴포넌트 함수 내부에서 함수를 정의하고, 자식 컴포넌트의 속성값으로 그 함수를 입력하면, 함수의 내용이 변경되지 않아도 자식 컴포넌트 입장에서는 속성값이 변경되었다고 인식

    - useCallback 훅 사용해 자식 컴포넌트에게 함수 전달

    ### 객체의 값이 변하지 않도록 관리하기

    함수와 마찬가지로 컴포넌트 내부에서 객체를 정의해서 자식 컴포넌트의 속성값으로 입력하면, 자식 컴포넌트 입장에서는 객체의 내용이 변경되지 않았음에도 속성값이 변경되었다고 인식

    - 변하지 않는 값은 컴포넌트 함수 외부의 상수 변수로 관리하기

        ```jsx
        function SelectFruit({ selectFruit, onChane }) {
        	// ...
        	return (
        		<div>
        			<Select 
        				option={FRUITS}
        				selected={selectedFruit}
        				onChange={onChange}
        		</div>
        	)
        }

        const FRUITS = [
        	{ name: 'apple', price: 500 },
        	{ name: 'orange', price: 1000 },
        	{ name: 'banana', price: 1500 },
        ]
        ```

    - useMemo 훅을 사용해 필요한 경우에만 속성값이 변하도록 처리

        다른 상탯값이나 속성값을 이용해서 계산되는 값은 상수 변수로 관리할 수 없다.

        ```jsx
        function SelectFruit({ selectedFruit, onChange }) {
        	// ...
        	const fruits = useMemo(() => FRIUTS.filter(item => item.price <= maxPrice), maxPrice)

        	return (
        		<div>
        			<Select 
        				option={fruits}
        				selected={selectedFruit}
        				onChange={onChange}
        		</div>
        	)
        }
        ```

        - maxPrice 값이 같으면 fruit 값은 변하지 않는다.

## 4.3.3 가상 돔에서의 성능 최적화

### 요소의 타입 또는 속성을 변경하는 경우

요소의 타입이 변경되는 경우, 해당 요소의 모든 자식 요소도 같이 변경된다.

```jsx
function App() {

	const [flag, setFlag] = useState(true);
	useEffect(() => {
			// 1초마다 flag를 변경한다
			setTimetout(() => setFlag(prev = !prev), 1000);
	});

  // flag에 따라 감싸는 div, span 만 다르게 만든다
	if(flag) {
		return (
			<div>
				<Counter />
				<p>사과</p>
				<p>바나나</p>
			</div>
		)
	} else {
		return (
			<span>
				<Counter />
				<p>사과</p>
				<p>바나나</p>
			</span>
		)	
	}

}
```

- 최상위 요소의 타입(div, span)이 1초마다 변경된다.
- 이때 모든 자식요소를 삭제하고 다시 추가한다.

### 요소의 속성값을 변경

- 해당 속성만 실제 돔에 반영

```jsx
function App() {
	// ...
	return (
		<div
			className={flag ? 'yes' : 'no'}
			style={{color: 'black', backgroundColor: flag ? 'green' : 'red'}}
		>
			
		</div>
	)
}
```

### 요소를 추가하거나 삭제하는 경우

일반적으로 새로운 요소를 추가하거나 삭제하면 해당 요소만 실제 돔에 추가 또는 삭제되며, 기존 요소는 건드리지 않는다.

```jsx
function App() {

	const [flag, setFlag] = useState(true);
	useEffect(() => {
			setTimetout(() => setFlag(prev = !prev), 1000);
	});

	if(flag) {
		return (
			<div>
				<Counter />
				<p>사과</p>
			</div>
		)
	} else {
		return (
			<div>
				<Counter />
				<p>사과</p>
				<p>바나나</p> 
				{/* 마지막에 p 태그 추가 */}
			</div>
		)	
	}
}
```

- key 속성을 사용하면, 리액트는  key 속성을 사용해 데이터를 비교하게 된다.

    ```jsx
    function App() {
    	// ...
    	const fruits = flag ? FRUITS_1 : FRUITS_2;

    	return (
    		<div>
    			{fruits.map((item, index) => (
    				<p> key={index}>{item}</p>			
    			))}
    		</div>
    	)
    }
    ```

    - index를 key값으로 사용하는 예제