import React, { useState, useEffect } from 'react';

function EffectComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `업데이트 횟수: ${count}`;
  });

  return <button onClick={() => setCount(count + 1)}>increase</button>;
}

export { EffectComponent };
