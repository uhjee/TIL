import React from 'react';
// 자식 컴포넌트
function Title(props) {
  return <p>{props.title}</p>;
}

// title 속성값이 변경될 때만 렌더링되기 원하는 경우, 
// React.memo() 로 감싼다
export default React.memo(Title);
