import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //serve para postegar o dispatch
import api from './api/TweetsAPI';


function reducer(state = [], action = {}) {

    console.log(action.type)
    switch (action.type) {
        case api.load:
            state = action.tweets;
            break;
        case api.add:
            state = [action.novoTweet, ...state];
            break;
        case api.del:
            const novaLista = state.filter((tweet) => tweet._id !== action.identificador);
            state = novaLista;
        break;
        default: break;
    }

    return state;
}

const store = createStore(reducer, applyMiddleware(thunk));
console.log("Default state da store: ", store.getState());
//console.log(createStore);

//window.store = store;

export default store;