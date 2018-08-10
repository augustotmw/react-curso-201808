import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//carrega montando como filhos do objeto TweetsAPI todos os "exports" do arquivo "../../api/TweetsAPI"
import * as TweetsAPI from '../../api/TweetsAPI'; 

import api from '../../api/TweetsAPI';

import Cabecalho from '../../components/Cabecalho';
import NavMenu from '../../components/NavMenu';
import Dashboard from '../../components/Dashboard';
import Widget from '../../components/Widget';
import TrendsArea from '../../components/TrendsArea';
//import Tweet from '../../components/Tweet';
import Tweet from '../../containers/TweetPadrao';
import Modal from '../../components/Modal';


class Home extends Component {

    constructor(props) { //o argumento 'props' passa as propriedades que estão sendo passadas para a classe para o constructor
        super(props); //e para o constructor da classe pai tb (no caso o constructor da classe Component)
        this.state = { //objeto de variáveis que definem os estados da classe
            novoTweet: '',
            tweets: [],
            valor: 100,
            mostrando: {}
        }
        //this.addTweet = this.addTweet.bind(this); //adiciona o contexto "this" da classe no contexto da função "addTweet";
    }

    addTweet = (event) => { //este tipo de implementação remove a necessidade de implementar no constructor, a adição do contexto via "bind";
        event.preventDefault();
        
        /*
        //codigo movido para ./api/TweetsAPI.js pois assim utilizamos

        const novoTweet = this.state.novoTweet;
        const oldiesTweets = this.state.tweets;
        if(novoTweet) {

            fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,{
                method: 'POST',
                body: JSON.stringify({ conteudo: novoTweet})
            })
            .then(response => response.json())
            .then((novoTweetRegNoServer) => {
                
                //this.setState({
                //    tweets: [novoTweetRegNoServer,...oldiesTweets],
                //    novoTweet:''
                //});
                this.context.store.dispatch({
                    type: 'adicionar',
                    novoTweet: novoTweetRegNoServer
                });
            });

        }
        */
       this.context.store.dispatch(TweetsAPI.adicionar(this.state.novoTweet));
       this.setState({
           novoTweet: ''
       })
    }

