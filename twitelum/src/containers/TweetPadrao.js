import { connect } from 'react-redux';
import * as TweetsAPI from '../api/TweetsAPI';
import Tweet from '../components/Tweet';

const mapStateProps = () => {
    return {}
}

const mapDispatchProps = (dispatch, props) => {
    return {
        removedor: () => {
            dispatch(TweetsAPI.remover(props.info._id))
        }
    }
}

const TweetContainer = connect(mapStateProps, mapDispatchProps)(Tweet);

export default TweetContainer