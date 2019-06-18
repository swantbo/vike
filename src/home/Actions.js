import * as ActionTypes from './ActionTypes.js';
import fetch from 'cross-fetch';
import config from '../config.js';

let myHeader = new Headers();
myHeader.append('Content-Type', 'application/json');
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
const likeThisPost = (postId, userId) => ({
    type: ActionTypes.POST_LIKE,
    payload: {postId: postId, userId: userId}
});
const likeThisPostSuccess = () => ({
    type: ActionTypes.POST_LIKE_SUCCESS,
});
const likeThisPostFailure = () => ({
    type: ActionTypes.POST_LIKE_FAILURE,
});

export const likePost = (postId, userId) => {
    return (dispatch) => {
        dispatch(likeThisPost(postId, userId));
        return fetch(`${config.url}`, {
            method: 'POST',
            body: JSON.stringify({postId: postId, userId: userId}),
            header: myHeader
        }).then(data => data === 'ok' ? dispatch(likeThisPostSuccess()) : dispatch(likeThisPostFailure())).catch(
            error => dispatch(likeThisPostFailure())
        )
    }
};

const collectionThisPost = (postId, userId) => ({
    type: ActionTypes.POST_COLLECTION,
    payload: {postId: postId, userId: userId}
});
const collectionThisPostSuccess = () => ({
    type: ActionTypes.POST_COLLECTION_SUCCESS,
});
const collectionThisPostFailure = () => ({
    type: ActionTypes.POST_COLLECTION_FAILURE
});

export const collectionPost = (postId, userId) => {
    return (dispatch) => {
        dispatch(collectionThisPost(postId, userId));
        return fetch(`${config.url}`, {
            method: 'POST',
            body: JSON.stringify({postId: postId, userId: userId}),
            header: myHeader
        }).then(data => data === 'ok' ? dispatch(collectionThisPostSuccess()) : dispatch(collectionThisPostFailure())).catch(
            error => dispatch(collectionThisPostFailure())
        )
    }
};
export const ReFresh = () => ({
    type: ActionTypes.HOME_REFRESH
});