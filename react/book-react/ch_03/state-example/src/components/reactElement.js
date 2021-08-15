import React from 'react';

// JSX 문법
const element00 = <a href="http://google.com">move Google</a>;

// React.createElement() 함수
const element01 = React.createElement(
  'a',
  { href: 'http://google.com' },
  'move Google!',
);

// ---------------------------------------------

export const Element02 = (
  <a key="key1" style={{ width: 100 }} href="http://google.com">
    click here!
  </a>
);
// console.log(Element02);

// export { Element02 };
