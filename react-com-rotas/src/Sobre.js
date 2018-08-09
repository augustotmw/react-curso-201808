import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';

class Sobre extends Component {
    render() {
        return(
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Página de Sobre</h1>
                </header>
                <p className="App-intro">
                    Página Institucional Sobre :)

                    <br /><br />
                    <Link to="/">Home</Link>
                </p>
            </div>
        );
    }
}

export default Sobre;