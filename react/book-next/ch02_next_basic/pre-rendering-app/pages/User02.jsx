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
      {/* query param으로 전달 */}
      <Link href={`/users/${username}`}>
        <a>검색하기</a>
      </Link>
    </div>
  );
};

export default User02;
