import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {

    constructor(props) { //o argumento 'props' passa as propriedades que estão sendo passadas para a classe para o constructor
        super(props); //e para o constructor da classe pai tb (no caso o constructor da classe Component)
        this.state = { //objeto de variáveis que definem os estados da classe
            novoTweet: '',
            tweets: [],
            valor: 100
        }
        //this.addTweet = this.addTweet.bind(this); //adiciona o contexto "this" da classe no contexto da função "addTweet";
    }

    addTweet = (event) => { //este tipo de implementação remove a necessidade de implementar no constructor, a adição do contexto via "bind";
        event.preventDefault();
        const novoTweet = this.state.novoTweet;
        const oldiesTweets = this.state.tweets;
        if(novoTweet) {
            this.setState({
                tweets: [novoTweet,...oldiesTweets],
                novoTweet:''
            });
        }
    }

    getTweets(){ //não precisa passar o contexto "this" por não se tratar de um evento e, por isso, já herdá-lo;
        if(this.state.tweets.length <= 0) {
            return "Manda um tweet ae! :)"
        } else {
            return this.state.tweets.map((info,index) => <Tweet key={info+index} texto={info} />);
        }
    }


    incrementa = () => {
        this.setState({valor: this.state.valor+1});
    }

    incrementaVarios = () => {
        this.setState(state => ({
            valor: state.valor +1
        }));
    }

    clickHandler = () => {
        //this.incrementa();
        //this.incrementa();
        this.incrementaVarios();
        this.incrementaVarios();
    }

  render() {
    
    /*
    // Maneiras de renderizar a lista 2 - Variável local:

    let tweets;
    
    if(this.state.tweets.length <= 0) {
        tweets = "Manda um tweet aí brow! :)"
    } else {
        tweets = this.state.tweets.map((info,index) => <Tweet key={info+index} texto={info} />);
    }

    */

    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@augustotmw" />
        </Cabecalho>
        <div className="container">
            <Dashboard> 
                <Widget>
                    <form className="novoTweet" onSubmit={this.addTweet}>
                        <div className="novoTweet__editorArea">
                            <span className={`novoTweet__status ${this.state.novoTweet.length > 140 ? 'novoTweet__status--invalido':''}`}>{this.state.novoTweet.length}/140</span>
                            <textarea className="novoTweet__editor" placeholder="O que está acontecendo?" value={this.state.novoTweet} onInput={(event) => this.setState({novoTweet: event.target.value})}></textarea>
                            {/*
                                o atributo onInput ativa os eventos de key do campo e responde a esse evento
                            */}
                        </div>
                        <button type="submit" className="novoTweet__envia" disabled={this.state.novoTweet.length > 140 ? true : false}>Tweetar</button>
                        <button className="novoTweet__envia" type="button" onClick={this.clickHandler}>Incrementar: {this.state.valor}</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                    {/* 
                    
                    Existem 3 maneiras de mostrar uma mensagem caso a lista esteja vazia:

                    1- Renderização Condicional:*/
                    
                    //this.state.tweets.length <= 0 ? 'Manda um tweet aí fera! ;)' : this.state.tweets.map((info,index) => <Tweet key={info+index} texto={info} />) 
                    
                    }
                    {/* 
                    
                    2 - Variável local:
                            - Adiciona-se uma variável local fora do render() e faz-se a decisão alimentando a variável, para depois apenas renderizá-la chamando-a no código:*/
                    
                    //tweets

                    }
                    {/*
                    
                    3 - Funções: */
                    
                    this.getTweets()

                    }
                    {/*
                        <Tweet key={info+index} texto={info} />
                        - A propriedade "key" é obrigatória quando a resposta utiliza um loop em um array para repetir um componente;
                        - Esta propriedade "key" deve ser única e não pode se repetir para cada repetição do componente;
                    */}
                    {}
                        
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}



export default App;
