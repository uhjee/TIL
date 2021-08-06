import React from 'react';
import { Route, Link } from 'react-router-dom';

// Route를 통해 렌더링되는 컴포넌트는 match 프로퍼티 사용 가능
// match.url 은 Route 컴포넌트의 path 속성
const Rooms = ({ match }) => {
  return (
    <div>
      <h2>여기는 방을 소개하는 페이지입니다.</h2>
      <Link to={`${match.url}/blueRoom`}> 파란 방입니다.</Link>
      <br />
      <Link to={`${match.url}/greenRoom`}> 초록 방입니다.</Link>
      <br />
      <Route path={`${match.url}/:roomId`} component={Room} />
      <Route
        exact
        path={match.url}
        render={() => <h3>방을 선택해 주세요.</h3>}
      ></Route>
    </div>
  );
};

export default Rooms;

function Room({ match }) {
  return <h2>{`${match.params.roomId} 방을 선택하였습니다.`}</h2>;
}
