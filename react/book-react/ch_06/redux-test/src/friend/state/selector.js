import { createSelector } from 'reselect';

// state의 데이터 getter
export const getFriends = state => state.friend.friends;
// export const getAgeLimit = state => state.friend.ageLimit;
// component props로 상탯값 받기
export const getAgeLimit = (_, ageLimit) => ageLimit;
export const getShowLimit = state => state.friend.showLimit;

// export const getFriendsWithAgeLimit = createSelector(
//   [getFriends, getAgeLimit],
//   (friends, ageLimit) => friends.filter(f => f.age <= ageLimit), // 배열의 함수 반환값을 파라미터로 받아 처리
// );

// export const getFriendsWithAgeShowLimit = createSelector(
//   [getFriendsWithAgeLimit, getShowLimit],
//   (getFriendsWithAgeLimit, showLimit) =>
//     getFriendsWithAgeLimit.slice(0, showLimit),
// );

// 선택자 함수를 생성하는 함수 정의
// - 각 컴포넌트 인스턴스들은 아래 함수를 호출하면 자신만의 선택자 함수를 가질 수 있다.
export const makeGetFriendsWithAgeLimit = () => {
  return createSelector([getFriends, getAgeLimit], (friends, ageLimit) =>
    friends.filter(f => f.age <= ageLimit),
  );
};
