# 03. Typescript

typescript + next : TodoList

- figma 화면설계
  - https://www.figma.com/file/DG0lfZ1an3xM0AcssQsXJZ/Untitled?node-id=0%3A1

## 3.1. Environment

next 환경

```sh
npm init -y
npm i next react react-dom
npm i -D eslint
```

TS 환경

```sh
npm i -D typescript @types/react @types/node
```

eslint

```sh
npm i -D eslint
npx eslint --init
```

---

## 3.3 TS + Next page 만들기

### NextPage Type

- pages 폴더 내에서 사용 하는 컴포넌트들의 타입
- react 컴포넌트의 확장 - `getInitailProps` 함수를 갖고 있음

---

# 04. Styled Component

- CSS-in-JS 의 대표적인 라이브러리
- styled-jsx 와 유사하지만, 더 많은 기능이 있는 라이브러리

예제

https://github.com/vercel/next.js/tree/canary/examples/with-styled-components/pages

## 4.1. Evironment

```sh
npm i styled-components
npm i @types/styled-components -D
```

### 4.1.1 styled-component 로 SSR 지원하기

- Document 를 확장 -> SSR 과정에 `<head>` 에 스타일을 세팅하는 흐름

### babelrc

```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}

```



#### _document.tsx

```tsx
import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
```



### 4.1.2 styled-component로 글로벌 스타일 적용

style/GlobalStyle.ts

```typescript
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;
```



pages/_app.tsx

```tsx
import App, { AppProps, AppContext, AppInitialProps } from 'next/app';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';

// AppProps 타입 : 컴포넌트의 props
const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* 글로벌 스타일 적용 */}
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default app;
```



### browser 기본 style reset

```sh
npm i styled-reset
```

style/GlobalStyle.ts

```typescript
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
/* 모든 스타일 초기화 */
  ${reset}
  * {
    box-sizing: border-box;
   }
`;

export default GlobalStyle;
```

## 4.2 font 적용

pages/_document.tsx

```tsx
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	// ...

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

```

style/GlobalStyle.ts

- styled-component에서 제공하는 css 함수 사용해 변수처럼 사용 가능

```typescript
import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

// styled-componet의 css 함수 사용 - 변수로 할당 가능
const globalStyle = css`
  /* 모든 스타일 초기화 */
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

export default GlobalStyle;
```

---

# 05. TodoList

## 5.1. Header.tsx

components/Header.jsx

```tsx
import styled from 'styled-components';
import palette from '../styles/palette';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 0 12px;
  /* 변수처럼 사용 가능 */
  border-bottom: 1px solid ${palette.gray};
  /* 네스팅 가능 */
  h1 {
    font-size: 21px;
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <h1>Uhjee's TodoList</h1>
    </Container>
  );
};

export default Header;

```

pages/_app.tsx

- Header 컴포넌트 추가

```tsx
import App, { AppProps, AppContext, AppInitialProps } from 'next/app';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';

// AppProps 타입 : 컴포넌트의 props
const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* 글로벌 스타일 적용 */}
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default app;
```



###  🚨 React.FC 타입 (functional Component)

```tsx
import React from 'react';

type GreetingsProps = {
  name: string;
};

const Greetings: React.FC<GreetingsProps> = ({ name }) => (
  <div>Hello, {name}</div>
)
```

- props의 타입을 Generics로 넣어서 사용
- 단점 존재 (optional prop, `defaultProps` 동작 X) -> 따라서 권장하지 않기도 함

```tsx
// React.FC 사용하지 않은 코드

import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
  optional?: string;
};

function Greetings({ name, mark, optional }: GreetingsProps) {
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
    </div>
  );
}

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;
```

---

## 5.2. Todolist 스타일링

components/TodoList.tsx

```tsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const TodoList: React.FC = () => {
  return (
    <Container>
      <h1>TodoList</h1>
    </Container>
  );
};

export default TodoList;

```

types/todo.d.ts

```typescript
// typescript의 타입 추론을 돕는 파일
export type TodoType = {
  id: number;
  text: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'navy';
  checked: boolean;
};

```

pages/index.tsx

