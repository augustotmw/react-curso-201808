import { connect } from 'react-redux';
import * as TweetsAPI from '../api/TweetsAPI';
import Tweet from '../components/Tweet';



//conecta o state do redux com o props do componente ao chamar o connect(a,b)(c)
const mapStateToProps = (state) => {
    return { qtde: state.length}
}

//conecta
const mapDispatchToProps = (dispatch, props) => {
    return {
        removedor: () => {
            dispatch(TweetsAPI.remover(props.info._id))
        },
        likeIt: (ev) => {
            ev.preventDefault();
            
            
            //const idLiked = props.info._id;
            //dispatch({ type: api.like, idLiked, liker: 'augustotmw'});
            dispatch(TweetsAPI.curtir(props.info._id))
            
            /*const {curtiu, todosLikes} = this.state;
    
            this.setState({
                curtiu : !curtiu,
                todosLikes : curtiu ? todosLikes-1 : todosLikes+1 
            });*/
        }
    
    }
    
}



const TweetContainer = connect(mapStateToProps, mapDispatchToProps)(Tweet);

export default TweetContainer