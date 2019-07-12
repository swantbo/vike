import * as ActionTypes from './ActionTypes.js';

const login = {};
export default function (state = login, action) {
    switch (action.type) {
        default: {
            return state
        }
        case ActionTypes.LOGIN_START: {
            return {
                ...state,
                landing: true
            }
        }
        case ActionTypes.LOGIN_SUCCESS: {
            const {data, message} = action.payload.data;
            return {
                ...state,
                message: message,
                data: {...data},
                landing: false
            }
        }
        case ActionTypes.LOGIN_FAILURE: {
            const {message} = action.payload.data;
            return {
                ...state,
                message: message,
                landing: false
            }
        }
        case ActionTypes.SIGN_UP_START: {
            return {
                ...state,
                landing: true
            }
        }
        case ActionTypes.SIGN_UP_SUCCESS: {
            const {message} = action.payload.data;
            return {
                ...state,
                message: message,
                landing: false
            }
        }
        case ActionTypes.SING_UP_FAILURE: {
            const {message} = action.payload.data;
            return {
                ...state,
                message: message,
                landing: false
            }
        }
    }
}