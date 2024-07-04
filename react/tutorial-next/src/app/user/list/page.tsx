import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

interface IProps {}

const Car: React.FC<IProps> = () => {
  const users = [{ name: '이름1' }, { name: '이름2' }, { name: '이름3' }];

  return (
    <>
      <div>유저 목록</div>
      <ul>
        {users &&
          users.map((i) => (
            <li key={i.name}>
              <Image
                src="/img/test.jpg"
                alt="이미지야"
                width={50}
                height={50}
              />
              <span>{i.name}</span>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Car;
