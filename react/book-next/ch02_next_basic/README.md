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

pages/users/[username].jsx

```jsx
import fetch from 'isomorphic-unfetch';
import css from 'styled-jsx/css';

// Styled-jsx 작성
const style = css`
  .profile-box {
    width: 25%;
    max-width: 272px;
    margin-right: 26px;
  }

  .profile-image-wrapper {
    width: 100%;
    border: 1px solid #e1e4e8;
  }
  .profile-image-wrapper .profile-image {
    display: block;
    width: 100%;
  }
  .profile-username {
    margin: 0;
    padding-top: 16px;
    font-size: 26px;
  }
  .profile-user-login {
    margin: 0;
    font-size: 20px;
  }
  .profile-user-bio {
    margin: 0;
    padding-top: 16px;
    font-size: 14px;
  }
`;

const Username = ({ user }) => {
  if (!user) {
    return null;
  }
  const { name: username, html_url: htmlURL, bio } = user;

  return (
    <>
      <div className="profile-box">
        <div className="profile-image-wrapper">
          <img
            src={user.avatar_url}
            alt={`${user.name} profile image`}
            className="profile-image"
          />
        </div>
        <h2 className="profile-username">{username}</h2>
        <p className="profile-user-login">{user.login}</p>
        <p className="profile-user-bio">{bio}</p>
      </div>
      <style jsx>{style}</style>
    </>
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

### 2.4.2 아이콘 사용하기

```sh
npm install react-icons
```

```jsx
// ...
import { GoLink, GoLocation, GoMail } from 'react-icons/go';

// Styled-jsx 작성
const style = css`
	// ...
  .profile-user-info {
    display: flex;
    align-items: center;
    margin: 4px 0 0;
  }
  .profile-user-info-text {
    margin-left: 6px;
  }
`;

const Username = ({ user }) => {
	// ...
        <p className="profile-user-info">
          <GoLocation size={16} color="#6a737d" />
          {user.location ? (
            <span className="profile-user-info-text">{user.location}</span>
          ) : (
            <span>no-location</span>
          )}
        </p>
        <p className="profile-user-info">
          <GoMail size={16} color="#6a737d" />
          {user.email ? (
            <span className="profile-user-info-text">{user.email}</span>
          ) : (
            <span>no-email</span>
          )}
        </p>
        <p className="profile-user-info">
          <GoLink size={16} color="#6a737d" />
          {user.blog ? (
            <span className="profile-user-info-text">{user.blog}</span>
          ) : (
            <span>no-blog</span>
          )}
        </p>
      </div>
      <style jsx>{style}</style>
    </>
  );
};
// ...

export default Username;

```

### 2.4.3 github repository list styling

pages/user/[username].jsx

```jsx
import fetch from 'isomorphic-unfetch';
import Profile from '../../components/Profile';
import css from 'styled-jsx/css';

const style = css`
  .user-contents-wrapper {
    display: flex;
    padding: 20px;
  }

  .repos-wrapper {
    width: 100%;
    height: 100vh;
    overflow: scroll;
    padding: 0px 16px;
  }

  .repos-header {
    padding: 16px 0;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #e1e4e8;
  }

  .repos-count {
    display: inline-block;
    padding: 2px 5px;
    margin-left: 6px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    color: #586069;
    background-color: rgba(27, 31, 35, 0.08);
    border-radius: 20px;
  }

  .repository-wrapper {
    width: 100%;
    border-bottom: 1px solid #e1e4e8;
    padding: 24px 0;
  }
  .repository-description {
    padding: 12px 0;
  }
  a {
    text-decoration: none;
  }
  .repository-name {
    margin: 0;
    color: #ec8543;
    font-size: 20px;
    display: inline-block;
    cursor: pointer;
  }
  .repository-name:hover {
    text-decoration: underline;
  }
  .repository-description {
    margin: 0;
    font-size: 14px;
    color: #888;
  }
  .repository-language {
    margin: 0;
    font-size: 14px;
  }
  .repository-updated-at {
    margin-left: 20px;
  }
`;

