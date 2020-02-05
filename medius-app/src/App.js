import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar.js';
import HeadBar from './components/HeadBar.js';

function App() {
  return (
    <div className="App">
      <HeadBar></HeadBar>
      <SearchBar></SearchBar>
    </div>
  );
}

export default App;
