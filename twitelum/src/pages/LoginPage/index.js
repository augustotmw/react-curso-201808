import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMsg: false
        }
    }

    mensagem() {
        return this.state.showMsg && <div className="loginPage__errorBox"> Login ou Senha inválidos! </div>;
    }
    
    executaLogin = (ev) => {
        ev.preventDefault();
        
        const dados = {
            login: this.inputLogin.value,
            senha: this.inputSenha.value,
            error: false
        };

        fetch('https://twitelum-api.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify(dados)
        })
        //.then(response => console.log(response))
        .then((response) => {
            console.log(response);
            if(!response.ok) throw response; //aqui verificamos se a resposta é inválida, mesmo que a requisição 
            return response.json();
        })
        .then((responseJSON) => {
            console.log(responseJSON);
            localStorage.setItem('TOKEN', responseJSON.token);
            this.props.history.push('/');
        })
        .catch((responseError) => {
            responseError.json().then((response) => {
                console.log(response);
                if(response.code === "NotFound") {
                    this.setState({showMsg: true});
                    setTimeout(()=>this.setState({showMsg: false}), 5000);
                }
            });
        })
        ;
    };

    onUpdateLogin = () => {
        if(this.inputLogin.value.length >= 20) {
            this.inputSenha.focus();
        }
    }

    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form className="loginPage__form" action="/" onSubmit={this.executaLogin}>
                            { this.mensagem() }

                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label> 
                                <input className="loginPage__input" type="text" id="login" name="login" ref={(inputLogin) => this.inputLogin = inputLogin} onChange={this.onUpdateLogin}/>
                                {/* 
                                    a melhor utilização do atributo "ref" é para capturar o elemento do DOM e utilizá-lo em métodos de manipulação do DOM via evento do elemento (focus, blur etc.)
                                */}
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                <input className="loginPage__input" type="password" id="senha" name="senha" ref={(inputSenha) => this.inputSenha = inputSenha}/>
                            </div>
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }
}


export default LoginPage