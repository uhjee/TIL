import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
import { TodoType } from '../types/todo';

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

  .todo-list-header {
    padding: 12px;
    position: relative;
    border-bottom: 1px solid ${palette.gray};

    .todo-list-last-todo {
      font-size: 14px;
      margin: 0 0 8px;
      span {
        margin-left: 12px;
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
const TodoList: React.FC<IProps> = ({ todos }) => {
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

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은 TODO <span>{todos.length}개</span>
        </p>
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
    </Container>
  );
};

export default TodoList;
