import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom';

class NotFound extends Component {
    render() {
        return(
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">404 - Page not found</h1>
                </header>
                <p className="App-intro">

                    <br /><br />
                    <Link to="/">Home</Link>
                </p>
            </div>
        );
    }
}

export default NotFound;