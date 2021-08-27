# 3장. 리액트 개념 이해하기

# 3.1 상탯값과 속성값으로 관리하는 UI 데이터

### 상탯값과 속성값

- 상탯값 : 컴포넌트 내부에서 관리되는 데이터
- 속성값: 부모 컴포넌트에서 내려주는 데이터

### UI를 작성하는 코드는 함수 선언식으로 작성

- 따라서 자동으로 화면을 갱신

## 3.1.1 리액트를 사용한 코드의 특징

- 선언형 프로그래밍 Declarative
    - 선언형은 일반적인 명령형 프로그래밍보다 추상화 단계가 높음
    - 따라서 비지니스 로직에 집중할 수 있음

## 3.1.2 컴포넌트의 속성값과 상태값

### 속성값과 상탯값으로 관리하는 UI 데이터

상탯값과 속성값으로 관리되는 데이터는 변경되면, 화면이 갱신된다.

- 상탯값

    : 해당 컴포넌트가 관리하는 데이터

- 속성값

    : 부모 컴포넌트로부터 전달받는 데이터

```jsx
import React, { useState } from 'react';

export default function MyComponent() {
  // 1. 상탯값:  useState 훅을 사용해 상탯값 관리
  const [color, setColor] = useState('red');

  function onClick() {
    setColor(color === 'blue' ? 'red' : 'blue');
  }

  return (
    <div>
      {/* 2. 속성값: 자식 컴포넌트에게 props 로 데이터 전달 */}
      <Title title={'제목을 props로 전달해요'} />

      <button style={{ backgroundColor: color }} onClick={onClick}>
        like!
      </button>
    </div>
  );
}

// 자식 컴포넌트
function Title(props) {
  return <p>{props.title}</p>;
}
```

- 코드 분석
    - 상탯값 state
        - 컴포넌트에 상탯값을 추가할 때는 useState 훅을 사용
        - useState 훅의 인자는 초깃값을 의미
        - userState가 반환하는 배열의 첫 번째 원소는 상탯값, 두 번째 원소는 상탯값 세팅 함수
    - 속성값 props
        - 컴포넌트 함수의 변수로 props를 받아 사용
        - 부모 컴포넌트가 렌더링될 경우, 자식 컴포넌트도 다시 렌더링
            - `React.memo()`:  만약 속성값이 변경될 때만 자식 컴포넌트가 렌더링되길 원하는 경우 사용

                ```jsx
                import React from 'react';
                // 자식 컴포넌트
                function Title(props) {
                  return <p>{props.title}</p>;
                }

                // title 속성값이 변경될 때만 렌더링되기 원하는 경우, 
                // React.memo() 로 감싼다
                export default React.memo(Title);
                ```

### 불변 객체로 관리하는 속성값과 상탯값

속성값은 이미 불변 변수이지만, 상태값은 불변 변수가 아니기 때문에 불변 변수로 관리되도록 주의해야 한다.

- ~~불변 변수: 불변값(primitiva data)을 갖고 있는 변수~~

## 3.1.3 컴포넌트 함수의 반환값

1. 작성한 컴포넌트와 HTML에 정의된 모든 태그 사용 후 반환 가능
2. 문자열과 숫자 반환 가능
3. HTML 코드를 가진 배열 반환 가능 (각 리액트 요소는 key attr를 가져야 한다)
4. 프래그먼트를 사용하면 배열을 사용하지 않고, 여러 요소 반환 가능(key attr 없이 반환 가능)
5. null, boolean 반환 가능(렌더링하지 않음)
6. `ReactDom.createPortal()` 메소드로 리액트 포털 반환 가능 (현재 위치와 관계 없이 특정 돔 요소에 렌더링 가능)

# 3.2 리액트 요소와 가상 돔

리액트 요소(element)는 리액트가 UI를 표현하는 수단

보통 JSX 문법을 사용하기 때문에 리액트 요소의 존재를 잘 알 수 없음

하지만 리액트 요소를 이해하게 된다면, 리액트의 내부 동작 원리에 대해 이해할 수 있다.

### 3.2.1 리액트 요소 이해하기

JSX 문법으로 작성된 코드는 리액트의 createElement 함수로 변경되고, createElement 함수는 리액트 요소를 반환한다.(대부분의 컴포넌트 함수는 리액트 요소를 반환한다.)

```jsx
import React from 'react';

// JSX 문법 ,,, (1)
const element00 = <a href="http://google.com">move Google</a>;

// React.createElement() 함수 ,,,(2)
const element01 = React.createElement(
  'a',
  { href: 'http://google.com' },
  'move Google!',
);
```

- (01)JSX 문법은 아래의 (02) 리액트 엘레먼트를 반환하는 함수로 변경된다.

