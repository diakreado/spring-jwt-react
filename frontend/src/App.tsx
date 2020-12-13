import React from 'react';
import { BrowserRouter as Router, } from 'react-router-dom';
import './App.css';
import MainContainer from './components/MainContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <MainContainer />
      </Router>
    </div>
  );
}

export default App;
