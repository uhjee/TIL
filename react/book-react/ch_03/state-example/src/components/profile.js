import React, { useState, useEffect } from 'react';

// custom hook
function useUser(userId) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserApi(userId).then((res) => setUser(res.data));
  }, [userId]); // 의존성 배열(배열의 요소가 변경되는 경우에만 부수효과 함수 호출)

  return user;
}

export default function Profile({ userId }) {
  // custom hook 사용
  const user = useUser(userId);

  return (
    <div>
      {!user && <p> 사용자 정보를 가져오는 중...</p>}
      {user && (
        <>
          <p>{`name is ${user.name}`}</p>
          <p>{`age is ${user.age}`}</p>
        </>
      )}
    </div>
  );
}

function getUserApi(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 'jee') {
        resolve({ success: true, data: { name: 'jeehaeng', age: 30 } });
      }
      return;
    }, 3000);
  });
}
