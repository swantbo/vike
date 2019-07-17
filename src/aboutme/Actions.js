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

function updateUserInfoStart() {
    return{
        type:ActionTypes.UPDATE_USER_INFO
    }
}
function updateUserInfoSuccess(data) {
    return{
        type:ActionTypes.UPDATE_USER_INFO_SUCCESS,
        payload:{data:data}
    }
}
function updateUserInfoFailure() {
    return{
        type:ActionTypes.UPDATE_USER_INFO_FAILURE
    }
}

export const updateUserInfo = (userId,userName,email,introduction,gender,recommend,website)=>{
    return dispatch =>{
        dispatch(updateUserInfoStart());
        return fetch(`${config.url}updateUserInfo`,{
            method: 'POST',
            body:JSON.stringify({userId,userName,email,introduction,gender,recommend,website})
        }).then(res=>res.json()).then(json=>{dispatch(updateUserInfoSuccess(json))}).catch(
            error=>dispatch(updateUserInfoFailure())
        )
    }
}

export const changeFloatInterFaceShow = () => ({
    type: ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_SHOW
});
export const changeFloatInterFaceClose = () => ({
    type: ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_CLOSE
});