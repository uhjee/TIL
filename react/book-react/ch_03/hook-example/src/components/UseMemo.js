import React from 'react';

const ParentComponent = () => {
  return (
    <div>
      <ChildComponent
        v1={[1, 2, 3, 4, 5]}
        v2={[1, 2, 3, 4, 5]}
      ></ChildComponent>
    </div>
  );
};

const ChildComponent = ({ v1, v2 }) => {
  // 캐싱할 함수를 첫 번째 인자로 받고, 의존성 배열을 두 번째 인자로 받음
  const value = React.useMemo(() => runExpensiveJob(v1, v2), [v1, v2]);
  return (
    <>
      <p>{`value is ${value}`}</p>
    </>
  );
};
// 대충 비용이 많이 드는 함수라고 생각하고 코드 이해
const runExpensiveJob = (arr1, arr2) =>
  arr1.reduce((sum, cur, index) => sum + cur + arr2[index], 0);

export default ParentComponent;
