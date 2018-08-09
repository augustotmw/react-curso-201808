import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Sobre from './Sobre';
import NotFound from './NotFound';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, HashRouter, Switch, Route} from 'react-router-dom';

//BrowserRouter = Navegação com rota direta, necessita configuração do servidor para retornar sempre a index do site
//HashRouter = Navegação com hash-route

//As rotas são lidas de cima para baixo. TODO = explanar melhor

ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/sobre" component={Sobre} />
        <Route path="*" component={NotFound} />
    </Switch>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
