# 1장. 리액트 프로젝트 시작하기

# 1.5 단일 페이지 어플리케이션 만들기

## 1.5.2. react-router-dom 사용하기

내부적으로 브라우저 히스토리 API를 사용하는 react-router-dom을 사용

```jsx
npm install react-router-dom
```

```jsx
import { BrowserRouter, Route, Link } from 'react-router-dom';
```

- BrowserRouter 컴포넌트

    react-router-dom을 사용하기 위해서 전체를 이 컴포넌트로 감싸줘야 한다.

- Route 컴포넌트

    각 페이지를 정의

    url과 컴포넌트를 매핑시키는 개념

    - exact  어트리뷰트

        `exact` 어트리뷰트로 정확하게 매핑할 것인지 여부

        ```jsx
        // exact 없는 경우
        <Route path="/photo" component={Photo} /> 
        //  => domain:port/photo/abc 도 해당 컴포넌트로 이동됨
        ```

        ```jsx
        // exact 있는 경우
        <Route exact path="/photo" component={Photo} /> 
        //  => domain:port/photo/abc 은 정확하게 일치하지 않기 때문에 컴포넌트 이동 x
        ```

    - Route 컴포넌트로 렌더링되는 컨포넌트는 `match` 프로퍼티 사용 가능
        - `match.url` :  컴포넌트 외부에서 `path` 어트리뷰트로 전달되는 url값
        - `match.param.{파라미터 이름}` : 컴포넌트 외부에서 url에 `:` 을 사용해 전달하는 파라미터

- Link 컴포넌트

    페이지 전환을 위해 사용하는 컴포넌트

    `to` 어트리뷰트로 이동할 주소 명시