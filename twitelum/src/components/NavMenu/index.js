import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './navMenu.css'

class NavMenu extends Component {

    fazerLogout = (props) => {
        localStorage.removeItem("TOKEN");
        this.props.history.push("/login");
        //window.alert('logout');
    }


    render() {
        return (
            <nav className="navMenu">
                <ul className="navMenu__lista">
                <li className="navMenu__item">
                    <a className="navMenu__link">
                        Bem vindo(a): <br />
                        <strong>{ this.props.usuario }</strong>
                    </a>
                </li>
                <li className="navMenu__item">
                    <a className="navMenu__link" href="">Página Inicial</a>
                </li>
                <li className="navMenu__item">
                    <a className="navMenu__link">Hashtags</a>
                </li>
                <li className="navMenu__item">
                    <a className="navMenu__link" onClick={this.fazerLogout}>Logout</a>
                </li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(NavMenu);
//como o roteador é feito por um módulo importado, coloca-se no export esta função "withRouter", 
//que é uma função decoradora, ou seja, que altera o retorno da classe adicionando as funcionalidades 
//do componente para depois exportar a classe.