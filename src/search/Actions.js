import * as ActionTypes from './ActionTypes.js';
import fetch from "cross-fetch";
import Cookies from 'js-cookie';
import config from "../config";

const requestLabelIdStart = (labelName)=>({
        type:ActionTypes.SEARCH_REQUEST_LABEL_ID,
        payload:{labelName}

});
const requestLabelIdSuccess = (labelName,data)=>({
  type:ActionTypes.SEARCH_REQUEST_LABEL_ID_SUCCESS,
  payload:{labelName,data}
});
const requestLabelIdFailure=(data)=>({
    type:ActionTypes.SEARCH_REQUEST_LABEL_ID_FAILURE,
    payload:{data}
});

export const requestLabelId=(labelName,num)=>{
    return (dispatch)=>{
        dispatch(requestLabelIdStart(labelName));
        return fetch(`${config.url}getLabelId?tempId=${Cookies.get('temp_id')}&label=${labelName}&s=${num}`).then(res=>res.json()).then(
            json=>{dispatch(requestLabelIdSuccess(labelName,json))}).catch(err=>{dispatch(requestLabelIdFailure(err))})
    }
};
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
};
export const  changeSearchText = (text)=>({
    type:ActionTypes.SEARCH_CHANGE_TEXT,
    payload:{text:text}
});
export const clearSearchResults = ()=>({
    type:ActionTypes.SEARCH_CLEAR_SEARCH_RESULTS
});