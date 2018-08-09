import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

class Modal extends Component {
    static propTypes = {
        aberto: PropTypes.bool,
        fechar: PropTypes.func.isRequired
    }

    render() {
        return(
            <div className={`modal ${this.props.aberto ? 'modal--active' : ''}`} onClick={this.props.fechar}>
                {this.props.aberto && <div className="modal__wrap"> {this.props.children} </div>}
            </div>
        );
    }
}

export default Modal;