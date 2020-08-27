import React from "react";
import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', function () {
    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });

    });

    it('should store the token on login', function () {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some ID'})).toEqual(
                {
            token: 'some-token',
            userId: 'some ID',
            error: null,
            loading: false,
            authRedirectPath: '/'})

    });

});