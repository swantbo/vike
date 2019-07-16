import * as ActionTypes from './ActionTypes.js';

const aboutMe = {
    requesting: false,
    dataState:0,
    loginUserInfo:{

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