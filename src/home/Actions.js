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
        return fetch(`${config.url}getPost?postId=${postId}`, {method: 'GET'}).then(res =>
            res.json()
        ).then(
            json => {
                // console.log(json);
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
const likeThisPostFailure = (postId, userId) => ({
    type: ActionTypes.POST_LIKE_FAILURE,
    payload: {postId: postId, userId: userId}
});

export const likePost = (postId, userId) => {
    return (dispatch) => {
        dispatch(likeThisPost(postId, userId));
        return fetch(`${config.url}likePost`, {
            method: 'POST',
            body: JSON.stringify({postId: postId, userId: userId}),
            // header: myHeader
        }).then(data => data.json()).then(json => json.status === 'ok' ? dispatch(likeThisPostSuccess()) : dispatch(likeThisPostFailure(postId, userId))).catch(
            error => {
                dispatch(likeThisPostFailure(postId, userId))
            }
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
const collectionThisPostFailure = (postId, userId) => ({
    type: ActionTypes.POST_COLLECTION_FAILURE,
    payload: {postId: postId, userId: userId}
});

export const collectionPost = (postId, userId) => {
    return (dispatch) => {
        dispatch(collectionThisPost(postId, userId));
        return fetch(`${config.url}collectionPost`, {
            method: 'POST',
            body: JSON.stringify({postId: postId, userId: userId}),
            // header: myHeader
        }).then(data => data.json()).then(json => json.status === 'ok' ? dispatch(collectionThisPostSuccess()) : dispatch(collectionThisPostFailure(postId, userId))).catch(
            error => dispatch(collectionThisPostFailure(postId, userId))
        )
    }
};
export const ReFresh = () => ({
    type: ActionTypes.HOME_REFRESH
});

//输入评论
const inputCommentStart = () => ({
    type: ActionTypes.POST_INPUT_COMMENT
});

const inputCommentSuccess = (postId, data) => ({
    type: ActionTypes.POST_INPUT_COMMENT_SUCCESS,
    payload: {postId: postId, data: data}
});

const inputCommentFailure = () => ({
    type: ActionTypes.POST_INPUT_COMMENT_FAILURE,
});

export const inputComment = (postId, text, userId) => {
    return (dispatch) => {
        dispatch(inputCommentStart(postId, text, userId));
        return fetch(`${config.url}addComment`, {
            method: 'POST',
            body: JSON.stringify({postId: postId, text: text, userId: userId}),
            // header: myHeader
        }).then(data => data.json()).then(json => dispatch(inputCommentSuccess(postId, json))).catch(
            error => {
                dispatch(inputCommentFailure())
            }
        )
    }
};

const likeCommentStart = (postId, commentId, userId) => ({
    type: ActionTypes.POST_LIKE_COMMENT,
    payload: {postId: postId, commentId: commentId, userId: userId}
});
const likeCommentSuccess = () => ({
    type: ActionTypes.POST_LIKE_COMMENT_SUCCESS
});
const likeCommentFailure = (postId, commentId, userId) => ({
    type: ActionTypes.POST_LIKE_COMMENT_FAILURE,
    payload: {postId: postId, commentId: commentId, userId: userId}
});

export const likeComment = (postId, commentId, userId) => {
    return (dispatch) => {
        dispatch(likeCommentStart(postId, commentId, userId));
        return fetch(`${config.url}`, {
            method: 'POST',
            body: JSON.stringify({postId: postId, commentId: commentId, userId: userId}),
            // header: myHeader
        }).then(data => data === 'ok' ? dispatch(likeCommentSuccess()) : dispatch(likeCommentFailure(postId, commentId, userId))).catch(
            error => {
                dispatch(likeCommentFailure(postId, commentId, userId))
            }
        )
    }
};


const replyCommentStart = (postId, commentId, userId, replyId, text) => ({
    type: ActionTypes.POST_COMMENT_REPLY,
    payload: {postId: postId, commentId: commentId, userId: userId, replyId: replyId, text: text}
});
const replyCommentSuccess = (postId, data) => ({
    type: ActionTypes.POST_COMMENT_REPLY_SUCCESS,
    payload: {postId, data}
});
const replyCommentFailure = () => ({
    type: ActionTypes.POST_COMMENT_REPLY_FAILURE
});

export const replyComment = (postId, commentId, userId, replyId, text) => {
    return (dispatch) => {
        dispatch(replyCommentStart(postId, commentId, userId, replyId, text));
        return fetch(`${config.url}addReply`, {
            method: 'POST',
            body: JSON.stringify({postId: postId, commentId: commentId, userId: userId, replyId: replyId, text: text}),
            // header: myHeader
        }).then(data => data.json()).then(json => dispatch(replyCommentSuccess(postId, json))).catch(
            error => dispatch(replyCommentFailure())
        )
    }
};
