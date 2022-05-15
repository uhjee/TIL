import styled from 'styled-components';
import palette from '../styles/palette';
import BrushIcon from '../public/statics/svg/brush.svg';
import { useState } from 'react';
import { TodoType } from '../types/todo';
import { addTodoAPI } from '../lib/api/todos';
import { useRouter } from 'next/router';

const Container = styled.div`
  padding: 16px;

  .add-todo-header-title {
    font-size: 21px;
  }

  .add-todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button-box {
      .add-todo-submit-button {
        padding: 4px 8px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: #fff;
        outline: none;
        font-size: 14px;
        margin-right: 4px;

        &:last-child {
          margin: 0;
        }
      }
    }
  }

  .add-todo-colors-wrapper {
    width: 100%;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;

    .add-todo-color-list {
      display: flex;
      button {
        width: 24px;
        height: 24px;
        margin-right: 16px;
        border: 0;
        outline: 0;
        border-radius: 50%;
        &:last-child {
          margin: 0;
        }
      }

      .add-todo-selected-color {
        border: 2px solid #999 !important;
        transform: scale(1.2);
      }
    }
  }

  textarea {
    width: 100%;
    border-radius: 5px;
    height: 300px;
    border-color: ${palette.gray};
    margin-top: 12px;
    resize: none;
    padding: 12px;
    font-size: 16px;
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

interface AddTodoProps {}

const colors: ReadonlyArray<TodoType['color']> = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'navy',
];

const AddTodo: React.FC = () => {
  const [text, setText] = useState('');

  const router = useRouter();

  // useState 함수에 generic으로 state의 타입 지정
  const [selectedColor, setSelectedColor] = useState<TodoType['color']>();

  /**
   * Todo를 추가한다.
   */
  const addTodo = async () => {
    try {
      if (!text || !selectedColor) {
        alert('색상과 할 일을 입력해주세요.');
        return;
      }

      await addTodoAPI({ text, color: selectedColor });
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <div className="add-todo-header">
        <h1 className="add-todo-header-title">Add Todo</h1>
        <div className="button-box">
          <button
            type="button"
            className="add-todo-submit-button"
            onClick={addTodo}
          >
            추가하기
          </button>
          <button
            type="button"
            className="add-todo-submit-button"
            onClick={() => router.push('/')}
          >
            취소
          </button>
        </div>
      </div>
      <div className="add-todo-colors-wrapper">
        <div className="add-todo-color-list">
          {colors.map((color, index) => (
            <button
              key={index}
              type="button"
              className={`bg-${color} add-todo-color-button ${
                color === selectedColor ? 'add-todo-selected-color' : ''
              }`}
              // 타입 단언을 통해 타입 명시
              onClick={() => setSelectedColor(color as TodoType['color'])}
            />
          ))}
        </div>
        <BrushIcon />
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.currentTarget.value)}
        placeholder="할 일을 입력해주세요."
      />
    </Container>
  );
};

export default AddTodo;
