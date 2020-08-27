import { connect } from 'react-redux';
import { toggleModal } from '../../redux/actions/customActions';
import { logoutThunk } from '../../redux/actions/authActions';
import Navbar from './Navbar';


const mapStateToProps = state => {
    return {
        isOpen: state.custom.isOpen,
        isAuth: state.auth.isAuth,
        token: state.auth.token,
        loginMessage: state.auth.loginMessage
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleModal: () => dispatch(toggleModal()),
        logout: () => dispatch(logoutThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);