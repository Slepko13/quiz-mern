import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../constants/constants';
import { authApi } from '../../api/api';



export const logoutThunk = () => {
    return dispatch => {
        localStorage.removeItem('jwt');
        dispatch(logout());
    }
}

const logout = () => {
    return {
        type: LOGOUT
    }
}

export const loginThunk = (email, password) => {
    return async dispatch => {
        try {
            const { data: { token, message } } = await authApi.login(email, password);
            localStorage.setItem('jwt', token);
            console.log("SUCCESS");
            dispatch(login_success(token, message))
        } catch (error) {
            const message = error.response.data.message;
            console.log("FAILED");
            dispatch(login_failed(message))
        }
    }
}

const login_success = (token, message) => {
    return {
        type: LOGIN_SUCCESS,
        token,
        message
    }
}

const login_failed = (message) => {
    return {
        type: LOGIN_FAILED,
        message
    }
}