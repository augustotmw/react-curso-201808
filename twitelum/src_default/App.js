import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho';
import NavMenu from './components/NavMenu';
import {Botao1, Botao2} from './Botao';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@augustotmw" />
        </Cabecalho>
        <Botao1 cor="blue" texto="click me!"></Botao1>
        <Botao1 cor="red" texto="cancel"></Botao1>
        <Botao2 cor="green">login</Botao2>
      </Fragment>
    );
  }
}

export default App;
