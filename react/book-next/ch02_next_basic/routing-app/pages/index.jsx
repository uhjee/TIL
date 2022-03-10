import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

import Back from './Back';

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
      <h2>Link to 'tomato' Page</h2>
      <Link href="/tomato">
        <a>Move to '/tomato'</a>
      </Link>
      <Link href="/tomato" passHref>
        <MyButton text="Move to '/tomato' - react component" />
      </Link>
      {/* 동적 라우팅 */}
      <Link href="/vagetable/potato">
        <a>Move to '/vagetable/potato'</a>
      </Link>
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
      <Back />
    </div>
  );
};

export default App;
