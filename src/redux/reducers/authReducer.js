import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../constants/constants';

const initialState = {

    isAuth: false,
    token: null,
    loginMessage: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: action.token,
                loginMessage: action.message
            }
        case LOGIN_FAILED:
            return {
                ...state,
                isAuth: false,
                loginMessage: action.message
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                token: undefined,
                loginMessage: null
            }
        default:
            return state
    }

}

export default authReducer;