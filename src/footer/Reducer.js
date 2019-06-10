import * as ActionTypes from './ActionTypes.js';

const footer = {
    state: 0
};

export default function (state = footer, action) {
    switch (action.type) {
        case ActionTypes.FOOTER_HOME:{
            const {id} = action.payload;
            return{
                ...state,
                state:id
            }
        }
        case ActionTypes.FOOTER_SEARCH:{
            const {id} = action.payload;
            return{
                ...state,
                state:id
            }
        }
        case ActionTypes.FOOTER_SEND_POST:{
            const {id} = action.payload;
            return{
                ...state,
                state:id
            }
        }
        case ActionTypes.FOOTER_DYNAMIC:{
            const {id} = action.payload;
            return{
                ...state,
                state:id
            }
        }
        case ActionTypes.FOOTER_ABOUT_ME:{
            const {id} = action.payload;
            return{
                ...state,
                state:id
            }
        }
        default:{
            return state
        }
    }
}