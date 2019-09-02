import * as ActionTypes from './ActionTypes.js';

const search = {
    num:0,
    label:{},
    status:0,
    searchResults:[],
    text:''
};

export default  function (state = search, action) {
    switch (action.type) {
        default:{
            return state
        }
        case ActionTypes.SEARCH_REQUEST_LABEL:{
            return {
                ...state,
                status: 0
            }
        }
        case ActionTypes.SEARCH_CHANGE_TEXT:{
            const {text} = action.payload;
            return {
                ...state,
                text:text
            }
        }
        case ActionTypes.SEARCH_CLEAR_SEARCH_RESULTS:{
            return {
                ...state,
                searchResults:[]
            }
        }
        case ActionTypes.SEARCH_REQUEST_LABEL_SUCCESS:{
            const {data} = action.payload;
            return {
                ...state,
                label: data.data,
                status: 1,
                num:1
            }
        }
        case ActionTypes.SEARCH_REQUEST_LABEL_FAILURE:{
            return {
                ...state,
                status: 0
            }
        }

        case ActionTypes.SEARCH_REQUEST_TEXT:{
            return state
        }
        case ActionTypes.SEARCH_REQUEST_TEXT_SUCCESS:{
            const {data} = action.payload;
            return {
                ...state,
                searchResults: [...data]
            }
        }
        case ActionTypes.SEARCH_REQUEST_TEXT_FAILURE:{
            return  state
        }
    }
}