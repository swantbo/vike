import * as ActionTypes from './ActionTypes.js';
import fetch from 'cross-fetch';
import config from '../config.js';

function requestGet(name) {
    return {
        type: ActionTypes.LOGIN_GET_REQUEST,
        payload: {userId: name}
    }
}

function requestSuccess(json) {
    return {
        type: ActionTypes.LOGIN_GET_SUCCESS,
        payload: {data: json}
    }
}

function requestFailure() {
    return {
        type: ActionTypes.LOGIN_GET_FAILURE,
    }
}

export const requestLoginUserInfo = (name) => {
    return (dispatch) => {
        dispatch(requestGet(name));
        return fetch(`${config.url}getUserInfo?userId=${name}`, {method: 'GET'}).then(response => response.json()).then(json => dispatch(requestSuccess(json))).catch(error => {
            console.log(error);
            dispatch(requestFailure())
        });

    };
};

export const changeFloatInterFaceShow = () => ({
    type: ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_SHOW
});
export const changeFloatInterFaceClose = () => ({
    type: ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_CLOSE
});