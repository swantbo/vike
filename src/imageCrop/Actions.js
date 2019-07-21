import * as ActionTypes from './ActionTypes.js';

export const addFiles = (file)=>({
    type:ActionTypes.ADD_FILES,
    payload:{file:file}
})