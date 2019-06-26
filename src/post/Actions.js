import * as ActionTypes from 'ActionTypes.js';
import fetch from "cross-fetch";
import config from '../config.js';

let myHeader = new Headers();
myHeader.append('Content-Type', 'application/json');

const inputCommentStart = (postId,text,userId) => ({
    type: ActionTypes.POST_INPUT_COMMENT,
    payload: {postId:postId,text:text,userId:userId}
});

const inputCommentSuccess = ()=>({
    type: ActionTypes.POST_INPUT_COMMENT_SUCCESS
});

const inputCommentFailure = ()=>({
    type:ActionTypes.POST_INPUT_COMMENT_FAILURE,
});

export const inputComment = (postId,text,userId)=>{
    return (dispatch)=>{
        dispatch(inputCommentStart(postId,text,userId));
        return fetch(`${config.url}`,{
            method:'POST',
            body:JSON.stringify({postId:postId,text:text,userId:userId}),
            header:myHeader
        }).then(data=>data==='ok'?dispatch(inputCommentSuccess()):dispatch(inputCommentFailure())).catch(
            error=>{
                dispatch(inputCommentFailure())
            }
        )
    }
};

const likeCommentStart = (postId,commentId,userId)=>({
    type:ActionTypes.POST_LIKE_COMMENT,
    payload:{postId:postId,commentId:commentId,userId:userId}
});
const likeCommentSuccess = ()=>({
    type:ActionTypes.POST_LIKE_COMMENT_SUCCESS
});
const likeCommentFailure = (postId,commentId,userId)=>({
    type:ActionTypes.POST_LIKE_COMMENT_FAILURE,
    payload:{postId:postId,commentId:commentId,userId:userId}
});

export const likeComment = (postId,commentId,userId)=> {
    return (dispatch) => {
        dispatch(likeCommentStart(postId,commentId,userId));
        return fetch(`${config.url}`,{
            method: 'POST',
            body:JSON.stringify({postId:postId,commentId:commentId,userId:userId}),
            header: myHeader
        }).then(data=>data==='ok'?dispatch(likeCommentSuccess()):dispatch(likeCommentFailure(postId,commentId,userId))).catch(
            error=>{dispatch(likeCommentFailure(postId,commentId,userId))}
        )
    }
};

