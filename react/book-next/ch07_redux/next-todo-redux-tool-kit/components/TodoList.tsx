import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';
import TrashCanIcon from '../public/statics/svg/trash_can.svg';
import CheckMarkIcon from '../public/statics/svg/check_mark.svg';
import { checkTodoAPI, deleteTodoAPI } from '../lib/api/todos';
import { useRouter } from 'next/router';
import { RootState, useSelector } from '../store';
import { useDispatch } from 'react-redux';
import { todoActions } from '../store/todo';

interface IProps {
  todos: TodoType[];
}

type ObjectIndexType = {
  [key: string]: number | undefined;
};

const Container = styled.div`
  width: 100%;

  .todo-count {
    margin-left: 12px;
  }

  /* 헤더 스타일 */
  .todo-list-header {
    padding: 12px;
    position: relative;
    border-bottom: 1px solid ${palette.gray};

    .todo-list-last-todo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      margin: 0 0 8px;
      span {
        margin-left: 12px;
      }
      .todo-list-add-button {
        padding: 4px 8px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: #fff;
        outline: none;
        font-size: 14px;
      }
    }

    .todo-list-header-colors {
      display: flex;

      .todo-list-header-color-count {
        display: flex;
        margin-right: 8px;

        p {
          font-size: 14px;
          line-height: 16px;
          margin: 0;
          margin-left: 6px;
        }

        .todo-list-header-round-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
    }
  }

  /* 투두 리스트 스타일 */
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 52px;
    border-bottom: 1px solid ${palette.gray};

    .todo-left-side {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      .todo-color-block {
        width: 12px;
        height: 100%;
      }

      .checked-todo-text {
        color: ${palette.gray};
        text-decoration: line-through;
      }

      .todo-text {
        margin-left: 12px;
        font-size: 16px;
      }
    }
  }

  .todo-right-side {
    display: flex;
    margin-right: 12px;

    svg {
      &:first-child {
        margin-right: 16px;
      }
    }

    .todo-trash-can {
      path {
        fill: ${palette.deep_red};
      }
    }
    .todo-check-mark {
      fill: ${palette.deep_green};
    }

    .todo-button {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid ${palette.gray};
      background-color: transparent;
      outline: none;
    }
  }

  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }
`;

// React.FC 타입에 Generics으로 interface 세팅
const TodoList: React.FC<IProps> = () => {
  const router = useRouter();

  // redux 데이터 가져오기 (state의 타입은 RootState)
  const todos = useSelector(state => state.todo.todos);

  // redux action 호출 함수
  const dispatch = useDispatch();

  /**
   * param todos 의 color에 따른 개수를 반환
   * getTodoColorCounts의 반환값
   * useCallback: 함수에 대해 종속성을 줄 수 있다. (useMemo: 변수에 대해 종속성을 줄 수 있다.)
   * useMemo: 변수에 대해 종속성 부여
   */
  const todoColorCounts = useMemo(() => {
    const colors: ObjectIndexType = {};

    todos.forEach(todo => {
      const value = colors[todo.color];
      if (!value) {
        colors[todo.color] = 1;
      } else {
        colors[todo.color] = value + 1;
      }
    });
    return colors;
  }, [todos]);

  /**
   * id에 해당하는 todo 데이터의 checked 속성 업데이트
   * @param id
   */
  const checkTodo = async (id: number) => {
    try {
      await checkTodoAPI(id);
      console.log('check complete');
      // 업데이트된 리스트 다시 불러오기 방법 01 - API 요청 (전체 reload)
      // router.reload();

      // 업데이트된 리스트 다시 불러오기 방법 02. client 네비게이션을 이용해 setServerSideProps 를 실행 시켜 데이터 다시 받아오기 - API 요청
      // router.push('/');

      // 방법 03. 업데이트 리스트 다시 불러오지 않고 리렌더링
      const newTodos = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
      // redux action 호출
      dispatch(todoActions.setTodo(newTodos));
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * id 에 해당하는 todo 데이터 삭제
   * @param id
   */
  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      const newTodos = todos.filter(todo => todo.id !== id);
      // redux action 호출
      dispatch(todoActions.setTodo(newTodos));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      {/* 헤더 */}
      <div className="todo-list-header">
        <div className="todo-list-last-todo">
          <div>
            남은 TODO <span>{todos.length}개</span>
          </div>
          <button
            type="button"
            className="todo-list-add-button"
            onClick={() => router.push('/todo/add')}
          >
            추가하기
          </button>
        </div>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorCounts).map((color, index) => (
            <div className="todo-list-header-color-count" key={index}>
              {/* className은 문자열 나열로도 가능, separator 는 space */}
              <div className={`todo-list-header-round-color bg-${color}`}></div>
              <p>{todoColorCounts[color]}개</p>
            </div>
          ))}
        </div>
      </div>

      {/* 투두리스트 */}
      <ul className="todo-list">
        {todos &&
          todos.map(todo => (
            <li className="todo-item" key={todo.id}>
              <div className="todo-left-side">
                <div className={`todo-color-block bg-${todo.color}`}></div>
                <p
                  className={`todo-text ${
                    todo.checked ? 'checked-todo-text' : ''
                  }`}
                >
                  {todo.text}
                </p>
              </div>
              <div className="todo-right-side">
                {todo.checked && (
                  <>
                    <TrashCanIcon
                      className="todo-trash-can"
                      onClick={() => deleteTodo(todo.id)}
                    />
                    <CheckMarkIcon
                      className="todo-check-mark"
                      onClick={() => checkTodo(todo.id)}
                    />
                  </>
                )}
                {!todo.checked && (
                  <button
                    type="button"
                    className="todo-button"
                    onClick={() => checkTodo(todo.id)}
                  ></button>
                )}
              </div>
            </li>
          ))}
      </ul>
    </Container>
  );
};

export default TodoList;
