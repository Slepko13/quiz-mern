import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import Login from './Login';
import { loginThunk } from '../../redux/actions/authActions';




const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        token: state.auth.token,
        loginMessage: state.auth.loginMessage,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(loginThunk(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);