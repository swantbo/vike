import * as ActionTypes from './ActionTypes.js';
import fetch from 'cross-fetch';
import config from '../config.js';

function base64ToBlob(urlData) {
    var arr = urlData.split(',');
    var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
    // 去掉url的头，并转化为byte
    var bytes = window.atob(arr[1]);
    // 处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
    var ia = new Uint8Array(ab);

    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob([ab], {
        type: mime
    });
}


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
};

function updateUserAvatarStart() {
    return{
        type:ActionTypes.UPDATE_USER_AVATAR
    }
}
function updateUserAvatarSuccess(data) {
    return{
        type:ActionTypes.UPDATE_USER_AVATAR_SUCCESS,
        payload:{data:data}
    }
}
function updateUserAvatarFailure() {
    return{
        type:ActionTypes.UPDATE_USER_AVATAR_FAILURE
    }
}

export const updateUserAvatar = (file,userId)=>{
    console.log(userId);
    let newFile = new File([base64ToBlob(file)],userId+'.jpg',{type:'image/jpeg'});
    return dispatch=>{
        dispatch(updateUserAvatarStart());
        const fd  = new FormData();
        fd.append('file',newFile);
        fd.append('userId',userId);
        fetch(`${config.url}updateAvatar`,{
            method:'POST',
            body:fd
        }).then(res=>res.json()).then(json=>dispatch(updateUserInfoSuccess(json))).catch(dispatch(updateUserInfoFailure()))
    }
};

export const saveImg=(img)=>({
    type:ActionTypes.SAVE_IMG,
    payload:{img:img}
})
export const changeFloatInterFaceShow = () => ({
    type: ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_SHOW
});
export const changeFloatInterFaceClose = () => ({
    type: ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_CLOSE
});