import React from 'react';
import { ReduxState } from '../../common/store';
import { actions } from '../state/action';
import useTypedSelector from '../../common/useTypedSelector';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
  birthday: string;
}

export default function Person({ birthday }: Props) {
  // 첫 번째 generic: 리덕스 상탯값, 두 번째 generic 매개변수로 입력된 함수의 반환값
  // const name = useSelector<ReduxState, string>(state => state.person.name);
  // const age = useSelector<ReduxState, number>(state => state.person.age);

  // type 미리 입력된 hook 사용
  const name = useTypedSelector(state => state.person.name);
  const age = useTypedSelector(state => state.person.age);

  const dispatch = useDispatch();

  function onClick() {
    dispatch(actions.setName('mike'));
    dispatch(actions.setAge(23));
  }

  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
      <p>{birthday}</p>
      <button onClick={onClick}>정보 추가하기</button>
    </div>
  );
}
