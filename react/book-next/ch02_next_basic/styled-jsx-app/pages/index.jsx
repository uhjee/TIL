import React, { useState } from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css';

const style = css`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const Index = () => {
  const [username, setUsername] = useState('');
  return (
    <div className="container">
      <label htmlFor="">
        username
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <div>
        <p>{username} 깃허브 검색하기 </p>
        <div>
          {/* query param으로 전달 */}
          <Link href={`/users/${username}`}>
            <a>검색하기 (getServerSideProps)</a>
          </Link>
        </div>
      </div>
      <style jsx> {style}</style>
    </div>
  );
};

export default Index;
