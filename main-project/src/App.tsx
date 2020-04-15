import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDivideByFive } from "@lv11/sub/src/hooks/useDivideByFive"
import { useCalculateScore } from "@lv11/sub/src/hooks/useCalculateScore"

function App() {
  const dbf = useDivideByFive()
  dbf.setDivider(6)
  dbf.divideNow()
  useCalculateScore(dbf.divided)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