- createElement() 의 반환값 : 리액트 요소

    ```jsx
    // createElement() 함수의 리턴값: 리액트 요소
    {
        "type": "a",
        "key": "key1",
        "ref": null,
        "props": {
            "style": {
                "width": 100
            },
            "href": "http://google.com",
            "children": "click here!"
        },
        "_owner": null,
        "_store": {}
    }
    ```

    - react element의 구성요소
        - type: 문자열이면 HTML 태그를 나타낸다. 함수인 경우, 우리가 작성한 컴포넌트를 나타낸다.
        - key: JSX 문법에서 key attr를 입력한 값
        - ref: JSX 문법에서 ref attr 입력한 값
        - props: key, ref를 제외한 나머지 attr 값들
    - 리액트 요소는 불변객체이기 때문에 내부 prop들을 직접 변경할 수 없다.
    - 리액트는 전달된 요소를 이전의 리액트 요소와 비교해서 변경된 부분만 실제 돔에 반영

### 3.2.2 리액트 요소가 돔 요소로 만들어지는 과정

하나의 화면을 표현하기 위해 여러 개의 리액트 요소가 트리(tree) 구조로 구성

리액트에서 데이터 변경에 의한 화면 업데이트 단계는 다음으로 구성된다.

1. 렌더 단계(render phase)

    : 실제 DOM에 반영할 변경 사항을 파악하는 단계

    가상 DOM을 만들어 실제 DOM과 비교 후 변경사항만을 반영

    돔의 변경 사항을 최소화하기 위한 과정(실제 DOM을 변경하는 작업은 다른 작업에 비해 비용이 많이 들기 때문)

2. 커밋 단계(commit phase)

    : 파악된 변경 사항을 실제 돔에 반영하는 단계

- 리액트 요소가 실제 DOM 을 구성하는 과정
    1. ReactDOM.render() 함수의 매개변수로 들어가는 리액트 요소들에 대해 컴포넌트 함수 호출
    또는 상태값을 변경하는 함수에 의해 시작
    2. tree 구조의 가장 부모 컴포넌트부터 최하단 컴포넌트까지 모든 요소의 type prop들이 문자열로 변환될 때까지 하위의 컴포넌트 함수 호출

        (모든 리액트 요소의 type 속성값이 문자열이어야 실제 DOM(HTML 태그)로 변환할 수 있다.)

    3. 모든 리액트 요소의 type prop이 문자열로 변경된 상태의 트리를 **가상 DOM**이라 한다.

        최초의 리액트 요소 트리로부터 가상 돔을 만들고, 이전 가상 DOM과 비교해 실제 DOM에 반영할 내용을 결정하는 단계를 렌더라고 한다.

# 3.3 리액트 훅 기초 익히기

훅은 함수형 컴포넌트에 기능을 추가할 때 사용하는 함수

리액트 16.8에 추가된 기능이며, 기존 리액트가 갖고 있던 여러문제를 해결해준다.

따라서 클래스형 컴포넌트보다 훅을 사용할 수 있는 함수형 컴포넌트로 작성하는 게 좋다.

## 3.3.1 상탯값 추가하기: useState

컴포넌트에 상탯값을 추가할 수 있다.

### 배치로 처리되는 상탯값 변경 함수

Batch란?

데이터를 실시간으로 처리하는 것이 아닌, 일괄적으로 모아서 처리하는 작업을 의미

 useState 훅이 반환하는 배열의 첫 번째 원소는 상탯값, 두 번째 요소는 상탯값 변경 함수

리액트는 상탯값 변경 함수가 호출되면, 해당 컴포넌트를 다시 그린다.(자식 컴포넌트들도 같이 렌더링됨)

```jsx
import React, { useState } from 'react';

export default function CountComponent() {
  const [count, setCount] = useState({ value: 0 });

  function onClick() {
    setCount({ value: count.value + 1 }); // 두 번 호출
    setCount({ value: count.value + 1 });
  }
  console.log('render called');

  return (
    <div>
      <h2>{count.value}</h2>
      <button onClick={onClick}>증가</button>
    </div>
  );
}
```

- count.value 상탯값을 두 번 증가시키려고 했으나, 기대와 달리 1 만큼만 증가
    - 상탯값 변경 함수는 비동기로 동작하기 때문
    - 동기로 처리하면, 하나의 상탯값 변경 함수가 호출될 때마다 화면을 다시 그리기 때문에, 성능 이슈가 생길 수 있다.

### 상탯값 변경 함수에 인자로 함수를 입력하기

```jsx
import React, { useState } from 'react';

export default function CountComponent() {
  const [count, setCount] = useState({ value: 0 });

  function onClick() {
    setCount(prev => ({ value: prev.value + 1 })); // ... 함수 입력
    setCount(prev => ({ value: prev.value + 1 }));
  }
  console.log('render called');

  return (
    <div>
      <h2>{count.value}</h2>
      <button onClick={onClick}>증가</button>
    </div>
  );
}
```

