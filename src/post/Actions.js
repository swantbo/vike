import * as ActionTypes from './ActionTypes.js';
import fetch from 'cross-fetch';
import config from '../config.js';

const requestAllData = (postId) => ({
    type: ActionTypes.POST_REQUEST_ALL_DATA,
    payload: {postId: postId}
});
const requestAllDataSuccess = (postId, json) => ({
    type: ActionTypes.POST_REQUEST_ALL_DATA_SUCCESS,
    payload: {data: json, postId: postId}
});
const requestAllDataFailure = (postId) => ({
    type: ActionTypes.POST_REQUEST_ALL_DATA_FAILURE,
    payload: {postId: postId}
});

export const requestPost = (postId) => {
    return (dispatch) => {
        dispatch(requestAllData(postId));
        return fetch(`${config.url}postId=${postId}`, {method: 'GET'}).then(response => {
            response.json()
        }).then(
            json => {
                dispatch(requestAllDataSuccess(postId, json))
            }
        ).catch(dispatch(requestAllDataFailure(postId)))
    }
};

