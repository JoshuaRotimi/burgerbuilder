import {AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, AUTH_REDIRECT_PATH} from "../actions/actionTypes";
import {updateObject} from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case AUTH_SUCCESS:
            return updateObject(state, {token: action.token, userId: action.userId, loading: false});
        case AUTH_FAIL:
            return updateObject(state, {error: action.error, loading: false});
        case AUTH_LOGOUT:
            return updateObject(state, {token: null, userId: null});
        case AUTH_REDIRECT_PATH:
            return updateObject(state, {authRedirectPath: action.path});

        default:
            return state;

    }

};

export default authReducer;