- 상탯값 변경 함수로 입력된 함수는 자신이 호출되기 직전의 상탯값을 매개변수로 받는다.
- 여기서는 count.value가 2씩 증가하게 된다

    이유를 모르겠음 왜 인자로 함수를 사용하게 되면 비동기여도 2가 추가되는 것인가?

### 호출 순서가 보장되는 상탯값 변경 함수

상탯값 변경 함수는 비동기로 처리되지만, 그 순서가 보장된다.

### useState 훅 하나로 여러 상탯값 관리하기

useState 훅의 상탯값 변경 함수는 이전 상탯값을 덮어쓴다.

아래 코드는 state라는 상탯값을 객체로 관리해 여러 상탯값을 하나의 변경 함수로 관리하는 코드

```jsx
import React, { useState } from 'react';

export default function MultiState() {
  // 두 개의 상탯값을 하나의 객체로 관리
  const [state, setState] = useState({ name: '', age: 0 });

  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>

      <input
        type="text"
        value={state.name}
        // setState는 덮어쓰기 때문에, 기존 데이터를 구조분해할당으로 복사
        onChange={e => setState({ ...state, name: e.target.value })}
      />
      <input
        type="text"
        value={state.age}
        onChange={e => setState({ ...state, age: e.target.value })}
      />
    </div>
  );
}
```

## 3.3.2 컴포넌트에서 부수 효과 처리하기 : useEffect

- 부수효과 side effect: 함수 실행 시, 외부의 상태를 변경하는 연산

특별한 이유가 없다면, 모든 부수 효과는 useEffect 훅에서 처리하는 게 좋다.

- 사용 예시
    1. API 호출하는 것(network request)
    2. 이벤트 처리 함수를 등록, 해제(이벤트 구독 관리)하는 것
    3. 리액트 DOM 을 수동으로 조작하는 것

```jsx
import React, { useState, useEffect } from 'react';

function EffectComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => { // ... (1)
    document.title = `업데이트 횟수: ${count}`;
  });

  return <button onClick={() => setCount(count + 1)}>increase</button>;
}

export { EffectComponent };
```

- 부수 효과 함수: useEffect의 인자로 사용되는 함수
    - 부수효과 함수의 호출
        1. 부수 효과 함수는 렌더링 결과가 실제 돔에 반영된 후, 호출(즉, 렌더링 이후에 호출)
            - 따라서 렌더링 이후에 매번 수행됨(렌더링 이후에 매번 수행하지 않기 위해서는 empty 의존성 배열 사용)
        2. 컴포넌트가 최초로 생성될 때

        - 부수효과 함수의 반환 함수의 호출
            - 컴포넌트가 사라지기 직전에 마지막으로 호출(컴포넌트 마운트 해제시)

### 컴포넌트에서 API 호출하기

useEffect 훅을 사용해 다음과 같이 API 호출

```jsx
import React, { useState, useEffect } from 'react';

export default function Profile({ userId }) {
  const [user, setUser] = useState(null);

	// 컴포넌트 함수 호출 또는 렌더링마다 호출
  useEffect(() => {
    getUserApi(userId).then(res => setUser(res.data));
  }, [userId]); // 의존성 배열(배열의 요소가 변경되는 경우에만 부수효과 함수 호출)

  return (
    <div>
      {!user && <p> 사용자 정보를 가져오는 중...</p>}
      {user && (
        <>
          <p>{`name is ${user.name}`}</p>
          <p>{`age is ${user.age}`}</p>
        </>
      )}
    </div>
  );
}
```

- useEffect 훅의 인자
    1. 첫 번째 인자: 부수 효과 함수
    2. 두 번째 인자: 의존성 배열

        배열의 원소가 변경되는 경우에만 부수효과 함수 호출

### 이벤트 처리 함수를 등록하고 해제하기

```jsx
import React, { useState, useEffect } from 'react';

function WidthPrinter() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <div>{`width is ${width}`}</div>;
}

export { WidthPrinter };
```

### 부수효과 함수는 함수를 반환할 수 있다. clean-up 함수

정리(clean-up)가 필요한 경우에 사용

이벤트 등록이 계속 되어 있다면, 메모리 누수 가능성 존재

따라서 컴포넌트가 마운트 해제되는 시점에 실행

- 반환된 함수는 부수효과 함수가 호출되기 직전에 호출되고, 컴포넌트가 사라지기 직전에 마지막으로 호출(마운트 해제 시점)된다.
- 따라서 부수효과 함수가 반환하는 함수는 프로그램이 비정상적으로 종료되지 않는다면, 반드시 호출될 것이 보장된다.
- 의존성 배열이 빈 배열로 입력되면, 컴포넌트가 생성될 때에만 부수효과 함수가 호출되고, 컴포넌트가 사라질 때만 반환된 함수가 호출된다.( ⚠️ 부수효과 함수가 렌더링 시 호출 x )

## 3.3.3 훅 직접 만들기

