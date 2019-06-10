import * as ActionTypes from './ActionTypes.js';

export const ChangeOptions = () => ({
    type: ActionTypes.HEADER_OPTIONS
});
export const BackTop = () => ({
    type: ActionTypes.HEADER_BACK_TOP
});
export const SendUserName = (name) => ({
    type: ActionTypes.HEADER_SEND_USER_NAME,
    payload: {name: name}
});
export const UserNameNull = ()=>({
    type:ActionTypes.HEADER_USER_NAME_NULL,
});