import * as ActionTypes from './ActionTypes.js';

const home = {
    '000001': {
        postId:'000001',
        userId: 'xwvike',
        userAvatar:'26395177.jpeg',
        label: [],
        sendPostTime: 20190510151700,
        postText: '第一条帖子，编写组件。测试一下，长文字的显示情况。以及如何使用，更多这种显示方式。    '+
            '另起一行。查看情况。',
        postImgNum: 1,
        postImgUrl: ['http://www.xwvike.com/old/sort/waterfll/img/2.jpg'],
        postVideoNum: 0,
        postVideoUrl: [],
        like: ['xwvike', 'tubkbk'],
        Collection: ['xwvike', 'tubkbk'],
        comment: [
            {id:'01',text: '回复楼主,你这个图片真的垃圾透顶，你看不出来么？👴😄🌶回复楼主,你这个图片真的垃圾透顶，你看不出来么？👴😄🌶', userId: 'xwvike', like: ['test', 'vike'], time: 1559994444434,reply:[
                    {text: '回复xwvike', userId: 'tubkbk',reply: 'xwvike', like: [ 'vike'], time: 1559994444434},
                    {text: '回复tubkbk', userId: 'admin',reply:'tubkbk', like: ['test'], time: 1561114626703}
                ]},
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
        case ActionTypes.POST_COLLECTION_FAILURE: {
            const {postId, userId} = action.payload;
            return {
                ...state,
                postId: {
                    ...state[postId], Collection: state[postId].Collection.filter((item) => {
                        return item !== userId
                    })
                }
            }
        }
    }
}