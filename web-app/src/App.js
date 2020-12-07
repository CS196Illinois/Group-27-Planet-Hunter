import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// import ZingChart from 'zingchart-react';
import { AppBar } from '@material-ui/core'

function App() {

  const [values, setValues] = useState([]);
  const [isPlanet, setIsPlanet] = useState();

  const state = {
    config: {
      type: 'bar',
      series: [{
        values: [4,5,3,4,5,3,5,4,11]
      }]
    }
  }

  // gets light light values
  useEffect(() => {
    fetch("/light-flux-values").then(res => res.json()).then(data => {
      setValues(data.values);
    })

  }, [])

  // waits until values have been received and then makes the model call to figure out if those values are a planet
  useEffect(() => {
    fetch('/model', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ flux_values: values })
    }).then(res => res.json()).then(data => {
      setIsPlanet(data.value[0]);
    });
  }, [values])

  return (
    <div className="App">

      <div style={{ display: "flex", overflowX: "clip" }}>
        {`This is the post request response: ${isPlanet}`}
      </div>
      <div>
        <br /><br /><br /><br /><br />
        {values.map(val => (
          <span>{`${val}                             `}</span>
        ))}
      </div>


    </div>
  );
}

export default App;
