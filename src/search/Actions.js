import * as ActionTypes from './ActionTypes.js';
import fetch from "cross-fetch";
import config from "../config";

const requestLabelStart = (num) => ({
    type: ActionTypes.SEARCH_REQUEST_LABEL,
    payload: {num: num}
});
const requestLabelSuccess = (data) => ({
    type: ActionTypes.SEARCH_REQUEST_LABEL_SUCCESS,
    payload: {data: data}
});
const requestLabelFailure = () => ({
    type: ActionTypes.SEARCH_REQUEST_LABEL_FAILURE
});
export const requestLabel = (tempId,num) => {
    return (dispatch) => {
        dispatch(requestLabelStart());
        return fetch(`${config.url}getLabel?num=${num}&tempId=${tempId}`, {method: 'GET'}).then(res =>
            res.json()).then(json => {
                console.log(json)
            dispatch(requestLabelSuccess(json))
        }).catch(dispatch(requestLabelFailure()))
    }
};

const requestSearchStart = () => ({
    type: ActionTypes.SEARCH_REQUEST_TEXT
});
const requestSearchSuccess = (data) => ({
    type: ActionTypes.SEARCH_REQUEST_TEXT_SUCCESS,
    payload: {data: data}
});
const requestSearchFailure = () => ({
    type: ActionTypes.SEARCH_REQUEST_TEXT_FAILURE
});

export const requestSearch = (text) => {
    return (dispatch) => {
        dispatch(requestSearchStart());
        return fetch(`${config.url}search?text=${text}`,{method: 'GET'}).then(res=>res.json()).then(json=>{
            dispatch(requestSearchSuccess(json))
        }).catch(dispatch(requestSearchFailure()))

    }
}