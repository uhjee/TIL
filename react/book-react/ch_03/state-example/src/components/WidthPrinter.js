import React, { useState, useEffect } from 'react';

// custom hook: mounted 여부 반환
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

// custom hook : event 등록과 해제
function useWidthPrinter() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return width;
}

function WidthPrinter() {
  const mounted = useMounted();
  const width = useWidthPrinter();
  return <div>{`width is ${width}`}</div>;
}

export { WidthPrinter };