커스텀 훅을 만들 수 있다. 또 커스텀 훅을 사용해 또 다른 커스텀 훅을 만들 수 있다.

로직의 재사용성 높아짐

- 내장 훅처럼 이름은 `use` 로 시작

### useUser 커스텀 훅

- 특정 API 호출을 담당하는 커스텀 훅

    ```jsx
    import React, { useState, useEffect } from 'react';

    // custom hook
    function useUser(userId) {
      const [user, setUser] = useState(null);

      useEffect(() => {
        getUserApi(userId).then((res) => setUser(res.data));
      }, [userId]); // 의존성 배열(배열의 요소가 변경되는 경우에만 부수효과 함수 호출)

      return user;
    }

    export default function Profile({ userId }) {
      // custom hook 사용
      const user = useUser(userId);

      return (
        <div>
          {!user && <p> 사용자 정보를 가져오는 중...</p>}
          {user && (
            <>
              <p>{`name is ${user.name}`}</p>
              <p>{`age is ${user.age}`}</p>
            </>
          )}
        </div>
      );
    }

    function getUserApi(userId) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (userId === 'jee') {
            resolve({ success: true, data: { name: 'jeehaeng', age: 30 } });
          }
          return;
        }, 3000);
      });
    }
    ```

### useWidthPrinter 커스텀 훅

- DOM 에 이벤트를 등록, 삭제하는 커스텀 훅

    ```jsx
    import React, { useState, useEffect } from 'react';

    // custom hook : event 등록과 해제
    function useWidthPrinter() {
      const [width, setWidth] = useState(window.innerWidth);

      useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => {
          window.removeEventListener('resize', onResize);
        };
      }, []); // 빈 의존성 배열 : 렌더링시 부수효과 함수 호출 X
      return width;
    }

    function WidthPrinter() {
      const width = useWidthPrinter();
      return <div>{`width is ${width}`}</div>;
    }
    ```

### useMounted 커스텀 훅

- Mount 마운트: 컴포넌트의 첫 번째 렌더링 결과가 실제 돔에 반영된 상태를 말한다.

    ```jsx
    function useMounted() {
    	const [mounted, setMounted] = useState(false);
    	useEffect(() => {setMounted(true)}, []); 
    	// 의존성 배열이 비었으므로, 컴포넌트 최초 생성시, 컴포넌트 소멸시 호출

    	return mounted;
    }
    ```

## 3.3.4 훅 사용 시 지켜야 할 규칙

1. 하나의 컴포넌트에서 훅을 호출하는 순서는 항상 같아야 한다.
2. 훅은 함수형 컴포넌트 또는 커스텀 훅 안에서만 호출되어야 한다.

⚠️ 위 규칙을 따라야 리액트가 각 훅의 상태를 제대로 기억할 수 있다.

## 3.4 콘텍스트 API로 데이터 전달하기

콘텍스트 API를 사용하면, 상위 컴포넌트에서 하위에 있는 모든 컴포넌트로 직접 데이터를 전달할 수 있다.

- 가까운 하위 컴포넌트로는 속성값(props)로 데이터를 전달하기 쉽지만, 많은 하위 컴포넌트로 전달할 때는 속성값을 내려주는 코드를 반복해서 작성해야하는 문제가 발생
- 특히 전달하려는 하위 컴포넌트와의 거리가 멀다면, 중간의 컴포넌트들에게 모두 속성값을 전달해야하는 불편함 존재

```jsx
import React, { createContext, useState } from 'react';

// context API 선언
const UserContext = createContext('');

function App() {
  const [username, setUsername] = useState('');
  return (
    <div>
      {/* // context 제공자 */}
      <UserContext.Provider value={username}>
        <div>상단 메뉴</div>
        <Profile />
        <div>하단 메뉴</div>
      </UserContext.Provider>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
    </div>
  );
}

// React.memo() 를 통해 중간 단계 컴포넌트가 렌더링되지 않도록 처리
const Profile = React.memo(() => {
  return (
    <div>
      <Greeting />
    </div>
  );
});

function Greeting() {
  return (
    // context 소비자
    <UserContext.Consumer>
      {username => <p>{`${username}님 안녕하세요`}</p>}
    </UserContext.Consumer>
  );
}

export default App;
```

- App - Profile - Greeting 구조
- createContext() 를 통해 컨텍스트를 만든다
- 제공하는 쪽에서는 <[컨텍스트명].Provider> 로 감싸준다
- 사용하는 쪽에서는 <[컨텍스트명].Consumer> 로 감싼다.
    - 내부에서 콜백함수로 사용 가능

### 중간 단계 컴포넌트가 렌더링 되지 않도록 React.memo 사용

