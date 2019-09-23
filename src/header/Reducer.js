import * as ActionTypes from './ActionTypes.js';

const header = {
    name: '',
    isShowOptions:true,
    list:[]
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
        case ActionTypes.POST_REQUEST_ID:{
            return state
        }
        case ActionTypes.POST_REQUEST_ID_SUCCESS:{
            const {list} = action.payload;
            let temp = [...list];
            for (let j of list){
                if (state.list.findIndex((i)=>i===j)>-1){
                    temp.splice(temp.findIndex((i)=>i===j),1)
                }
            }
            return {
                ...state,
                list:state.list.concat(temp)
            }
        }
        case ActionTypes.POST_REQUEST_ID_FAILURE:{
            return state
        }
        default:{
            return state;
        }
    }
}