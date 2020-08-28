import { connect } from 'react-redux';
import { toggleModal } from '../../redux/actions/customActions';
import { logoutThunk } from '../../redux/actions/authActions';
import { getQuestionsFromDBThunk, resetState } from '../../redux/actions/questionsActions';
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
        logout: () => dispatch(logoutThunk()),
        getQuestionsFromDB: () => dispatch(getQuestionsFromDBThunk()),
        resetState: () => dispatch(resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);