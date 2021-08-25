import React from 'react';

const UserContext = React.createContext();
const user = { name: 'mike', age: 23 };

const ParentComponent = () => {
  return (
    <UserContext.Provider value={user}>
      <ChildComponent />
    </UserContext.Provider>
  );
};

// ! 기존 hook 없이 사용하는 Context 소비하는 코드
// const ChildComponent = () => {
//   return (
//     <div>
//       <UserContext.Consumer>
//         {user => (
//           <>
//             <p>{`name is ${user.name}`}</p>
//             <p>{`age is ${user.age}`}</p>
//           </>
//         )}
//       </UserContext.Consumer>
//     </div>
//   );
// };

// ! useContext() 훅 사용
const ChildComponent = () => {
  const user = React.useContext(UserContext);

  return (
    <div>
      <p>{`name is ${user.name}`}</p>
      <p>{`age is ${user.age}`}</p>
    </div>
  );
};

export default ParentComponent;
