import * as ActionTypes from './ActionTypes.js';

const header = {
    name: '',
    isShowOptions:true,
};

export default function (state = header, action) {
    switch (action.type) {
        case ActionTypes.HEADER_OPTIONS: {
            let temp = state.isShowOptions;
            return {
                ...state,
                isShowOptions: !temp
            }
        }
        case ActionTypes.HEADER_BACK_TOP: {
            return {
                ...state,
                scrollTop: 0
            }
        }
        case ActionTypes.HEADER_SEND_USER_NAME:{
            const {name} = action.payload;
            return{
                ...state,
                name:name
            }
        }
        case ActionTypes.HEADER_USER_NAME_NULL:{
            return{
                ...state,
                name:''
            }
        }
        default:{
            return state;
        }
    }
}