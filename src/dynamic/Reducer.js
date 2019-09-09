import * as ActionTypes from './ActionTypes.js';

const dynamic = {};

export default function (state = dynamic, action) {
    switch (action.type) {
        default: {
            return state;
        }
        case ActionTypes.DYNAMIC_REQUEST_DYNAMIC: {
            return {
                ...state,
                status:0
            }
        }
        case ActionTypes.DYNAMIC_REQUEST_DYNAMIC_SUCCESS:{
            const {data} = action.payload;
            return {
                ...state,
                status: 1,
                ...data
            }
        }
        case ActionTypes.DYNAMIC_REQUEST_DYNAMIC_FAILURE:{
            const{data}=action.payload;
            return {
                ...state,
                status: -1,
                err:data
            }
        }
        case ActionTypes.DYNAMIC_CHANGE_STATUS:{
            return {
                ...state,
                changing:0
            }
        }
        case ActionTypes.DYNAMIC_CHANGE_STATUS_SUCCESS:{
            const {dynamicId}=action.payload;
            return {
                ...state,
                changing:1,
                [dynamicId]:{...state[dynamicId],status:true}
            }
        }
        case ActionTypes.DYNAMIC_CHANGE_STATUS_FAILURE:{
            return {
                ...state,
                changing: -1
            }
        }
    }
}