```tsx
import { NextPage } from 'next';
import React from 'react';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';

// dummy datas
const todos: TodoType[] = [
  {
    id: 1,
    text: '책을 읽자',
    color: 'red',
    checked: false,
  },
  {
    id: 2,
    text: '피자를 먹자',
    color: 'yellow',
    checked: false,
  },
  {
    id: 3,
    text: '산책을 하자',
    color: 'blue',
    checked: true,
  },
  {
    id: 4,
    text: '똑바로 누워서 자자',
    color: 'orange',
    checked: true,
  },
  {
    id: 5,
    text: '골반 교정을 하자',
    color: 'navy',
    checked: false,
  },
  {
    id: 6,
    text: '쓰레기는 쓰레기통에 버리자',
    color: 'green',
    checked: false,
  },
];

const Index: NextPage = () => {
  return <TodoList todos={todos} />;
};

export default Index;

```

pages/TodoList.tsx

- React.FC 에 Generics로 `Interface` 세팅 (export하지 않기 때문에 `type`이 아닌 `interface`)

```tsx
import { TodoType } from '../types/todo';
// ...

interface IProps {
  todos: TodoType[];
}
// ...

// React.FC 타입에 Generics으로 interface 세팅
const TodoList: React.FC<IProps> = ({ todos }) => {
  return (
// ...
```

### 5.2.1 색상별 TodoList 개수 구하기

### useCallback

- 리렌더링 시의 재계산 방지
- **함수**에 대해 종속성 부여

### useMemo

- 리렌더링 시의 재계산 방지
- **변수**에 대해 종속성 부여

pages/TodoList.tsx

```tsx
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';

interface IProps {
  todos: TodoType[];
}

type ObjectIndexType = {
  [key: string]: number | undefined;
};

const Container = styled.div`
  width: 100%;

  .todo-count {
    margin-left: 12px;
  }

  .todo-list-header {
    padding: 12px;
    position: relative;
    border-bottom: 1px solid ${palette.gray};

    .todo-list-last-todo {
      font-size: 14px;
      margin: 0 0 8px;
      span {
        margin-left: 12px;
      }
    }

    .todo-list-header-colors {
      display: flex;

      .todo-list-header-color-count {
        display: flex;
        margin-right: 8px;

        p {
          font-size: 14px;
          line-height: 16px;
          margin: 0;
          margin-left: 6px;
        }

        .todo-list-header-round-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
    }
  }

  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }
`;

// React.FC 타입에 Generics으로 interface 세팅
const TodoList: React.FC<IProps> = ({ todos }) => {
  /**
   * param todos 의 color에 따른 개수를 반환
   * getTodoColorCounts의 반환값
   * useCallback: 함수에 대해 종속성을 줄 수 있다. (useMemo: 변수에 대해 종속성을 줄 수 있다.)
   * useMemo: 변수에 대해 종속성 부여
   */
  const todoColorCounts = useMemo(() => {
    const colors: ObjectIndexType = {};

    todos.forEach(todo => {
      const value = colors[todo.color];
      if (!value) {
        colors[todo.color] = 1;
      } else {
        colors[todo.color] = value + 1;
      }
    });
    return colors;
  }, [todos]);

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은 TODO <span>{todos.length}개</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorCounts).map((color, index) => (
            <div className="todo-list-header-color-count" key={index}>
              {/* className은 문자열 나열로도 가능, separator 는 space */}
              <div className={`todo-list-header-round-color bg-${color}`}></div>
              <p>{todoColorCounts[color]}개</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TodoList;

```

### todolist 작성

pages/TodoList.tsx

```tsx
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';

interface IProps {
  todos: TodoType[];
}

type ObjectIndexType = {
  [key: string]: number | undefined;
};

const Container = styled.div`
  width: 100%;
	// ...

  /* 투두 리스트 스타일 */
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 52px;
    border-bottom: 1px solid ${palette.gray};

    .todo-left-side {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      .todo-color-block {
        width: 12px;
        height: 100%;
      }

      .checked-todo-text {
        color: ${palette.gray};
        text-decoration: line-through;
      }

      .todo-text {
        margin-left: 12px;
        font-size: 16px;
      }
    }
  }

  .todo-right-side {
    display: flex;
    margin-right: 12px;

    .todo-button {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid ${palette.gray};
      background-color: transparent;
      outline: none;
    }
  }
