import * as ActionTypes from './ActionTypes.js';

const home = {};

export default function (state = home, action) {
    switch (action.type) {
        default: {
            return state
        }
        //请求帖子数据
        case ActionTypes.POST_REQUEST_ALL_DATA_SUCCESS: {
           let  {postId, data} = action.payload;
            data = data[0];

            return {
                ...state,
                [postId]: {...data}
            }
        }
        //点赞帖子
        case ActionTypes.POST_LIKE: {
            const {postId, userId} = action.payload;
            if (state[postId].likeUser.find((item) => item === userId) === userId) {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], likeUser: state[postId].likeUser.filter((item) => {
                            return item !== userId
                        })
                    }
                }
            } else {
                return {
                    ...state,
                    [postId]: {...state[postId], likeUser: [...state[postId].likeUser, userId]}
                }
            }
        }
        case ActionTypes.POST_LIKE_FAILURE: {
            const {postId, userId} = action.payload;
            if (state[postId].likeUser.find((item) => item === userId) === userId) {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], likeUser: state[postId].likeUser.filter((item) => {
                            return item !== userId
                        })
                    }
                }
            } else {
                return {
                    ...state,
                    [postId]: {...state[postId], likeUser: [...state[postId].likeUser, userId]}
                }
            }

        }
        //收藏帖子
        case ActionTypes.POST_COLLECTION: {
            const {postId, userId} = action.payload;
            if (state[postId].CollectionUser.find((item) => item === userId) === userId) {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], CollectionUser: state[postId].CollectionUser.filter((item) => {
                            return item !== userId
                        })
                    }
                }
            } else {
                return {
                    ...state,
                    [postId]: {...state[postId], CollectionUser: [...state[postId].CollectionUser, userId]}
                }
            }
        }
        case ActionTypes.POST_COLLECTION_FAILURE: {
            const {postId, userId} = action.payload;
            if (state[postId].CollectionUser.find((item) => item === userId) === userId) {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], CollectionUser: state[postId].CollectionUser.filter((item) => {
                            return item !== userId
                        })
                    }
                }
            } else {
                return {
                    ...state,
                    [postId]: {...state[postId], CollectionUser: [...state[postId].CollectionUser, userId]}
                }
            }
        }
        case ActionTypes.POST_INPUT_COMMENT_SUCCESS: {
            const {postId, data} = action.payload;
            return {
                ...state,
                [postId]: {...state[postId],comment:[...data]}
            }
        }
        case ActionTypes.POST_INPUT_COMMENT_FAILURE: {
            return state
        }

        case ActionTypes.POST_LIKE_COMMENT: {
            const {postId, commentId, userId} = action.payload;
            let comment = state[postId].comment;
            let index = state[postId].comment.findIndex(function (value) {
                return value.id===commentId
            });
            if ((comment.find((item) => item.id === commentId)).like.find((item) => item === userId) === userId) {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], comment:[...state[postId].comment,comment[index].like.splice(state[postId].comment[index].like.length-1,1)]
                    }
                }
            } else {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], comment: [...state[postId].comment,comment[index].like.push(userId)]
                    }
                }
            }
        }
        case ActionTypes.POST_LIKE_COMMENT_FAILURE:{
            const {postId, commentId, userId} = action.payload;
            let comment = state[postId].comment;
            let index = state[postId].comment.findIndex(function (value) {
                return value.id===commentId
            });
            if ((comment.find((item) => item.id === commentId)).like.find((item) => item === userId) === userId) {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], comment: [...state[postId].comment,comment[index].like.splice(state[postId].comment[index].like.length-1,1)]
                    }
                }
            } else {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], comment: [...state[postId].comment,comment[index].like.push(userId)]
                    }
                }
            }
        }
        case ActionTypes.POST_COMMENT_REPLY_SUCCESS: {
            const {postId, data} = action.payload;
            return {
                ...state,
                [postId]: {...state[postId],comment:[...data]}
            }
        }
        case ActionTypes.POST_COMMENT_REPLY_FAILURE: {
            return state
        }
    }
}