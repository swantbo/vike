import * as ActionTypes from './ActionTypes.js';
import fetch from 'cross-fetch';
import config from '../config.js';
import md5 from 'md5';

function base64ToBlob(urlData) {
    var arr = urlData.split(',');
    var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
    var bytes = window.atob(arr[1]);
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], {
        type: mime
    });
}

//更改密码
const changePasswordState = () => ({
    type: ActionTypes.CHANGE_PASSWORD
});
const changePasswordSuccess = () => ({
    type: ActionTypes.CHANGE_PASSWORD_SUCCESS,
    payload: {status: 200}
});
const changePasswordFailure = (data) => ({
    type: ActionTypes.CHANGE_PASSWORD_FAILURE,
    payload: {data}
});
export const changePassword = (userId, oldPassword, newPassword) => {
    return dispatch => {
        dispatch(changePasswordState());
        return fetch(`${config.url}changePassword`, {
            method: 'POST',
            body: JSON.stringify({userId: userId, oldPassword: md5(oldPassword), newPassword: md5(newPassword)})
        }).then(res => res.json()).then(json => json.status === 200 ? dispatch(changePasswordSuccess(json)) : dispatch(changePasswordFailure(json))).catch(
            err => dispatch(changePasswordFailure(err))
        )
    }
};


//请求个人帖子图片
const myPostStart = (arr) => ({
    type: ActionTypes.ABOUT_ME_MY_POST,
    payload: {data: arr}
});
const myPostSuccess = (data, id) => ({
    type: ActionTypes.ABOUT_ME_MY_POST_SUCCESS,
    payload: {data: data, id: id}
});
const myPostFailure = (data) => ({
    type: ActionTypes.ABOUT_ME_MY_POST_FAILURE,
    payload: {data: data}
});

export const myPost = (arr, userId, id) => {
    return (dispatch) => {
        dispatch(myPostStart(arr));
        return fetch(`${config.url}getPostImage`, {
            method: 'POST',
            body: JSON.stringify({arr, userId})
        }).then(res => res.json()).then(
            json => {
                dispatch(myPostSuccess(json, id))
            }
        ).catch(err => {
            dispatch(myPostFailure(err))
        })
    }
};

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
const requestOtherUserStart = (userId) => ({
    type: ActionTypes.ABOUT_ME_REQUEST_OTHER_USER_INFO
});
const requestOtherUserSuccess = (data) => ({
    type: ActionTypes.ABOUT_ME_REQUEST_OTHER_USER_INFO_SUCCESS,
    payload: {data: data}
});
const requestOtherUserFailure = (err) => ({
    type: ActionTypes.ABOUT_ME_REQUEST_OTHER_USER_INFO_FAILURE,
    payload: {err: err}
});

export const requestOtherUser = (userId) => {
    return (dispatch) => {
        dispatch(requestOtherUserStart());
        return fetch(`${config.url}getOtherUser?userId=${userId}`, {method: 'GET'}).then(
            res => res.json()).then(
            json => {
                dispatch(requestOtherUserSuccess(json));
                dispatch(myPost(json.data.posts, null, true))
            }).catch(
            err => dispatch(requestOtherUserFailure(err)))
    }
};

function updateUserInfoStart() {
    return {
        type: ActionTypes.UPDATE_USER_INFO
    }
}

function updateUserInfoSuccess(data) {
    return {
        type: ActionTypes.UPDATE_USER_INFO_SUCCESS,
        payload: {data: data}
    }
}

function updateUserInfoFailure() {
    return {
        type: ActionTypes.UPDATE_USER_INFO_FAILURE
    }
}

export const updateUserInfo = (userId, userName, email, introduction, gender, recommend, website) => {
    return dispatch => {
        dispatch(updateUserInfoStart());
        return fetch(`${config.url}updateUserInfo`, {
            method: 'POST',
            body: JSON.stringify({userId, userName, email, introduction, gender, recommend, website})
        }).then(res => res.json()).then(json => {
            dispatch(updateUserInfoSuccess(json))
        }).catch(
            error => dispatch(updateUserInfoFailure())
        )
    }
};
const followStart = (userId, followId) => ({
    type: ActionTypes.ABOUT_ME_FOLLOW,
    payload: {userId, followId}
});
const followSuccess = (userId, followId, data) => ({
    type: ActionTypes.ABOUT_ME_FOLLOW_SUCCESS,
    payload: {userId, followId, data},
});
const followFailure = (err) => ({
    type: ActionTypes.ABOUT_ME_FOLLOW_FAILURE,
    payload: {err}
});

export const follow = (userId, followId) => {
    return dispatch => {
        dispatch(followStart(userId, followId));
        return fetch(`${config.url}follow`, {
            method: 'POST',
            body: JSON.stringify({userId: userId, followId: followId})
        }).then(res => res.json()).then(
            json => {
                dispatch(followSuccess(userId, followId, json))
            }
        ).catch(err => dispatch(followFailure(err)))
    }
};
const requestManyState = () => ({
    type: ActionTypes.REQUEST_MANY_USER_INFO
});
const requestManySuccess = (data) => ({
    type: ActionTypes.REQUEST_MANY_USER_INFO_SUCCESS,
    payload: {data}
});
const requestManyFailure = () => ({
    type: ActionTypes.REQUEST_MANY_USER_INFO_FAILURE
});

export const requestMany = (userId) => {
    return dispatch => {
        dispatch(requestManyState());
        return fetch(`${config.url}manyUser?userId=${userId}`, {
            method: 'GET',
        }).then(res => res.json()).then(json => dispatch(requestManySuccess(json))).catch(err => dispatch(requestManyFailure()))
    }
};


const updateUserAvatarStart = () => ({
    type: ActionTypes.UPDATE_USER_AVATAR
});

const fuckdd = (data) => ({
    type: ActionTypes.UPDATE_USER_AVATAR_SUCCESS,
    payload: {data}
});

const fuckmm = () => ({
    type: ActionTypes.UPDATE_USER_AVATAR_FAILURE
});

export const updateUserAvatar = (file, userId) => {
    let newFile = new File([base64ToBlob(file)], userId + '.jpg', {type: 'image/jpeg'});
    return dispatch => {
        const fd = new FormData();
        fd.append('file', newFile);
        fd.append('userId', userId);
        dispatch(updateUserAvatarStart());
        fetch(`${config.url}updateAvatar`, {
            method: 'POST',
            body: fd
        }).then(res => res.json()).then(json => {
            dispatch(fuckdd(json));
        }).catch(dispatch(fuckmm()))
    }
};

export const saveImg = (img) => ({
    type: ActionTypes.SAVE_IMG,
    payload: {img: img}
});
export const changeUpdateState = () => ({
    type: ActionTypes.CHANGE_UPDATE_STATE
});
export const changeFloatInterFaceShow = () => ({
    type: ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_SHOW
});
export const changeFloatInterFaceClose = () => ({
    type: ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_CLOSE
});