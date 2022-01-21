import { createSelector } from 'reselect';

// state의 데이터 getter
export const getFriends = state => state.friend.friends;
export const getAgeLimit = state => state.friend.ageLimit;
export const getShowLimit = state => state.friend.showLimit;

export const getFriendsWithAgeLimit = createSelector(
  [getFriends, getAgeLimit],
  (friends, ageLimit) => friends.filter(f => f.age <= ageLimit), // 배열의 함수 반환값을 파라미터로 받아 처리
);

export const getFriendsWithAgeShowLimit = createSelector(
  [getFriendsWithAgeLimit, getShowLimit],
  (getFriendsWithAgeLimit, showLimit) =>
    getFriendsWithAgeLimit.slice(0, showLimit),
);
