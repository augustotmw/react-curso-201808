import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        

          To get started, edit <code>src/App.js</code> and save to reload.<br /><br />

          <Link to="/sobre">Página Sobre</Link>

          
        </p>
      </div>
    );
  }
}

export default App;
