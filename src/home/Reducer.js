import * as ActionTypes from './ActionTypes.js';

const home = {
    '000001': {
        postId: '000001',
        userId: 'xwvike',
        userAvatar: '26395177.jpeg',
        label: [],
        sendPostTime: 1559994444434,
        postText: '第一条帖子，编写组件。测试一下，长文字的显示情况。以及如何使用，更多这种显示方式。    ' +
            '另起一行。查看情况。',
        postImgNum: 1,
        postImgUrl: ['http://www.xwvike.com/old/sort/waterfll/img/2.jpg'],
        postVideoNum: 0,
        postVideoUrl: [],
        like: ['xwvike', 'tubkbk'],
        Collection: ['xwvike', 'tubkbk'],
        comment: [
            {
                id: '01',
                text: '👴😄🌶回复楼主,你这个图片真de垃圾啊。哈哈ahhaha.wock小黄人fdsafeu0fjiojajifduijojwiqfjidsnalfjnhiqwhn',
                userId: 'xwvike',
                like: ['test', 'vike'],
                time: 1559994444434,
                reply: [
                    {text: '垃圾垃圾垃圾看疯狂赛反动戳发就wjfijiijewofjsdaljflksadj', userId: 'tubkbk', reply: 'xwvike', time: 1559994444434},
                    {text: '揭开芬迪owkjfdsjiajfioe劳动纠纷戳ewjkldsjofiwe', userId: 'admin', reply: 'tubkbk', time: 1561114626703}
                ]
            },
            {
                id: '233',
                text: 'hello world',
                userId: 'TUBKBK',
                like: ['2', '54'],
                time: 1551984444434,
                reply:[]
            }
        ]
    }
};

export default function (state = home, action) {
    switch (action.type) {
        default: {
            return state
        }
        //请求帖子数据
        case ActionTypes.POST_REQUEST_ALL_DATA_SUCCESS: {
            const {postId, data} = action.payload;
            return {
                ...state,
                [postId]: {...data}
            }
        }
        //点赞帖子
        case ActionTypes.POST_LIKE: {
            const {postId, userId} = action.payload;
            if (state[postId].like.find((item) => item === userId) === userId) {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], like: state[postId].like.filter((item) => {
                            return item !== userId
                        })
                    }
                }
            } else {
                return {
                    ...state,
                    [postId]: {...state[postId], like: [...state[postId].like, userId]}
                }
            }
        }
        case ActionTypes.POST_LIKE_FAILURE: {
            const {postId, userId} = action.payload;
            if (state[postId].like.find((item) => item === userId) === userId) {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], like: state[postId].like.filter((item) => {
                            return item !== userId
                        })
                    }
                }
            } else {
                return {
                    ...state,
                    [postId]: {...state[postId], like: [...state[postId].like, userId]}
                }
            }

        }
        //收藏帖子
        case ActionTypes.POST_COLLECTION: {
            const {postId, userId} = action.payload;
            if (state[postId].Collection.find((item) => item === userId) === userId) {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], Collection: state[postId].Collection.filter((item) => {
                            return item !== userId
                        })
                    }
                }
            } else {
                return {
                    ...state,
                    [postId]: {...state[postId], Collection: [...state[postId].Collection, userId]}
                }
            }
        }
        case ActionTypes.POST_COLLECTION_FAILURE: {
            const {postId, userId} = action.payload;
            if (state[postId].Collection.find((item) => item === userId) === userId) {
                return {
                    ...state,
                    [postId]: {
                        ...state[postId], Collection: state[postId].Collection.filter((item) => {
                            return item !== userId
                        })
                    }
                }
            } else {
                return {
                    ...state,
                    [postId]: {...state[postId], Collection: [...state[postId].Collection, userId]}
                }
            }
        }
        case ActionTypes.POST_INPUT_COMMENT_SUCCESS: {
            const {postId, data} = action.payload;
            return {
                ...state,
                [postId]: {...data}
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
                [postId]: {...data}
            }
        }
        case ActionTypes.POST_COMMENT_REPLY_FAILURE: {
            return state
        }
    }
}