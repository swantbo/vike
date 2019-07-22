import * as ActionTypes from './ActionTypes.js';

const sendPost = {
    post:{},
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