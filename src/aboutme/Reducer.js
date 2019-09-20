import * as ActionTypes from './ActionTypes.js';
import {myPost} from "./Actions";

const aboutMe = {
    requesting: false,
    dataState: 0,
    updateState: 0,
    loginUserInfo: {},
    otherUserInfo: {},
    avatarFloatTitle: '更改头像',
    avatarFloatText: ['上传头像', '移除当前头像', '取消'],
    aboutMeFloatTitle: '',
    aboutMeFloatText: ['举报', '拉黑', '取消'],
    tempImage: '',
    friends:{},
    myPost: {},
    myColl: {},
    err: {},
    help:{},
    changePasswordStatus: {status:0}

};

export default function (state = aboutMe, action) {
    switch (action.type) {
        default: {
            return state
        }
        case ActionTypes.CHANGE_UPDATE_STATE:{
            return {
                ...state,
                updateState: 0
            }
        }
        case ActionTypes.SAVE_IMG: {
            const {img} = action.payload;
            return {
                ...state,
                tempImage: img

            }
        }
        //请求多用户信息
        case ActionTypes.REQUEST_MANY_USER_INFO:{
            return state
        }
        case ActionTypes.REQUEST_MANY_USER_INFO_SUCCESS:{
            const {data}= action.payload.data;
            return {
                ...state,
                friends: {...data}
            }
        }
        //更改密码
        case ActionTypes.CHANGE_PASSWORD: {
            return {
                ...state,
                changePasswordStatus: {status: 1}
            }
        }
        case ActionTypes.CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                changePasswordStatus: {status: 200}
            }
        }
        case ActionTypes.CHANGE_PASSWORD_FAILURE:{
            const {status} = action.payload;
            return {
                ...state,
                changePasswordStatus: {status: status}
            }
        }
        //请求个人帖子图片
        case ActionTypes.ABOUT_ME_MY_POST: {
            return {
                ...state,
            }
        }
        case ActionTypes.ABOUT_ME_MY_POST_SUCCESS: {
            const {data, id} = action.payload;
            if (id) {
                return {
                    ...state,
                    myPost: {...data.data},
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
        //关注用户
        case ActionTypes.ABOUT_ME_FOLLOW: {
            return state
        }
        case ActionTypes.ABOUT_ME_FOLLOW_SUCCESS: {
            const {userId, followId, data} = action.payload;
            if (data.msg === 'add') {
                return {
                    ...state,
                    otherUserInfo: {...state.otherUserInfo, myFens: [...state.otherUserInfo.myFens, userId]}
                }
            } else {
                return {
                    ...state,
                    otherUserInfo: {
                        ...state.otherUserInfo,
                        myFens: state.otherUserInfo.myFens.filter((i) => i !== userId)
                    }
                }
            }

        }
        //请求其他用户数据
        case ActionTypes.ABOUT_ME_REQUEST_OTHER_USER_INFO: {
            return {
                ...state,
                requesting: true,
                dataState: 0,
                myPost: {},
                myColl: {}
            }
        }
        case ActionTypes.ABOUT_ME_REQUEST_OTHER_USER_INFO_SUCCESS: {
            const {data} = action.payload.data;
            return {
                ...state,
                otherUserInfo: {...data},
                requesting: false,
                dataState: 1
            }
        }
        case ActionTypes.ABOUT_ME_REQUEST_OTHER_USER_INFO_FAILURE: {
            return {
                ...state,
                requesting: false,
                dataState: -1
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
            const {data,status} = action.payload.data;
            return {
                ...state,
                loginUserInfo: {...data},
                updateState: status
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