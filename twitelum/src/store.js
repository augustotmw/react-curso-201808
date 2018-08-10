import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //serve para postegar o dispatch
import api from './api/TweetsAPI';


function reducer(state = { lista: [], mostrando: {}}, action = {}) {

    console.log(action.type)
    
    
    switch (action.type) {
        case api.load:

            state = { ...state, lista: action.tweets };
            break;
        case api.add:
            state = { ...state, lista: [action.novoTweet, ...state.lista] };
            break;
        case api.del:
            const novaLista = state.lista.filter((tweet) => tweet._id !== action.identificador);
            state = { ...state, lista: novaLista};
        break;
        case api.delTweet:
            state = { ...state, mostrando: {}};
        break;
        case api.addTweet:
            state = { ...state, mostrando: action.selecionado };
        break;
        case api.like:
        debugger;
            const listaAtualizada = state.lista.filter(tweet => {
                if(tweet._id === action.identificador) {
                    const {likeado, totalLikes} = tweet;
    
                    if(tweet.likeado) {
                        tweet.likes = tweet.likes.filter((like) => like.usuario.login !== action.liker);
                    } else {
                        tweet.likes = [{usuario: {login: action.liker}}, ...tweet.likes];
                    }
    
                    tweet.likeado = !likeado;
                    tweet.totalLikes = likeado ? totalLikes-1 : totalLikes+1;

                }

                return tweet;
            });

            const tweetAtualizado = listaAtualizada.find(tweet => tweet._id === state.mostrando._id);

            state = {
                mostrando: { ...tweetAtualizado } || {},
                lista: listaAtualizada
            }
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