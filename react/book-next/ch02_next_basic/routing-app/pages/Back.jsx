import React from 'react';
import { useRouter } from 'next/router';

export default function Back() {
  const router = useRouter();
  const clickHandler = () => router.back();
  return <button onClick={clickHandler}>Back</button>;
}
