import axios from 'axios';
import {AUTH_FAIL, AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_REDIRECT_PATH} from "./actionTypes";

export const authStart = () => ({type: AUTH_START});

export const authFail = (error) => ({type: AUTH_FAIL, error});

export const authSuccess = (token, userId) => ({type: AUTH_SUCCESS, token,  userId});

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {type: AUTH_LOGOUT}
};

export const authCheckTimeout = (expiredTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiredTime * 1000)

    }
};

export const auth = (email, password, signUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {email, password, returnSecureToken: true};
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRx41DngSVqk2CkSLYO-2GAfpDujCssoo';
        if (!signUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRx41DngSVqk2CkSLYO-2GAfpDujCssoo'
        }
        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate );
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(authCheckTimeout(res.data.expiresIn))
            })
            .catch(e => {
                dispatch(authFail(e.response.data.error))
            })
    }

};

export const setRedirectPath = (path) => {
    return {
        type: AUTH_REDIRECT_PATH,
        path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authCheckTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }

        }
    }
};