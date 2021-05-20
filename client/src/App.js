import React, { useEffect } from 'react';
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
    <div>
      Frontend Lacompra
    </div>
  );
}

export default App;
