
const api = {
    add: "adicionar",
    addTweet: "adicionaTweet",
    del: "remover",
    delTweet: "removeTweet",
    load: "carregar",
    like: "curtir"
}

export const carregar = () => {
    return (dispatch => {
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then(response => response.json())
            .then((tweets) => {
                console.log("listarTweets");
                dispatch({ type: api.load, tweets });
            });

    });
}

export const adicionar = (novoTweet) => {
    return ((dispatch) => {
        if (novoTweet) {

            fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method: 'POST',
                body: JSON.stringify({ conteudo: novoTweet })
            })
                .then(response => response.json())
                .then((novoTweetRegNoServer) => {
                    dispatch({ type: api.add, novoTweet: novoTweetRegNoServer });
                });
        }
    });
}

export const remover = (identificador) => {
    // console.log("removerTweet: "+ identificador);
    return (dispatch => {
        fetch(`https://twitelum-api.herokuapp.com/tweets/${identificador}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, 
        { method: "DELETE"})
        .then((data) => data.json())
        .then((response) => {
            console.log(response);
            dispatch({ type: api.del, identificador});
            dispatch({ type: api.delTweet });
            if(response.removidos && response.removidos > 0 && response.message) {
                alert(response.message);
            }
        }); 
    });
}

export const curtir = (identificador) => {
    return(dispatch => {
        fetch(`https://twitelum-api.herokuapp.com/tweets/${identificador}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
    {method: "POST"})
        .then(response => response.json())
        .then(response => {
            console.log("liked: ", response);
            dispatch({ type: api.like, identificador, liker: 'augustotmw'});
            alert(response.message);
        });
    });
}


export default api