`;

// React.FC 타입에 Generics으로 interface 세팅
const TodoList: React.FC<IProps> = ({ todos }) => {
	// ...
  return (
    <Container>
			{/* ... */}
      {/* 투두리스트 */}
      <ul className="todo-list">
        {todos &&
          todos.map(todo => (
            <li className="todo-item" key={todo.id}>
              <div className="todo-left-side">
                <div className={`todo-color-block bg-${todo.color}`}></div>
                <p
                  className={`todo-text ${
                    todo.checked ? 'checked-todo-text' : ''
                  }`}
                >
                  {todo.text}
                </p>
              </div>
              <div className="todo-right-side">
                {!todo.checked && (
                  <button
                    type="button"
                    className="todo-button"
                    onClick={() => {}}
                  ></button>
                )}
              </div>
            </li>
          ))}
      </ul>
    </Container>
  );
};

export default TodoList;

```

---

## 5.3 아이콘 다운로드 받기

```tex
iconmonstr
```

- svg 로 다운 받고 다음에 위치

```tex
public
└── statics
    └── svg
        ├── check_mark.svg
        └── trash_can.svg
```

---

## 5.4 svg 컴포넌트 사용하기

svg를 리액트 안 컴포넌트로 사용하기 위한 바벨 플러그인

```sh
npm i babel-plugin-inline-react-svg -D
```

.babelrc

```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }], "inline-react-svg"]
}

```

pages/TodoList.tsx

```tsx
import TrashCanIcon from '../public/statics/svg/trash_can.svg';
import CheckMarkIcon from '../public/statics/svg/check_mark.svg';
```

types/image.d.ts

- `*.svg` 파일 이미지 선언

```typescript
declare module '*.svg';
```

- [ ] size 조절 안돼

---

# 06. Next API

next.js 는 express 기반으로 만들어져 있기 때문에, api를 만들어 사용할 수 있다.

## 6.1 Next API 사용

- `pages` dir 안에 api dir 생성

- `pages` dir를 사용해 페이지의 라우팅 경로가 설정된 것과 같이, `api` dir 안에 파일을 만들게 되면, 파일의 경로가 api 경로가 됨

  - e.g. 파일경로:  `pages/api/todos.ts` -> api 경로:  `api/todos`

- pages/api/todos.ts

  ```typescript
  import { NextApiRequest, NextApiResponse } from 'next';
  
  export default (req: NextApiRequest, res: NextApiResponse) => {
    return res.send('hello Next');
  };
  ```

  

## 6.2 Todolist 불러오기 API

data/todos.json

- Todolist json 으로 관리하기

```json
[
  {
    "id": 1,
    "text": "책을 읽자",
    "color": "red",
    "checked": false
  },
  {
    "id": 2,
    "text": "피자를 먹자",
    "color": "yellow",
    "checked": false
  },
  {
    "id": 3,
    "text": "산책을 하자",
    "color": "blue",
    "checked": true
  },
  {
    "id": 4,
    "text": "똑바로 누워서 자자",
    "color": "orange",
    "checked": true
  },
  {
    "id": 5,
    "text": "골반 교정을 하자",
    "color": "navy",
    "checked": false
  },
  {
    "id": 6,
    "text": "쓰레기는 쓰레기통에 버리자",
    "color": "green",
    "checked": false
  }
]
```

pages/api/todos.ts

```typescript
import fs from 'fs';
import { readFile } from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import { TodoType } from '../../types/todo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // 요청 method가 GET인지 확인
    if (req.method === 'GET') {
      // readFile 은 비동기 함수이기 때문에 Promise 사용해 파일 불러오는 것 대기
      const todos: TodoType[] = await new Promise<TodoType[]>(
        (resolve, reject) => {
          // file system 사용해 데이터 불러오기
          fs.readFile('data/todos.json', (err, data) => {
            if (err) {
              return reject(err.message);
            }
            // 읽어들인 데이터 파일은 Buffer 타입이기 때문에 String으로 변환
            const todosData = data.toString();
            // 데이터가 없다면 빈 배열 반환
            if (!todosData) {
              return resolve([]);
            }
            const todos = JSON.parse(todosData);
            return resolve(todos);
          });
        },
      );
      res.statusCode = 200;
      return res.send(todos);
    }
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(e);
  }
};

```

