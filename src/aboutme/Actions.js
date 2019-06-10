import * as ActionTypes from './ActionTypes.js';

export const changeUserName = (name)=>({
    type:ActionTypes.ABOUTME_CHANGE_USER_NAME,
    payload:{userName:name}
});
export const changeUserId = (id)=>({
    type:ActionTypes.ABOUTME_CHANGE_USER_ID,
    payload: {userId:id}
});
export const changeEmail = (email)=>({
    type:ActionTypes.ABOUTME_CHANGE_USER_EMAIL,
    payload:{email:email}
});
export const changeIntroduction = (text)=>({
    type:ActionTypes.ABOUTME_CHANGE_USER_INTRODUCTION,
    payload:{Introduction:text}
});
export const changeWebsite = (website) =>({
    type:ActionTypes.ABOUTME_CHANGE_USER_WEBSITE,
    payload:{website:website}
});
export const changeGender = (num) =>({
    type:ActionTypes.ABOUTME_CHANGE_USER_GENDER,
    payload:{gender:num}
});
export const changeIsActive = (boolean) =>({
    type:ActionTypes.ABOUTME_CHANGE_USER_ACTION,
    payload:{isActive:boolean}
});
export const changeIsRecommend = (boolean) =>({
    type:ActionTypes.ABOUTME_CHANGE_USER_RECOMMEND,
    payload:{isRecommend:boolean}
});
export const changeIsPrivate = (boolean)=>({
    type:ActionTypes.ABOUTME_CHANGE_USER_PRIVATE,
    payload:{isPrivate:boolean}
});
export const changeFloatInterFaceShow = ()=>({
    type:ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_SHOW
});
export const changeFloatInterFaceClose = ()=>({
    type:ActionTypes.ABOUTME_CHANGE_FLOATINTERFACE_CLOSE
});