- 전달하려는 데이터가 수정되면, <[컴포넌트명].Provider> 의 속성이 수정되는 것이므로 렌더링이 발생하고, 자식 컴포넌트들도 렌더링을 한다.
- 이를 방지하기 위해 React.memo 로 중간 컴포넌트를 감싼다
- 즉, 중간 컴포넌트의 렌더링 여부에 관계없이, Provider 컴포넌트가 새로 입력되면, Consumer 컴포넌트가 다시 렌더링되는 것이 보장된다.

## 3.4.2 콘텍스트 API 활용하기

### 여러 콘텍스트를 중첩해서 사용하기

- 여러 콘텍스트의 Provider, Consumer 컴포넌트를 중첩해서 사용할 수 있다.

```jsx
import React, { createContext, useState } from 'react';

// context API 선언
const UserContext = createContext('');
const ThemeContext = createContext('dark');

function ContextApi() {
  const [username, setUsername] = useState('');
  return (
    <div>
      {/* // 중첩 context 제공자 */}
      <ThemeContext.Provider value="light">
        <UserContext.Provider value={username}>
          <div>상단 메뉴</div>
          <Profile />
          <div>하단 메뉴</div>
        </UserContext.Provider>
      </ThemeContext.Provider>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
    </div>
  );
}

// React.memo() 를 통해 중간 단계 컴포넌트가 렌더링되지 않도록 처리
const Profile = React.memo(() => {
  return (
    <div>
      <Greeting />
    </div>
  );
});

function Greeting() {
  return (
    // context 소비자
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {username => (
            <p
              style={{ color: theme === 'dark' ? 'gray' : 'green' }}
            >{`${username}님 안녕하세요`}</p>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

export default ContextApi;
```

- 두 개의 Provider,  Consumer 컴포넌트를 중첩해서 사용
- 데이터의 종류별로 콘텍스트를 만들어 사용하면, 렌더링 성능상 이점

### 하위 컴포넌트에서 콘텍스트 데이터를 수정하기

- 하위 컴포넌트에서도 콘텍스트 데이터 수정 가능

```jsx
import React from 'react';

const UserContext = React.createContext({ username: '', helloCount: 0 });
const SetUserContext = React.createContext(() => {});

export default function SubComponentUpdate() {
  const [user, setUser] = React.useState({ username: 'mike', helloCount: 0 });
  return (
    <div>
      {/* // context 데이터를 수정할 수 있는 함수 전달 */}
      <SetUserContext.Provider value={setUser}>
        <UserContext.Provider value={user}>
          <Profile />
        </UserContext.Provider>
      </SetUserContext.Provider>
    </div>
  );
}

const Profile = React.memo(() => {
  return (
    <div>
      <Greeting />
    </div>
  );
});

function Greeting() {
  return (
    // context 소비자
    <SetUserContext.Consumer>
      {setUser => (
        <UserContext.Consumer>
          {({ username, helloCount }) => (
            <React.Fragment>
              <p>{`${username}님 안녕하세요`}</p>
              <p>{`인사 횟수: ${helloCount}`}</p>
              <button
                onClick={() =>
                  setUser({ username, helloCount: helloCount + 1 })
                }
              >
                인사하기
              </button>
            </React.Fragment>
          )}
        </UserContext.Consumer>
      )}
    </SetUserContext.Consumer>
  );
}
```

- 하위 컴포넌트에서 조상으로부터 전달된 setUser 함수를 이용해 이벤트 처리 함수를 구현
- helloCount 속성만을 변경하는데도, 사용자 데이터를 만들어서 setUser 함수에 입력해야하는 단점 존재
- 이 후 리액트에서 제공하는 useReducer 훅 사용

## 3.4.3 콘텍스트 API 사용 시 주의할 점

### 불필요한 렌더링이 발생하는 예

```jsx
const UserContext = React.createContext({ username: ''});

function App() {
	const [username, setUsername] = useState(""); // 
	return (
		<div>
			<UserContext.Provider value = {{ username }}>
			// ..
```

- 컨텍스트 데이터로 '객체'를 전달하고 있다.
- 컴포넌트가 렌더링될 때마다 새로운 객체가 생성
- 컴포넌트가 새로 렌더링될 때마다 하위의 Consumer 컴포넌트도 다시 렌더링 된다.

### 개선된 코드

```jsx
const UserContext = React.createContext({ username: ''});

function App() {
	const [user, setUser] = useState({ username: '' }); // 
	return (
		<div>
			<UserContext.Provider value = { user }>
			// ..
```

- 컨텍스트 데이터 전체를 상탯값으로 관리한다
- username 값이 변경될 때에만 새로운 객체가 전달되므로 불필요한 렌더링 발생 X

# 3.5 ref 속성값으로 자식 요소 접근하기

DOM 요소에 직접 접근해야 할 때가 있다

- DOM 요소에 focus를 주는 경우
- DOM 요소의 크기나, 스크롤 위치를 알고 싶은 경우 등

자식 요소는 컴포넌트 또는 DOM 요소 일 수도 있다.

## 3.5.1 ref 속성값 이해하기

