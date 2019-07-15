import * as ActionTypes from './ActionTypes.js';

const aboutMe = {
    requesting: false,
    dataState:1,
    loginUserInfo:{
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
    },
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
        case ActionTypes.LOGIN_GET_REQUEST: {
            return {
                ...state,
                requesting: true,
                dataState:0
            }
        }
        case ActionTypes.LOGIN_GET_FAILURE: {
            return {
                ...state,
                requesting:false,
                dataState:-1
            }
        }
        case ActionTypes.LOGIN_GET_SUCCESS: {
            const {data} = action.payload;
            return {
                ...state,
                loginUserInfo:{...data},
                requesting:false,
                dataState:1
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