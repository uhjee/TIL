# 2장. 넥스트의 기본 기능

## 2.1 넥스트에서 라우팅하기

- `pages` 디렉토리 사용하여 path 설정 가능
- path: `pages` 디렉토리에 파일을 만들면 파일의 경로에 따라 설정

### 2.1.1 정적 페이지 라우팅 하기

- Link 컴포넌트 사용
  - href 속성으로 라우트 패스 작성

pages/index.jsx

```jsx
import Link from 'next/link';

const App = () => {
  return (
    <div>
      <h2>Link to 'tomato' Page</h2>
      <Link href="/tomato">
        <a>Move to '/tomato'</a>
      </Link>
    </div>
  );
};

export default App;

```

pages/tomato.jsx

```jsx
import Link from 'next/link';

const Tomato = () => {
  return (
    <div>
      <h2>Link to 'main' Page</h2>
      <Link href="/">
        <a>Move to '/'</a>
      </Link>
    </div>
  );
};

export default Tomato;

```

### 2.1.2 Link 컴포넌트

- DOM 요소를 가지진 않지만 자식인 `<a>` 태그를 클릭하게 되면 네비게이션 실행
- `<a>` HTMLElement 를 사용하지 않아도 라우팅 기능은 수행 (SEO 측면에서 좋지 않음)

#### Link 컴포넌트의 properties

- href 
- as?: string / 브라우저의 URL에 표시될 값
- replace?: boolean / 브라우저의 history 스택에 URL 을 추가하지 않고 현재 상태 변경
- scroll?: boolean / 스크롤을 맨 위로 이동할 지 설정하는 값 / default: true
- shallow?: boolean / 서버에서 데이터를 불러오는 작업을 스킵 / default: false
- passHref?: boolean 값으로 자식에게 href를 전달
- prefetch?: booean / 백그라운드에서 페이지 미리 가져옴 / default: true

### 2.1.3 동적 페이지 라우팅

pages/[name].jsx

```jsx
import Link from 'next/link';
import { useRouter } from 'next/router';

const Name = () => {
  const router = useRouter();
  console.log(router.query); // {name: 'potato'}

  return (
    <div>
      <h2>Hello!!</h2>
      <Link href="/">Move to '/'</Link>
    </div>
  );
};

export default name;

```

- 대괄호의 값은 router 객체의 query 속성
- router 객체를 잡기 위해 useRouter 훅 사용

### 2.1.4 라우터 객체를 이용해 라우팅하기

- router.push()

pages/index.jsx

```jsx
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const MyButton = ({ text, href }) => (
  <a href>
    {' '}
    <p>{text}</p>
  </a>
);

const App = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  return (
    <div>
      {/* 라우터 객체 이용 */}
      <h2>라우터 객체 이용</h2>
      <button type="button" onClick={() => router.push('/tomato')}>
        tomato한테 가자
      </button>
      <div>
        <p>이름</p>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: '12px' }}
        />
        <button type="button" onClick={() => router.push(`/vagetable/${name}`)}>
          {name}으로 가자!
        </button>
      </div>
    </div>
  );
};

export default App;

```

pages/vagetable/[name].jsx

```jsx
import Link from 'next/link';
import { useRouter } from 'next/router';

import Back from '../Back';

const Name = () => {
  const router = useRouter();
  return (
    <div>
      <h2>Hello!! {router.query.name}</h2>
      <Link href="/">Move to '/'</Link>
      <Back />
    </div>
  );
};

export default Name;
```

## 2.2 정적 파일 사용하기

- public
  - 디렉토리 안에 정적 파일 
  - 내부에서 사용할 때는 path에 `public`  생략

```jsx
const App = () => {
  <div>
  	<img src="/cheese.png" alt="치즈" />
  </div>
}
```

## 2.3 서버로부터 데이터 불러오기

- 기본적으로 Next.js는 모든 페이지를 미리 렌더링

- 두 가지의 사전 렌더링 존재

  1. 정적 생성

     - 빌드 시에 페이지를 HTML로 만들어 요청 시 바로 제공
     - 외부 데이터를 필요로 하지 않는 경우(API를 요청하지 않는 페이지)

     

  2. 서버 사이드 렌더링

     - 페이지 요청 시 서버 사이드 렌더링을 통해 HTML 제공
     - 외부 데이터를 필요로 하는 경우(API 요청 시)

  ### 2.3.1 getServerSideProps

  - 페이지 데이터를 서버로부터 제공받는 기본 API
  - 서버에서 데이터를 패치하여 초기 데이터를 전달하도록 구성

  #### 서버 데이터를 패치하기 위한 isomorphic-unfetch 모듈 설치

  ```sh
  yarn add isomorphic-unfetch
  ```

  #### git hub api 중 유저 정보를 받아오는 api

  ```tex
  https://api.github.com/users/username
  ```

  pages/index.jsx

  ```jsx
  import fetch from 'isomorphic-unfetch';
  
  const index = ({ user }) => {
    const username = user && user.name;
    const htmlURL = user && user.html_url;
    const bio = user && user.bio;
  
    return (
      <div>
        <a href={htmlURL}>{username}</a>
        <p>{bio}</p>
      </div>
    );
  };
  
  // next의 페이지 데이터를 서버로부터 제공받는 api
  export const getServerSideProps = async () => {
    try {
      const res = await fetch('https://api.github.com/users/uhjee');
      if (res.status === 200) {
        const user = await res.json();
        console.log({ user });
        return { props: { user } };
      }
      return { props: {} };
    } catch (error) {
      console.log(error);
      return { props: {} };
    }
  };
  
  export default index;
  
  ```

  

#### param을 받아 동적으로 데이터 요청

pages/User02.jsx

```jsx
import React, { useState } from 'react';
import Link from 'next/link';

const User02 = () => {
  const [username, setUsername] = useState('');
  return (
    <div>
      <label htmlFor="">
        username
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <p>{username} 깃허브 검색하기 </p>
      <Link href={`/users/${username}`}>
        <a>검색하기</a>
      </Link>
    </div>
  );
};

export default User02;

```

pages/users/[username].jsx

```jsx
import fetch from 'isomorphic-unfetch';

const Username = ({ user }) => {
  const username = user && user.name;
  const htmlURL = user && user.html_url;
  const bio = user && user.bio;

  return (
    <div>
      {user && (
        <div>
          <a href={htmlURL}>{username}</a>
          <p>{bio}</p>
        </div>
      )}
      {!user && <div>해당 유저는 없습니다.</div>}
    </div>
  );
};

// query 객체에서 query param 추출
export const getServerSideProps = async ({ query }) => {
  const { username } = query;
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (res.status === 200) {
      const user = await res.json();
      console.log({ user });
      return { props: { user } };
    }
    return { props: {} };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};

export default Username;
```

