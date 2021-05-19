import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  useEffect(() => {
    fetch("https://lacompra-beta.herokuapp.com/").then((response) => {
      return response.json();
    }).then((data) => {
      console.log('data: ', data);
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          Lacompra
      </header>
    </div>
  );
}

export default App;
