import * as ActionTypes from './ActionTypes.js';

export default function (state = {}, action) {
    switch (action.type) {
        default:{
            return state
        }
        case ActionTypes.ADD_FILES:{
            const {file} = action.payload;
            return {
                ...state,
                img:file
            }
        }
    }
}