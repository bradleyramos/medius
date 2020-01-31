import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar.js';

function App() {
  return (
    <div className="App">
      <div className="Header">
        Medius
      </div>
      <SearchBar></SearchBar>
    </div>
  );
}

export default App;