const Username = ({ user, repos }) => {
  return (
    <div className="user-contents-wrapper">
      {/* PROFILE */}
      <Profile user={user} />
      	{/* REPOSITORY */}
      <div className="repos-wrapper">
        <div className="repos-header">
          Repositories
          <span className="repos-count">{user.public_repos}</span>
        </div>
        {user &&
          repos &&
          repos.map(repo => (
            <div key={repo.id} className="repository-wrapper">
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://github.com/${user.login}/${repo.name}`}
              >
                <h2 className="repository-name">{repo.name}</h2>
              </a>
              <p className="repository-description">{repo.description}</p>
              <p className="repository-language">
                {repo.language}
                <span className="repository-updated-at">{repo.updated_at}</span>
              </p>
            </div>
          ))}
      </div>
      <style jsx>{style}</style>
    </div>
  );
};

// query 객체에서 query param 추출
export const getServerSideProps = async ({ query }) => {
  const { username } = query;
  try {
    let user;
    let repos;

    // user info
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (userRes.status === 200) {
      user = await userRes.json();
      console.log({ user });
    }

    // user repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&page=1&per_page=10`,
    );
    if (reposRes.status === 200) {
      repos = await reposRes.json();
      console.log({ repos });
    }
    return { props: { user, repos } };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};

export default Username;
```

### 2.4.4 날짜 출력 (date-fns)

- moment 보다 가벼워서 자주 사용

```sh
npm install date-fns
```

pages/user/[username].jsx

```jsx
import formatDistance from 'date-fns/formatDistance';

// ...
<span className="repository-updated-at">
    {formatDistance(new Date(repo.updated_at), new Date(), {
      addSuffix: true,
    })}
  </span>
// ...
```

### 2.4.5 pagination

- 서버 데이터 받아오기 getServerSideProps() - `[username].jsx`

```jsx
// query 객체에서 query param 추출
export const getServerSideProps = async ({ query }) => {
  const { username, page } = query;  // page param 추가 
  try {
    let user;
    let repos;

    // user info
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (userRes.status === 200) {
      user = await userRes.json();
      console.log({ user });
    }

    // user repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&page=${page}&per_page=10`,
    ); // page parameter 추가
    if (reposRes.status === 200) {
      repos = await reposRes.json();
      console.log({ repos });
    }
    return { props: { user, repos } };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};
```

- 페이지- `Repository.jsx`

  ```jsx
  const Repositories = ({ user, repos }) => {
    const router = useRouter();
    const { page } = router.query;
    return (
      <>
        {/* REPOSITORY */}
        // ...
          <div className="repository-pagination">
            <Link href={`/users/${user.login}?page=${Number(page) - 1}`}>
              <a>
                <button type="button" disabled={page && page === '1'}>
                  Previous
                </button>
              </a>
            </Link>
            <Link
              href={`/users/${user.login}?page=${!page ? '2' : Number(page) + 1}`}
            >
              <a>
                <button type="button" disabled={repos.length < 10}>
                  Next
                </button>
              </a>
            </Link>
          </div>
        </div>
        <style jsx>{style}</style>
      </>
    );
  };
  ```

  ---

## 2.5 공통 페이지 만들기

dir tree

```tex
pages
├── _app.jsx *
├── api
│   └── hello.js
├── index.jsx
└── users
    └── [username].jsx
```



### 2.5.1 _app.jsx 파일

- `pages` dir 하위에 위치
- App 컴포넌트는 모든 페이지의 공통 페이지 역할
  1. 페이지들의 공통된 레이아웃
  2. 페이지를 탐색할 때 상태 유지
  3. 추가 데이터를 페이지에 주입
  4. 글로벌 CSS 추가

### global CSS 적용

- _app.jsx

```jsx
const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            margin: 0;
          }
        `}
      </style>
    </>
  );
};

export default MyApp;

```

### 2.5.2 공통 헤더 만들기