```jsx
import React, { useRef, useEffect } from 'react';

export default function Ref00() {
  // ref 생성
  const inputRef = useRef();

  // 마운트 끝나고 호출
  useEffect(() => {
    // 특정 요소 focusing
    inputRef.current.focus();
  }, []);
  return (
    <div>
      {/* ref 할당 */}
      <input type="text" ref={inputRef} />
      <button>저장</button>
    </div>
  );
}
```

- useRef() 의 반환값은 ref 객체
- 접근하고자 하는 자식 요소의 ref 속성값에 ref 객체를 입력
- 해당 DOM 요소 또는 컴포넌트가 생성되면, ref 객체로 접근 가능
- ref 객체의 current 프로퍼티를 이용하면, 자식 요소에 접근 가능

## 3.5.2 ref 속성값 활용하기

### 함수형 컴포넌트에서 ref 속성값 사용하기

- useImperativeHandel 훅을 사용하면 함수형 컴포넌트에서도 변수와 함수를 외부로 노출시킬 수 있다.
- 함수형 컴포넌트에 ref 속성값을 입력할 수는 없지만, 다른 이름으로 ref 객체를 입력받아 내부의 리액트 요소에 연결할 수는 있다.

```jsx
import React, { useEffect, useRef } from 'react';

// 하위 컴포넌트
// 전달받은 ref 객체를 DOM 요소로 연결
function TextInput({ inputRef }) {
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button>저장</button>
    </div>
  );
}

// 상위 컴포넌트
const ComponentRef = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {/* 속성값으로 ref  객체 전달 */}
      <TextInput inputRef={inputRef} />
      <button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
    </div>
  );
};

export default ComponentRef;
```

- 부모 컴포넌트 입장에서 손자 요소에 ref 속성값을 넣는 형태가 된다.
- 이 방법은 TextInput 컴포넌트의 내부 구조를 외부에서 알아야 하므로 좋은 방법은 아니다.

### forwardRef 함수로 ref 속성값을 직접 처리하기

- 함수형 컴포넌트의 속성값으로 ref를 사용하면, (ref는 예약어이므로) 리액트가 내부적으로 처리하기 때문에, 손자 요소에 직접 연결할 수 없다.
- 이 경우, forwardRef 함수를 사용하면 ref 속성값을 직접 처리할 수 있다.

```jsx
import React, { useRef, useEffect } from 'react';

//forwardRef 함수로 감싼다
const TextInput = React.forwardRef((props, ref) => {
  return (
    <div>
      <input type="text" ref={ref} />
      <button>저장</button>
    </div>
  );
});

const ForwardRef = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {/* 속성값으로 ref  객체 전달 */}
      <TextInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
    </div>
  );
};

export default ForwardRef;
```

### ref 속성값으로 함수 사용하기

- ref 속성값에 함수를 입력하면, 자식 요소가 생성되거나 제거되는 시점에 호출
- 컴포넌트가 렌더링 될 때마다 새로운 함수를 ref 속성값으로 넣게 된다(이후 렌더링)

    따라서 고정된 함수를 사용해, 새로운 함수가 아닌 같은 함수를 사용하도록 처리해야함

    ```jsx
    import React, { useState, useCallback } from 'react';

    const INITIAL_TEXT = '안녕하세요.';

    const FuncitonRef = () => {
      const [text, setText] = useState(INITIAL_TEXT);
      const [showText, setShowText] = useState(true);

      // 고정된 함수 입력(useCallback 훅의 메모이제이션 기능 사용)
      const setInitialText = useCallback(ref => ref && setText(INITIAL_TEXT), []);
      return (
        <div>
          {showText && (
            <input
              type="text"
              // ref  속성으로 입력한 함수는 해당 요소가 제거되거나, 생성될 대마다 호출
              // 생성 시: 해당 요소 참조 변수가 넘어옴
              // 삭제 시: null 값이 넘어옴
              ref={setInitialText}
              value={text}
              onChange={e => setText(e.target.value)}
            />
          )}

          {/* showText의 상태에 따라 input 요소가 제거되거나 생성 */}
          <button onClick={() => setShowText(!showText)}>보이기 / 가리기</button>
        </div>
      );
    };

    export default FuncitonRef;
    ```

# 3.6 리액트 내장 훅 살펴보기

## 3.6.1 Consumer 컴포넌트 없이 컨텍스트 사용하기 : useContext

```jsx
import React from 'react';

const UserContext = React.createContext();
const user = { name: 'mike', age: 23 };

const ParentComponent = () => {
  return (
    <UserContext.Provider value={user}>
      <ChildComponent />
    </UserContext.Provider>
  );
};

// ! 기존 hook 없이 사용하는 Context 소비하는 코드
// const ChildComponent = () => {
//   return (
//     <div>
//       <UserContext.Consumer>
//         {user => (
//           <>
//             <p>{`name is ${user.name}`}</p>
//             <p>{`age is ${user.age}`}</p>
//           </>
//         )}
//       </UserContext.Consumer>
//     </div>
//   );
// };

// ! useContext() 훅 사용
const ChildComponent = () => {
  const user = React.useContext(UserContext);

  return (
    <div>
      <p>{`name is ${user.name}`}</p>
      <p>{`age is ${user.age}`}</p>
    </div>
  );
};

export default ParentComponent;
```