### 6.2.1 axios 사용해 API 요청하기

```sh
npm i axios
```

pages/index.tsx

- getServerSideProps 함수 작성

  - axios.get() 의 리턴값 `res` 의 속성들
    - status
    - statusText
    - headers
    - config
    - request
    - data

  ```tsx
  // ...
  import axios from 'axios';
  //...
  
  export const getServerSideProps: GetServerSideProps = async () => {
    try {
      // axios.get() 리턴값은 Promise 객체
      const res = await axios.get(
        'http://localhost:3000/api/todos',
      );
      return { props: {} };
    } catch (e) {
      console.log(e);
      return { props: {} };
    }
  };
  
  export default Index;
  
  ```

- axios.get() 에 제네릭 부여 -> data 속성의 타입 지정

  ```tsx
  import axios from 'axios';
  
  // ...
  export const getServerSideProps: GetServerSideProps = async () => {
    try {
      // axios.get() 리턴값은 Promise 객체
      // axios.get() 는 제네릭을 통해 data 속성의 타입을 정해줄 수 있다.
      const { data } = await axios.get<TodoType[]>(
        'http://localhost:3000/api/todos',
      );
      return { props: {} };
    } catch (e) {
      console.log(e);
      return { props: {} };
    }
  };
  
  export default Index;
  
  ```

---

## 6.3 axios 설정

lib/api/index.ts

- axios 인스턴스 미리 생성

  ```typescript
  import Axios, { AxiosInstance } from 'axios';
  
  /**
   * axios 요청이 필요한 컴포넌트에서 import 해서 사용
   * @return  {AxiosInstance}  [return description]
   */
  const axios = Axios.create({
    baseURL: 'http://localhost:3000',
  });
  
  export default axios;
  
  ```

  

lib/api/todos.ts

```typescript
import axios from '.';
import { TodoType } from '../../types/todo';

/**
 * TodoList를 불러온다.
 *  axios.get() 는 제네릭을 통해 data 속성의 타입을 정해줄 수 있다.
 * @return  {TodoType[]}             [return description]
 */
export const getTodosAPI = () => axios.get<TodoType[]>('api/todos');

```



pages/index.tsx

```tsx
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import TodoList from '../components/TodoList';
import { TodoType } from '../types/todo';
import { getTodosAPI } from '../lib/api/todos';

// dummy datas
const todos: TodoType[] = [];

const Index: NextPage = () => {
  return <TodoList todos={todos} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // 미리 만들어 놓은 axios Instance 사용
    const { data } = await getTodosAPI();
    return { props: {} };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};

export default Index;

```

---

## 6.4 환경변수(env) 설정하기

.env.local

```tex
API_URL=http://localhost:3000
```

- `process.env` 로 접근 가능
  - getServerSideProps 에서 호출하면, server
  - 컴포넌트 안에서 호출한다면, client (browser에서 확인 가능)
    - 하지만, browser에서는 보이지 않는다.(client에 기본적으로 숨기게 되어있음)
    - 접두어 `NEXT_PUBLIC_` 을 사용 하면 접근 가능

lib/api/index.ts 수정

```typescript
import Axios, { AxiosInstance } from 'axios';

/**
 * axios 요청이 필요한 컴포넌트에서 import 해서 사용
 * @return  {AxiosInstance}  [return description]
 */
const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default axios;
```



### pages/index.tsx 수정

- NextPage에 제네릭 부여

  ```tsx
  import { GetServerSideProps, NextPage } from 'next';
  // ...
  interface IProps {
    todos: TodoType[];
  }
  
  const Index: NextPage<IProps> = ({ todos }) => {
    return <TodoList todos={todos} />;
  };
  
  export const getServerSideProps: GetServerSideProps = async () => {
    try {
      // 미리 만들어 놓은 axios Instance 사용
      const { data } = await getTodosAPI();
      console.log(process.env, 'SERVER');
  
      return { props: { todos: data } };
    } catch (e) {
      console.log(e);
      return { props: {} };
    }
  };
  
  export default Index;
  
  ```

  
