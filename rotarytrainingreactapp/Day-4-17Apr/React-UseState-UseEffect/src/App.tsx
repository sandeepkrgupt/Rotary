import React from 'react';
import logo from './logo.svg';
import './App.css';
import CountComp from './stateHook';
import EffectHookComp from './effectHook';

function App() {
  return (
    <div className="App">
     <CountComp initialCount={100} />
     <EffectHookComp />
    </div>
  );
}

export default App;
