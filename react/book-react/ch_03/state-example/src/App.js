import React from 'react';

import MyComponent from './components/colorState';

import CountComponent from './components/count';
import MultiState from './components/multiState';

import { EffectComponent } from './components/useEffect';

import Profile from './components/profile';

import { WidthPrinter } from './components/WidthPrinter';

export default function App() {
  return (
    <div style={{ padding: 20, border: '5px solid gray' }}>
      happy
      <MyComponent />
      <div id="todo"></div>
      <CountComponent></CountComponent>
      <MultiState></MultiState>
      <EffectComponent></EffectComponent>
      <Profile userId="jee"></Profile>
      <WidthPrinter />
    </div>
  );
}
