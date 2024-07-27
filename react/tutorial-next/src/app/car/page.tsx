import Link from 'next/link';
import React from 'react';

/**
 * page는 특정 route에 매핑되는 고유한 UI
 */

interface IProps {}

const Car: React.FC<IProps> = () => {
  return (
    <div>
      <div>차 기본</div>
      <Link href="/user">유저로 가기</Link>
    </div>
  );
};

export default Car;
