import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { decrement, increment } from '../store/reduxStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface IProp {}

interface User {
  name: string;
  age: number;
  loginTime: number;
}

const ReactQueryView: FC<IProp> = () => {
  const queryClient = useQueryClient();
  const { data, isPending, error, isFetching } = useQuery<User>({
    queryKey: ['users'],
    queryFn: () =>
      axios.get('http://192.168.143.51:3003/user').then((res) => res.data),
  });

  const { mutate } = useMutation({
    mutationFn: (payload: number) =>
      axios.post('http://192.168.143.51:3003/add-age', {
        age: payload,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const onClickAddAge = () => {
    mutate(10);
  };

  if (isPending) return <div>'Loading...'</div>;

  if (error) return <div>{'An error has occurred' + error.message}</div>;

  return (
    <div>
      <h2>ReactQuery</h2>
      <div>name: {data.name} </div>
      <div>age: {data.age} </div>
      <div>logged time: {data.loginTime}</div>
      <button onClick={onClickAddAge}>Add Age</button>
    </div>
  );
};

export default ReactQueryView;
