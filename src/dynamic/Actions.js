import * as ActionTypes from './ActionTypes.js';
import fetch from "cross-fetch";
import config from "../config";

const requestDynamicState = (userId) => ({
    type: ActionTypes.DYNAMIC_REQUEST_DYNAMIC
});
const requestDynamicSuccess = (data) => ({
    type: ActionTypes.DYNAMIC_REQUEST_DYNAMIC_SUCCESS,
    payload: {data: data}
});
const requestDynamicFailure = (err) => ({
    type: ActionTypes.DYNAMIC_REQUEST_DYNAMIC_FAILURE,
    payload: {err: err}
});

export const requestDynamic = (userId) => {
    return dispatch => {
        dispatch(requestDynamicState());
        return fetch(`${config.url}getDynamic?userId=${userId}`, {method: 'GET'}).then(
            res => res.json()
        ).then(json => dispatch(requestDynamicSuccess(json))).catch(err => dispatch(requestDynamicFailure(err)))
    }
};


const changeDynamicState = (dynamicId) => ({
    type: ActionTypes.DYNAMIC_CHANGE_STATUS
});
const changeDynamicSuccess = () => ({
    type: ActionTypes.DYNAMIC_CHANGE_STATUS_SUCCESS
});
const changeDynamicFailure = () => ({
    type: ActionTypes.DYNAMIC_CHANGE_STATUS_FAILURE
});

export const changeDynamic = (dynamicId) => {
    return dispatch => {
        dispatch(changeDynamicState(dynamicId));
        return fetch(`${config.url}changeDynamic`, {
            method: 'POST',
            body: JSON.stringify({dynamicId:dynamicId})}).then(res=>res.json()).then(
                json=>dispatch(changeDynamicSuccess(dynamicId))).catch(
                    err=>dispatch(changeDynamicFailure())
        )
    }
};