    getTweets(){ //não precisa passar o contexto "this" por não se tratar de um evento e, por isso, já herdá-lo;
        if(this.state.tweets.length <= 0) {
            return "Manda um tweet ae! :)"
        } else {
            // return this.state.tweets.map((info,index) => <Tweet key={info+index} texto={info} />);
            return this.state.tweets.map((info,index) => 
                                                        <Tweet key={info._id} 
                                                            texto={info.conteudo} 
                                                            info={info} 
//                                                            removedor={(event) => this.removerTweet(info._id)} 
                                                            abrir={(ev) => this.abrirModal(ev,info._id)} />);
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

    jogar = (bilhete) => {
        return new Promise((resolve, reject) => {
            // resolve = para se executar quando der sucesso, chamará a função de promessa ".then(...)"
            // reject = para se executar quando ser erro, chamará a função de promessa ".catch(...)"
            // ambos serão executados como uma promessa de retorno da função "jogar"
            setTimeout(()=>{
                let sorteado = Math.floor(Math.random() * 6)+1;

                if(bilhete === sorteado) {
                    resolve(10000);
                } else {
                    reject(sorteado);
                }
            }, 2000);
        });
    }

    playLottery = () => {
        let bilhete = prompt('Digite um número de 1 a 6');
        bilhete = parseInt(bilhete,10);
        
        //implementação de função com promessa:
        this.jogar(bilhete)
        .then(premio => window.alert(`Ganhei R$ ${premio} porra! =D`))
        .catch(sorteado => window.alert(`Perdeu mané! O número sorteado foi ${sorteado}`));
    }

    listarTweets = () => {
        /* 
        //codigo movido para ./api/TweetsAPI.js pois assim utilizamos
        //a boa prática de retirarmos os dados de requisição do componente da Home
        //e proteger a informação
        
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        .then(response => response.json())
        .then((tweets) => {
            console.log("listarTweets");
            //this.setState({
            //    tweets
            //});
            //window.store.dispatch({type: 'carregar', tweets});
            this.context.store.dispatch({type: 'carregar', tweets});
        });*/
        //console.log("TweetsAPI: ", TweetsAPI);

        this.context.store.dispatch(TweetsAPI.carregar());
    }
    

    removerTweet(identificador) {
        /* 
        //codigo movido para ./api/TweetsAPI.js pois assim utilizamos
        //a boa prática de retirarmos os dados de requisição do componente da Home
        //e proteger a informação

        console.log("removerTweet: "+ identificador);
        fetch(`https://twitelum-api.herokuapp.com/tweets/${identificador}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, 
        { method: "DELETE"})
        .then((data) => data.json())
        .then((response) => {
            console.log(response);
            const novaLista = this.state.tweets.filter((tweet) => tweet._id !== identificador);
            this.setState({tweets: novaLista})
        }); 
        */
       this.context.store.dispatch(TweetsAPI.remover(identificador));
    }

    abrirModal = (event, idselecionado) => {
        const footer = event.target.closest('.tweet__footer');

        if(footer) return false;


        

        const selecionado = this.state.tweets.find(tweet => tweet._id === idselecionado);

        /* substituido pelo redux
        this.setState({
            mostrando: selecionado
        });
        */

        
        this.context.store.dispatch({type: api.addTweet, selecionado});

    }

    fecharModal = (event) => {
        const modal = event.target.closest('.widget');
        if(!modal) {
            /*
            this.setState({
                mostrando: {}
            });
            */
           this.context.store.dispatch({type: api.delTweet});
        }
    }

    componentDidMount() {
        this.listarTweets();
        console.log("componentDidMount");
        console.log(this.context);
    }

    componentWillMount() {
        //this.listarTweets();
        console.log("componentWillMount");
        //neste ponto, a tela ainda não foi renderizada. 
        //utilizar chamadas AJAX neste ponto pode ser perigoso, pois corre-se o risco 
        //de a requisição falhar e a tela não vai ser renderizada

        this.context.store.subscribe(() => {
            //console.table(this.context.store.getState())
            this.setState({
                //tweets: window.store.getState()
                tweets: this.context.store.getState().lista,
                mostrando: this.context.store.getState().mostrando
            });
        });

    }

    componentWillUpdate() {
        console.log("componentWillUpdate");
        // executa apenas no "setState" e caso a view seja atualizada
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
        // executa apenas no "setState" e caso a view seja atualizada
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }


  render() {
    
    /*
    // Maneiras de renderizar a listaVariavelNaoExisteNta 2 - Variável local:

    let tweets;
    
    if(this.state.tweets.length <=staVariavelNaoExisteN0) {
        tweets = "Manda um tweet astaVariavelNaoExisteN brow! :)"
    } else {
        tweets = this.state.tweetsstaVariavelNaoExisteNmap((info,index) => <Tweet key={info+index} texto={info} />);
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
                        <button type="button" className="novoTweet__envia" onClick={this.playLottery}>Jogar</button>
                        <button type="submit" className="novoTweet__envia" disabled={this.state.novoTweet.length > 140 ? true : false}>Tweetar</button>
                        <button className="novoTweet__envia" type="button" onClick={this.clickHandler}>Incrementar: {this.state.valor}</button>
                    </form>
                    <p className="totalTweets">Total de tweets: { this.props.qtde }</p>
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
        <Modal fechar={this.fecharModal} aberto={!!this.state.mostrando._id}>
            <Widget>
                <Tweet key={this.state.mostrando._id}
                        //removedor={() => this.removerTweet(this.state.mostrando._id)}
                        texto={this.state.mostrando.conteudo || ''}
                        inModal={true}
                        info={this.state.mostrando} />
            </Widget>
        </Modal>
      </Fragment>
    );
  }
}

Home.contextTypes = {
    //store: null //funciona 
    store: PropTypes.object
}


//conecta o state do redux com o props do componente ao chamar o connect(a,b)(c)
const mapStateToProps = (state) => {
    return { qtde: state.length}
}

//conecta
const mapDispatchToProps = (dispatch, props) => {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);;
