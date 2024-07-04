/**
 * 하위 라우트를 children으로 받는 wrapping 컴포넌트
 * 하위 라우트가 바뀌어도 상태 유지(template.tsx와의 차이점)
 */

import { MouseEventHandler } from 'react';

const UserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  console.log('layout rendering...');

  const onClickButton: MouseEventHandler<HTMLButtonElement> = () => {
    console.log('클릭');
  };

  return (
    <main>
      <aside>
        User Layout
        {/* <button onClick={onClickButton}>버튼</button> */}
      </aside>
      <section>{children}</section>
    </main>
  );
};

export default UserLayout;
