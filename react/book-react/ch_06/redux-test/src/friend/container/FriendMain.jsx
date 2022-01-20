import { getNextFriend } from '../../common/mockData';
import { addFriend } from '../state';
import FriendList from '../component/FriendList';

import { useSelector, useDispatch } from 'react-redux';

// ! react-redux 패키지 사용 (useSelector, useDispatch)
const FriendMain = () => {
  const friends = useSelector(state => state.friend.friends); // 상탯값의 변경 여부 판단 -> 다르면 재렌더링
  const dispatch = useDispatch();

  function onAdd() {
    const friend = getNextFriend(); // api 대체
    dispatch(addFriend(friend));
  }

  console.log('FriendMain render');
  return (
    <div>
      <button onClick={onAdd}>친구 추가</button>
      <FriendList friends={friends} />
    </div>
  );
};

// ! react-redux 패키지 사용 X
// const FriendMain = () => {
//   const [, forceUpdate] = useReducer(v => v + 1, 0);

//   useEffect(() => {
//     // 이전 상탯값 저장
//     let prevFriends = store.getState().friend.friends;
//     const unsubscribe = store.subscribe(() => {
//       const friends = store.getState().friend.friends;
//       if (prevFriends !== friends) forceUpdate();

//       prevFriends = friends;
//     });
//     return () => unsubscribe();
//   }, []);

//   function onAdd() {
//     const friend = getNextFriend();
//     store.dispatch(addFriend(friend));
//   }

//   console.log('FriendMain render');
//   const friends = store.getState().friend.friends;
//   return (
//     <div>
//       <button onClick={onAdd}>친구 추가</button>
//       <FriendList friends={friends} />
//     </div>
//   );
// };

export default FriendMain;
