import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/LoginPage';



function isAuth() {
    return localStorage.getItem('TOKEN') ? true : false;
}

class RotaPrivada extends React.Component {
    render() {
        const Component = this.props.component; //pega o componente que está sendo passado para a classe
        const props = this.props;
        if(isAuth()) {
            return(<Route render={() => <Component {...props} />} />); // ... = extende o objeto parecido com o $.extend do jQuery
        } else {
            return(<Redirect to="/login/" />);
        }
    }
}

const Roteador = () => {
    return(
        <Switch>
            <Route path="/login" component={Login} />
            <RotaPrivada path="/" component={Home} exact={true} />
            <RotaPrivada path="*" component={Login} exact={true} />
        </Switch>
    );
};



export default Roteador;

