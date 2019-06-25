import * as ActionTypes from './ActionTypes.js';

const aboutMe = {
    requesting: false,
    userName: 'vike',
    userId: 'xwvike',
    email: 'xwvike@gmail.com',
    avatar: '26395177.jpeg',
    Introduction: 'coding……💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾',
    website: 'www.xwvike.com',
    gender: 1,
    addTime: '20190217',
    myPost: ['1', '2'],
    myFens: ['admin'],
    myFriends: ['admin'],
    myCollection: ['3', '4'],
    isActive: true,
    isRecommend: true,
    isPrivate: false,
    avatarFloat: false,
    aboutMeFloat: false,
    avatarFloatTitle: '更改头像',
    avatarFloatText: ['上传头像', '移除当前头像', '取消'],
    aboutMeFloatTitle: '',
    aboutMeFloatText: ['举报', '拉黑', '取消']

};

export default function (state = aboutMe, action) {
    switch (action.type) {
        default: {
            return state
        }
        case ActionTypes.FETCH_GET_REQUEST: {
            return {
                ...state,
                requesting: true
            }
        }
        case ActionTypes.FETCH_GET_FAILURE: {
            return {
                ...state,
                userName: '信息请求失败'
            }
        }
        case ActionTypes.FETCH_GET_SUCCESS: {
            const {name} = action.payload;
            return {
                ...state,
                userName: name
            }
        }
        case ActionTypes.ABOUTME_CHANGE_USER_NAME: {
            const {name} = action.payload;
            return {
                ...state,
                userName: name
            }
        }
        case ActionTypes.ABOUTME_CHANGE_USER_ID: {
            const {id} = action.payload;
            return {
                ...state,
                userId: id
            }
        }
        case ActionTypes.ABOUTME_CHANGE_USER_EMAIL: {
            const {email} = action.payload;
            return {
                ...state,
                email: email
            }
        }
        case ActionTypes.ABOUTME_CHANGE_USER_INTRODUCTION: {
            const {text} = action.payload;
            return {
                ...state,
                Introduction: text
            }
        }
        case ActionTypes.ABOUTME_CHANGE_USER_WEBSITE: {
            const {website} = action.payload;
            return {
                ...state,
                website: website
            }
        }
        case ActionTypes.ABOUTME_CHANGE_USER_GENDER: {
            const {num} = action.payload;
            return {
                ...state,
                gender: num
            }
        }
        case ActionTypes.ABOUTME_CHANGE_USER_ACTION: {
            const {boolean} = action.payload;
            return {
                ...state,
                isActive: boolean
            }
        }
        case ActionTypes.ABOUTME_CHANGE_USER_RECOMMEND: {
            const {boolean} = action.payload;
            return {
                ...state,
                isRecommend: boolean
            }
        }
        case ActionTypes.ABOUTME_CHANGE_USER_PRIVATE: {
            const {boolean} = action.payload;
            return {
                ...state,
                isPrivate: boolean
            }
        }
        case ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_SHOW: {
            return {
                ...state,
                avatarFloat: true
            }
        }
        case ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_CLOSE: {
            return {
                ...state,
                avatarFloat: false
            }
        }
    }

}