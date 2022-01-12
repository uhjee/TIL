# Component life cycle



![react_component_life_cycle](/Users/uhjee/Desktop/git_remote/TIL/react/fastcampus-react/01.component-life-cycle/react_component_life_cycle.png)

## 01. component 생성 및 마운트 (< v16.3)

- constructor
- ~~componentWillMount~~
- **render (최초 렌더)**
- componentDidMount
  - 타이머 처리
  - API 요청 

##  02. component props, state 변경 (< v16.3)

- ~~componentWillReceiveProps~~
  - props 를 새로 지정했을 때 바로 호출
  - state의 변경에 호출되지 않음
  - 여기서 props에 따라 state를 변경해야 한다면, **setState** 이용
  - 여기서 변경된 state는 다른 이벤트로 각각 가는 것이 아니라 한 번에 묶어서 처리
- shouldComponentUpdate
  - 렌더링 횟수 (성능)에 영향을 미치는 cycle
  - return type이 **boolean** 
    - true -> render 호출 (default)
    - false -> render 호출 X
- ~~componentWillUpdate~~
  - setState 사용하면 안됨
- **render**
- componentDidUpdate

## 03. component 언마운트 (< v16.3)

- componentWillUnmount

---

## 04. component 라이프 사이클 변경 (v16.3)

| before v16.3                  | after v16.3                  |
| ----------------------------- | ---------------------------- |
| constructor                   |                              |
| ~~componentWillMount~~        | **getDerivedStateFromProps** |
| **render**                    |                              |
| componentDidMount             |                              |
|                               |                              |
| ~~componentWillReceiveProps~~ | **getDrivedStateFromProps**  |
| shouldComponentUpdate         |                              |
| **render**                    |                              |
| ~~componentWillUpdate~~       | **getSnapshotBeforeUpdate**  |
| (dom 에 적용)                 |                              |
| componentDidUpdate            |                              |
|                               |                              |
| componentWillUnmount          |                              |



- getDerivedStateFromProps
  - 시간에 따라 변경되는 props에 state가 의존하는 경우 사용
  - state가 변경되어도 호출
  - return 값이 있어야 한다.

- getSnapshotBeforeUpdate
  - 렌더 전의 상태(**snapshot**)와 렌더 후의 상태를 비교할 수 있다.



## 05. 에러 처리 관련

- componentDidCatch
  - 에러 발생시 
  - Error Boundaries 를 가장 상위에 둔다. -> 주로 라이브러리 사용
  - ErrorBoundaries 하위에 우리의 서비스 react App 컴포넌트를 넣게 된다.