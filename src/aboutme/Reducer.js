import * as ActionTypes from './ActionTypes.js';
import {myPost} from "./Actions";

const aboutMe = {
    requesting: false,
    dataState: 0,
    updateState: 0,
    loginUserInfo: {},
    avatarFloatTitle: '更改头像',
    avatarFloatText: ['上传头像', '移除当前头像', '取消'],
    aboutMeFloatTitle: '',
    aboutMeFloatText: ['举报', '拉黑', '取消'],
    tempImage: '',
    myPost: {},
    myColl: {}

};

export default function (state = aboutMe, action) {
    switch (action.type) {
        default: {
            return state
        }
        case ActionTypes.SAVE_IMG: {
            const {img} = action.payload;
            return {
                ...state,
                tempImage: img

            }
        }
        //请求个人帖子图片
        case ActionTypes.ABOUT_ME_MY_POST: {
            return state
        }
        case ActionTypes.ABOUT_ME_MY_POST_SUCCESS: {
            const {data, id} = action.payload;
            if (id) {
                return {
                    ...state,
                    myPost: {...data.data}
                }
            } else {
                return {
                    ...state,
                    myColl: {...data.data}
                }
            }
        }
        //请求用户数据
        case ActionTypes.LOGIN_GET_REQUEST: {
            return {
                ...state,
                requesting: true,
                dataState: 0
            }
        }
        case ActionTypes.LOGIN_GET_FAILURE: {
            return {
                ...state,
                requesting: false,
                dataState: -1
            }
        }
        case ActionTypes.LOGIN_GET_SUCCESS: {
            const {data} = action.payload;
            return {
                ...state,
                loginUserInfo: {...data},
                requesting: false,
                dataState: 1
            }
        }
        //上传头像
        case ActionTypes.UPDATE_USER_AVATAR: {
            return state
        }
        case ActionTypes.UPDATE_USER_AVATAR_SUCCESS: {
            const {data} = action.payload.data;
            return {
                ...state,
                loginUserInfo: {...data},

            }
        }
        //更新用户数据
        case ActionTypes.UPDATE_USER_INFO: {
            return {
                ...state,
                updateState: 0
            }
        }
        case ActionTypes.UPDATE_USER_INFO_SUCCESS: {
            const {data} = action.payload.data;
            return {
                ...state,
                loginUserInfo: {...data},
                updateState: 1
            }
        }
        case ActionTypes.UPDATE_USER_INFO_FAILURE: {
            return {
                ...state,
                updateState: -1
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