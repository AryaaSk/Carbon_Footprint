import React from 'react';
import './App.css';
import Visualization from './Visualisation/visualization';
import Phone from './Phone/phone';

function App() {

  return (
    <div className='main'>
      <Visualization />
      <Phone />
    </div>
  );
}

export default App;