## 3.6.2 렌더링과 무관한 값 저장하기: useRef

useRef 훅의 용도

1. 자식요소에 접근
2. 컴포넌트 내부의 생성되는 값 중 렌더링과 무관한 값을 저장
    - e.g setTimeout이 반환하는 값을 어딘가에 저장해두고, 필요 시점에 clearTimeout을 호출해야 하는 경우

    ```jsx
    import React from 'react';

    const Profile = () => {
      const [age, setAge] = React.useState(20);
      // 이전 상태값을 저장하기 위한 용도로 useRef 사용
      const prevAgeRef = React.useRef(20);

      // age가 변경되면, 해당 값을 prefAgeRef에 저장
      React.useEffect(() => {
        prevAgeRef.current = age;
      }, [age]);

      // 이전 상태값 이용
      const prevAge = prevAgeRef.current;
      const text = age === prevAge ? 'same' : age > prevAge ? 'older' : 'younger';

      return (
        <div>
          <p>{`age ${age} is ${text} then age ${prevAge}`}</p>
          <button
            onClick={() => {
              const age = Math.floor(Math.random() * 50 + 1);

              // age가 변경되고 다시 렌더링할 때, prevAge는 age의 이전 상탯값을 나타낸다.
              setAge(age);
            }}
          >나이 변경</button>
        </div>
      );
    };

    export default Profile;
    ```

    ## 3.6.3 메모이제이션 훅 : useMemo, useCallback

    이전 값을 기억해 성능을 최적화하는 용도로 사용된다.

    ### useMemo

    계산량이 많은 함수의 반환값을 재활용하는 용도로 사용

    lodah 등 라이브러리에서 제공해주는 메모이제이션과 유사

    - 의존성 배열의 변수의 값이 변경되지 않으면, 이전에 반환한 값을 재사용
    - 만약 의존성 배열의 값이 변경됐으면, 첫 번째 매개변수로 입력된 함수를 실행하고 그 반환값 기억

    ```jsx
    import React from 'react';

    const ParentComponent = () => {
      return (
        <div>
          <ChildComponent
            v1={[1, 2, 3, 4, 5]}
            v2={[1, 2, 3, 4, 5]}
          ></ChildComponent>
        </div>
      );
    };

    const ChildComponent = ({ v1, v2 }) => {
      // 캐싱할 함수를 첫 번째 인자로 받고, 의존성 배열을 두 번째 인자로 받음
      const value = React.useMemo(() => runExpensiveJob(v1, v2), [v1, v2]);
      return (
        <>
          <p>{`value is ${value}`}</p>
        </>
      );
    };
    // 대충 비용이 많이 드는 함수라고 생각하고 코드 이해
    const runExpensiveJob = (arr1, arr2) =>
      arr1.reduce((sum, cur, index) => sum + cur + arr2[index], 0);

    export default ParentComponent;
    ```

    ### useCallback

    리액트의 렌더링 성능을 위해 제공되는 훅

    컴포넌트가 렌더링될 때마다 새로운 함수를 생성해서 자식 컴포넌트의 속성값으로 입력하는 경우가 많다.

    이 때 자식 컴포넌트의 속성값이 매번 변경되기 때문에, 자식 컴포넌트에서 React.memo를 사용해도 불필요한 렌더링이 발생

    - 첫 번재 인자로, 기억할 함수
    - 두 번째 인자로, 의존성 배열
        - 의존성 배열의 데이터가 변경되지 않으면, 이전에 생성한 함수가 재사용

    ```jsx
    import React from 'react';

    const Profile = () => {
      const [name, setName] = React.useState('');
      const [age, setAge] = React.useState(0);

      // ! useCallback
      const onSave = React.useCallback(() => saveToServer(name, age), [name, age]);

      return (
        <div>
          <h3>useCallback</h3>
          <p>{`name is ${name}`}</p>
          <p>{`age is ${age}`}</p>
          <UserEdit
            // 현재 컴포넌트가 렌더링될 때마다 자식 컴포넌트의 속성(onSave)으로 새로운 함수가 입력
            // onSave={() => saveToServer(name, age)}

            // useCallback 사용
            onSave={onSave}
            setName={setName}
            setAge={setAge}
          ></UserEdit>
        </div>
      );
    };

    // 연습용 자식 컴포넌트
    const UserEdit = ({ onSave, setName, setAge }) => {
      return (
        <div>
          <input
            type="text"
            onChange={e => setName(e.currentTarget.value)}
            placeholder="name"
          />
          <input
            type="number"
            onChange={e => setAge(e.currentTarget.value)}
            placeholder="age"
          />
          <button onClick={() => onSave()}>save</button>
        </div>
      );
    };

    // 연습용 api
    const saveToServer = (name, age) => {
      setTimeout(() => {
        console.log('server success');
        return true;
      }, 1000);
    };

    export default Profile;
    ```

