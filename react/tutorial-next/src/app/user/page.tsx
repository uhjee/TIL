'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

/**
 * page는 특정 route에 매핑되는 고유한 UI
 */

interface IProps {}

const User: React.FC<IProps> = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      <div>유저 기본 - {pathname}</div>
      <Link href="/car">차로 가기</Link>
      <div>
        <button onClick={() => router.push('/user/registration')}>
          유저 등록
        </button>
        <button onClick={() => router.push('/user/list')}>유저 목록</button>
      </div>
    </div>
  );
};

export default User;
