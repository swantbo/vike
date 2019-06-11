import * as ActionTypes from './ActionTypes.js';
import fetch from 'cross-fetch';

function requestGet(name) {
    return {
        type: ActionTypes.FETCH_GET_REQUEST,
        name
    }
}

function requestSuccess(name, json) {
    return {
        type: ActionTypes.FETCH_GET_SUCCESS,
        payload:json
    }
}

function requestFailure(name) {
    return {
        type: ActionTypes.FETCH_GET_FAILURE,
        name
    }
}

export const requestTest = (name) => {
    console.log('0');
    return (dispatch) => {
        dispatch(requestGet(name));
        return fetch(`http://localhost:3030/api?name=${name}&age=23`, {method: 'GET'}).then(response => response.json(), error => {
            console.log(error);
        }).then(json => dispatch(requestSuccess(name, json))).catch(error=>{console.log(error);dispatch(requestFailure(name))});

    };
};

export const changeUserName = (name) => ({
    type: ActionTypes.ABOUTME_CHANGE_USER_NAME,
    payload: {userName: name}
});
export const changeUserId = (id) => ({
    type: ActionTypes.ABOUTME_CHANGE_USER_ID,
    payload: {userId: id}
});
export const changeEmail = (email) => ({
    type: ActionTypes.ABOUTME_CHANGE_USER_EMAIL,
    payload: {email: email}
});
export const changeIntroduction = (text) => ({
    type: ActionTypes.ABOUTME_CHANGE_USER_INTRODUCTION,
    payload: {Introduction: text}
});
export const changeWebsite = (website) => ({
    type: ActionTypes.ABOUTME_CHANGE_USER_WEBSITE,
    payload: {website: website}
});
export const changeGender = (num) => ({
    type: ActionTypes.ABOUTME_CHANGE_USER_GENDER,
    payload: {gender: num}
});
export const changeIsActive = (boolean) => ({
    type: ActionTypes.ABOUTME_CHANGE_USER_ACTION,
    payload: {isActive: boolean}
});
export const changeIsRecommend = (boolean) => ({
    type: ActionTypes.ABOUTME_CHANGE_USER_RECOMMEND,
    payload: {isRecommend: boolean}
});
export const changeIsPrivate = (boolean) => ({
    type: ActionTypes.ABOUTME_CHANGE_USER_PRIVATE,
    payload: {isPrivate: boolean}
});
export const changeFloatInterFaceShow = () => ({
    type: ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_SHOW
});
export const changeFloatInterFaceClose = () => ({
    type: ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_CLOSE
});