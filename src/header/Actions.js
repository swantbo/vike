import * as ActionTypes from './ActionTypes.js';
import fetch from 'cross-fetch';
import config from '../config.js';
import {requestPost} from "../home/Actions";
import {requestSearch} from '../search/Actions.js'

let t;
const requestIdState = () => ({
    type: ActionTypes.POST_REQUEST_ID,
});
const requestIdSuccess = (list) => ({
    type: ActionTypes.POST_REQUEST_ID_SUCCESS,
    payload: {list: list}
});
const requestIdFailure = () => ({
    type: ActionTypes.POST_REQUEST_ID_FAILURE
});
export const requestId = (tempId,s) => {
    return (dispatch) => {
        dispatch(requestIdState());
        return fetch(`${config.url}getPostId?tempId=${tempId}&s=${s}`, {method: 'GET'}).then(res => res.json()).then(
            json => {
                dispatch(requestIdSuccess(json));
                for (let item of json) {
                    dispatch(requestPost(item))
                }
            }
        ).catch(dispatch(requestIdFailure()))
    }
};

export const ChangeOptions = () => ({
    type: ActionTypes.HEADER_OPTIONS
});
export const BackTop = () => ({
    type: ActionTypes.HEADER_BACK_TOP
});
const sendInputText = (text) => ({
    type: ActionTypes.HEADER_SEND_USER_NAME,
    payload: {name: text}
});
export const SendUserName = (name) => {
    return (dispatch) => {
        let nt = new Date().getTime();
        clearInterval(t);
        t = setInterval(() => {
            if (new Date().getTime() - nt >= 1000&&name.length>=1) {
                clearInterval(t);
                // dispatch(clearSearchResults());
                dispatch(sendInputText(name));
                dispatch(requestSearch(name))
            }
        }, 100);

    };
};
export const pushOneId = (id)=>({
    type:ActionTypes.POST_PUSH_LIST_ID,
    payload:{id}
})
export const UserNameNull = () => ({
    type: ActionTypes.HEADER_USER_NAME_NULL,
});