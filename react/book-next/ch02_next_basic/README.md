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

  console.log 결과

  ```json
  {
    user: {
      login: 'uhjee',
      id: 51398029,
      node_id: 'MDQ6VXNlcjUxMzk4MDI5',
      avatar_url: 'https://avatars.githubusercontent.com/u/51398029?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/uhjee',
      html_url: 'https://github.com/uhjee',
      followers_url: 'https://api.github.com/users/uhjee/followers',
      following_url: 'https://api.github.com/users/uhjee/following{/other_user}',
      gists_url: 'https://api.github.com/users/uhjee/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/uhjee/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/uhjee/subscriptions',
      organizations_url: 'https://api.github.com/users/uhjee/orgs',
      repos_url: 'https://api.github.com/users/uhjee/repos',
      events_url: 'https://api.github.com/users/uhjee/events{/privacy}',
      received_events_url: 'https://api.github.com/users/uhjee/received_events',
      type: 'User',
      site_admin: false,
      name: 'uhjee',
      company: 'watchtek',
      blog: '',
      location: 'Seoul, Korea',
      email: null,
      hireable: null,
      bio: '씹다 보면 단맛이 나는 인생. 쓰다고 뱉지 않겠습니다.',
      twitter_username: null,
      public_repos: 16,
      public_gists: 0,
      followers: 5,
      following: 9,
      created_at: '2019-06-05T07:06:13Z',
      updated_at: '2022-01-20T09:32:03Z'
    }
  }
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

### 2.3.2 getStaticProps

- `getServerSideProps` 와 다르게 빌드 시에 데이터를 불러와 결과를 json으로 저장하여 사용
- 따라서 일관된 정적인 데이터

```jsx
const staticPage = ({ time }) => {
  return (
    <div>
      <h2>getStaticProps</h2>
      {time}
    </div>
  );
};

// 빌드 시에 호출 후 정적으로 데이터 제공
export const getStaticProps = async () => {
  return { props: { time: new Date().toISOString() }, revalidate: 3 };
};

export default staticPage;
```

- `revalidate`: 데이터 재요청 interval

yarn build 후, .next/server/pages/static.html

```html
// ...
<script id="__NEXT_DATA__" type="application/json">
      {
        "props": {
          "pageProps": { "time": "2022-03-12T00:22:19.486Z" },
          "__N_SSG": true
        },
        "page": "/static",
        "query": {},
        "buildId": "fUUKIHoCFEAo2rvX1aQIS",
        "isFallback": false,
        "gsp": true,
        "scriptLoader": []
      }
    </script>
// ...
```

- 내부에 pageProps 데이터가 빌드 시각으로 세팅되어 있음

#### 동적 페이지 내부에서 getStaticProps 사용

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

// build 시 static data 세팅
export const getStaticProps = async ({ params }) => {
  try {
    const res = await fetch(`https://api.github.com/users/${params.name}`);

    const user = await res.json();
    if (res.status === 200) {
      return { props: { user, time: new Date().toISOString() } };
    }
    return { props: { time: new Date().toISOString() } };
  } catch (e) {
    console.log(e);
    return { props: { time: new Date().toISOString() } };
  }
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { name: 'uhjee' } }],
    fallback: true,
  };
}

export default Username;
```

- getServerSideProps 와 다르게 `query` 대신 `params` 사용
- getStaticPaths 사용
  - 페이지의 path가 외부 데이터에 의존할 때 사용
  - params를 미리 지정
  - fallback :  false   => 이외의 경로는 404 에러 페이지

### 2.3.3 getInitialProps

- 9.3 버전 이전 부터 SSR 데이터 패치를 위해 사용하던 함수
- 9.3 버전 이상은 `getServerSideProps`와 `getStaticProps` 사용 권장

#### getServerSideProps 와 차이점

- 최초 렌더링 시에는 서버에서 데이터 호출
- 이후 클라이언트 라우팅을 통해 접근 시에는 클라이언트에서 데이터호출

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

// component 함수에 메소드를 추가하는 방식으로 사용
Username.getInitialProps = async ({ query }) => {
  const { username } = query;
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (res.status === 200) {
      const user = await res.json();
      return { user }; // getServerSideProps의 props 속성 없이 return
    }
    return { props: {} };
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default Username;
```

## 2.4 styled-jsx 

- 넥스트에서 기본으로 제공하는 CSS-in-JS 라이브러리
- css 캡슐화 및 범위 지정
- nesting은 지원하지 않음

```jsx
import fetch from 'isomorphic-unfetch';
import css from 'styled-jsx/css';

// Styled-jsx 작성
const style = css`
  h2 {
    margin-left: 20px;
    background-color: orange;
    color: #fff;
  }
  .user-bio {
    margin-top: 12px;
    font-style: italic;
  }
`;

const Username = ({ user }) => {
  const username = user && user.name;
  const htmlURL = user && user.html_url;
  const bio = user && user.bio;

  return (
    <>
      {user && (
        <div>
          <h2>
            <a href={htmlURL}>{username}</a>
          </h2>
          <p>{bio}</p>
        </div>
      )}
      {!user && <div>해당 유저는 없습니다.</div>}
      {/* styled-jsx 적용 */}
      <style jsx>{style}</style>
    </>
  );
};
```



#### git hub 데이터 스타일링

