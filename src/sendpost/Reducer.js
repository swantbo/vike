import * as ActionTypes from './ActionTypes.js';

const sendPost = {
    text:'',
    label:[],
    img:'',
    message:'',
    sendStatus:0,
};

export default function (state = sendPost, action) {
    switch (action.type) {
        default:{
            return state;
        }
        case ActionTypes.SEND_POST:{
            return {
                ...state,
                sendStatus:0
            }
        }
        case ActionTypes.CHANGE_STATUS:{
            return {
                ...state,
                sendStatus:1
            }
        }
        case ActionTypes.CHANGE_TEXT:{
            const {text} = action.payload;
            return {
                ...state,
                text:text
            }
        }
        case ActionTypes.ADD_LABEL:{
            const {label} = action.payload;
            return {
                ...state,
                label:[...state.label,label]
            }
        }
        case ActionTypes.DATA_CLEAR:{
            return {
                ...state,
                text:'',
                label:[],
                img:'',
                sendStatus:0,
                message:''
            }
        }
        case ActionTypes.SEND_POST_SUCCESS:{
            return state
        }
        case ActionTypes.SEND_POST_FAILURE:{
            return state
        }
        case ActionTypes.UPDATE_IMG:{
            const {img} = action.payload;
            return {
                ...state,
                img:img
            }
        }
    }
}