## 3.6.4 컴포넌트의 상탯값을 리덕스처럼 관리하기: useReducer

```jsx
import React from 'react';

// 리덕스나 리듀서와 같은 방식으로 작성한 리듀서 함수
const INITIAL_STATE = { name: 'empty', age: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setAge':
      return { ...state, age: action.age };
    default:
      return state;
  }
};

const Profile = () => {
  // useReducer 의 매개변수 (리듀서, 초기 상탯값)
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <h2>useReducer</h2>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <input
        type="text"
        value={state.value}
        onChange={e =>
          dispatch({ type: 'setName', name: e.currentTarget.value })
        }
      />
      <input
        type="number"
        value={state.age}
        onChange={e =>
          dispatch({ type: 'setAge', age: e.currentTarget.value })
        }
      />
      
    </div>
  );
};

export default Profile;
```

### 트리의 깊은 곳으로 이벤트 처리 함수 전달하기

보통 상위 컴포넌트에서 다수의 상탯값을 관리

자식 컴포넌트에서 발생한 이벤트로부터 상위 컴포넌트의 상탯값을 변경해야 하는 경우가 많음

```jsx
import React from 'react';

// 리덕스나 리듀서와 같은 방식으로 작성한 리듀서 함수
const INITIAL_STATE = { name: 'empty', age: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setAge':
      return { ...state, age: action.age };
    default:
      return state;
  }
};

// const API로 하위 컴포넌트에게 이벤트 전달
export const ProfileDispatch = React.createContext(null);

const Profile = () => {
  // useReducer 의 매개변수 (리듀서, 초기 상탯값)
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <h2>useReducer</h2>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <input
        type="text"
        value={state.value}
        onChange={e =>
          dispatch({ type: 'setName', name: e.currentTarget.value })
        }
      />
      <input
        type="number"
        value={state.age}
        onChange={e => dispatch({ type: 'setAge', age: e.currentTarget.value })}
      />
      <ProfileDispatch.Provider value={dispatch}>
        <GrandChild></GrandChild>
      </ProfileDispatch.Provider>
    </div>
  );
};

const GrandChild = () => {
  // useContext로 전달받은 dispath 사용 가능
  const profileDispatch = React.useContext(ProfileDispatch);

  return <h4>자식의 자식</h4>;
};

export default Profile;
```

- contextAPI를 사용해 자손 컴포넌트에게  useReducer의 dispatch 전달

## 3.6.5 부모 컴포넌트에서 접근 가능한 함수 구현하기: useImperativeHandle

- imperative: 반드시 해야하는, 명령을 나타내는..

ref객체를 통해서도 접근이 가능하지만, 의존성이 생기기 때문에 지양해야 한다.

```jsx
import React from 'react';

// 두 번째 객체로 ref 객체가 넘어온다.
function Profile(props, ref) {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState(0);

  // ref 객체와 부모 컴포넌트에서 접근 가능한 함수
  React.useImperativeHandle(ref, () => ({
    addAge: value => setAge(age + value),
    getNameLength: () => name.length,
  }));
  return (
    <div>
      <p>{`name is ${name}`}</p>
      <p>{`age is ${age}`}</p>
    </div>
  );
}

// 부모 객체에서 직접 처리하기 위해 forwardRef 함수로 호출
export default React.forwardRef(Profile);

// ! 부모 컴포넌트에서 자식 컴포넌트 함수 호출하기
function Parent() {
  const profileRef = React.useRef();
  const onClick = () => {
    if (profileRef.current) {
      console.log(`current name length: ${profileRef.current.getNameLength()}`);
      profileRef.current.addAge(5);
    }
  };

  return (
    <div>
      {/* 컴포넌트 속성으로 ref 객체 전달 */}
      <Profile ref={profileRef} />
      <button onClick={onClick}>add age 5</button>
    </div>
  )
}
```

## 3.6.6 기타 리액트 내장 훅: useLayoutEffect, useDebugValue

### useLayoutEffect

- useEffect 훅에 입력된 부수 효과 함수는 렌더링 결과가 DOM에 반영된 후 비동기로 호출
- useLayoutEffect는 useEffect 훅과 거의 비슷하게 동작하지만, 부수 효과 함수를 동기로 호출한다는 점이 차이점

### useDebugValue

- useDebugValue는 개발 편의를 위해 제공되는 훅
- 커스텀 훅의 내부 상태를 관찰할 수 있기 때문에 디버깅에 도움이 된다