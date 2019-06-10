import * as ActionTypes from './ActionTypes.js';

export const Home = () => ({
    type: ActionTypes.FOOTER_HOME,
    payload: {id: 0}
});
export const Search = () => ({
    type: ActionTypes.FOOTER_SEARCH,
    payload: {id: 1}
});
export const SendPost = () => ({
    type: ActionTypes.FOOTER_SEND_POST,
    payload: {id: 2}
});
export const Dynamic = () => ({
    type: ActionTypes.FOOTER_DYNAMIC,
    payload: {id: 3}
});
export const AboutMe = () => ({
    type: ActionTypes.FOOTER_ABOUT_ME,
    payload: {id: 4}
});