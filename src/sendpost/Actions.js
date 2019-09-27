import * as ActionTypes from './ActionTypes.js';
import config from '../config.js';

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

function sendPostStart() {
    return {
        type: ActionTypes.SEND_POST,
    }
}

function sendPostSuccess(data) {
    return {
        type: ActionTypes.SEND_POST_SUCCESS,
        payload: {data: data}
    }
}

function sendPostFailure() {
    return {
        type: ActionTypes.SEND_POST_FAILURE
    }
}

export const isClick = () => {
    return {
        type: ActionTypes.IS_CLICK
    }
}
export const sendPost = (userId, text, file, label) => {
    let newFile = new File([base64ToBlob(file)], userId + '.jpg', {type: 'image/jpeg'});
    return dispatch => {
        dispatch(sendPostStart());
        let fd = new FormData();
        fd.append('file', newFile);
        fd.append('userId', userId);
        fd.append('text', text);
        fd.append('label', label);
        fetch(`${config.url}sendPost`, {
            method: 'POST',
            body: fd
        }).then(res => res.json()).then(json => dispatch(sendPostSuccess(json))).catch(dispatch(sendPostFailure()))
    }
};

export const updateImage = (img) => {
    return {
        type: ActionTypes.UPDATE_IMG,
        payload: {img: img}
    }
};
export const changeStatus = () => {
    return {
        type: ActionTypes.CHANGE_STATUS
    }
};
export const changeStatusTo0 = () => {
    return {
        type: ActionTypes.CHANGE_STATUS_0
    }
};
export const changeText = (text) => {
    return {
        type: ActionTypes.CHANGE_TEXT,
        payload: {text: text}
    }
};
export const addLabel = (label) => {
    return {
        type: ActionTypes.ADD_LABEL,
        payload: {label: label}
    }
};
export const dataClear = () => {
    return {
        type: ActionTypes.DATA_CLEAR
    }
}