import * as ActionTypes from './ActionTypes.js';
import fetch from 'cross-fetch';
import Cookies from 'js-cookie';
import config from '../config.js';
import md5 from 'md5';

const loginStart = () => ({
    type: ActionTypes.LOGIN_START
});
const loginSuccess = (data) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: {data: data}
});
const loginFailure = () => ({
    type: ActionTypes.LOGIN_FAILURE
});

export const login = (userId, password) => {
    return dispatch => {
        dispatch(loginStart());
        fetch(`${config.url}login`, {
            method: 'POST',
            body: JSON.stringify({userId: userId, password: md5(password)}),
        }).then(
            res => res.json()).then(
                json =>{ dispatch(loginSuccess(json));
                if (json.status===200){
                    console.log(1);
                    Cookies.set('u_id', userId);
                    window.location.pathname = '/';
                }
                }).catch(
                    error => dispatch(loginFailure()))

    }
};
const signUpStart = ()=>({
    type:ActionTypes.SIGN_UP_START
});
const singUpSuccess = (data)=>({
    type:ActionTypes.SIGN_UP_SUCCESS,
    payload:{data:data}
});
const singUpFailure =()=>({
    type:ActionTypes.SING_UP_FAILURE
});
export const signUp = (userId,password)=>{
    return dispatch=>{
        dispatch(signUpStart());
        fetch(`${config.url}signUp`,{
            method:'POST',
            body:JSON.stringify({userId:userId,password:md5(password)})
        }).then(res=>res.json()).then(json=>dispatch(singUpSuccess(json))).catch(dispatch(singUpFailure()))
    }
};
