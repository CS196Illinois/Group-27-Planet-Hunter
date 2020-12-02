import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [currentTime, setCurrentTime] = useState(0);
  const [values, setValues] = useState([]);

  useEffect(() => {
    fetch("/time").then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    })

    fetch("/light-flux-values").then(res => res.json()).then(data => {
      setValues(data.values);
    })
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>The current time is {currentTime}.</p>
        <br />
        {values.map(val => (
            <p>{val}</p>
        ))}
      </header>
    </div>
  );
}

export default App;
