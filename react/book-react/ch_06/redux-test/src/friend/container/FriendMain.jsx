import { getNextFriend } from '../../common/mockData';
import { addFriend, setAgeLimit, setShowLimit } from '../state';
import FriendList from '../component/FriendList';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  getAgeLimit,
  getShowLimit,
  getFriendsWithAgeLimit,
  getFriendsWithAgeShowLimit,
} from '../state/selector';

import NumberSelect from '../component/NumberSelect';
import { MAX_AGE_LIMIT, MAX_SHOW_LIMIT } from '../common';

// ! react-redux 패키지 사용 (useSelector, useDispatch)
const FriendMain = () => {
  // ? reselect 사용 01
  // const [ageLimit, showLimit, friendsWithAgeLimit, friendsWithAgeShowLimit] =
  //   useSelector(
  //     state => [
  //       getAgeLimit(state),
  //       getShowLimit(state),
  //       getFriendsWithAgeLimit(state),
  //       getFriendsWithAgeShowLimit(state),
  //     ],
  //     shallowEqual,
  //   );
  // ? reselect 사용 02
  const ageLimit = useSelector(getAgeLimit);
  const showLimit = useSelector(getShowLimit);
  const friendsWithAgeLimit = useSelector(getFriendsWithAgeLimit);
  const friendsWithAgeShowLimit = useSelector(getFriendsWithAgeShowLimit);

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
      <NumberSelect
        onChange={v => dispatch(setAgeLimit(v))}
        value={ageLimit}
        options={AGE_LIMIT_OPTIONS}
        postfix="세 이하만 보기"
      />
      <FriendList friends={friendsWithAgeLimit} />
      <NumberSelect
        onChange={v => dispatch(setShowLimit(v))}
        value={showLimit}
        options={SHOW_LIMIT_OPTIONS}
        postfix="명 이하만 보기 (연령 제한 적용됨)"
      />
      <FriendList friends={friendsWithAgeShowLimit} />
    </div>
  );
};

const AGE_LIMIT_OPTIONS = [15, 20, 25, MAX_AGE_LIMIT];
const SHOW_LIMIT_OPTIONS = [2, 4, 6, MAX_SHOW_LIMIT];

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
