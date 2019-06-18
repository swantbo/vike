import * as ActionTypes from './ActionTypes.js';

const home = {
    '000001': {
        userId: 'xwvike',
        label: [],
        sendPostTime: 20190510151700,
        postText: '',
        postImgNum: 1,
        postImgUrl: [],
        postVideoNum: 0,
        postVideoUrl: [],
        like: [],
        Collection: [],
        comment: [
            {
                text: 'test', userId: 'xwvike', like: ['test', 'vike'], time: 201905101905, reply: [
                    {text: 'haha', userId: 'test', target: 'xwvike', time: 201905101906, like: ['bb', 'aa']},
                    {text: 'relay', userId: 'bob', target: 'test', time: 201905101907, like: []}
                ]
            }
        ]
    }
};

export default function (state = home, action) {
    switch (action.type) {
        default: {
            return state
        }
        case ActionTypes.POST_REQUEST_ALL_DATA_SUCCESS: {
            const {postId, data} = action.payload;
            return {
                ...state,
                [postId]: {...data}
            }
        }
        case ActionTypes.POST_LIKE: {
            const {postId, userId} = action.payload;
            return {
                ...state,
                postId: {...state[postId], like: [...state[postId].like, userId]}
            }
        }
        case ActionTypes.POST_LIKE_FAILURE: {
            const {postId, userId} = action.payload;
            return {

                ...state,
                postId: {
                    ...state[postId], like: state[postId].like.filter((item) => {
                        return item !== userId
                    })
                }
            }
        }
        case ActionTypes.POST_COLLECTION: {
            const {postId, userId} = action.payload;
            return {
                ...state,
                postId: {...state[postId], Collection: [...state[postId].Collection, userId]}
            }
        }
        case ActionTypes.POST_COLLECTION_FAILURE:{
            const {postId, userId} = action.payload;
            return {
                ...state,
                postId: {...state[postId], Collection: state[postId].Collection.filter((item) => {
                        return item !== userId
                    })}
            }
        }
    }
}