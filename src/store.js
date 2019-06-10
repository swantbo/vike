import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import {requestTest} from "./aboutme/Actions";
import {aboutMeReducer} from './aboutme';
import {dynamicReducer} from './dynamic';
import {headerReducer} from './header';
import {homeReducer} from './home';
import {postReducer} from './post';
import {searchReducer} from './post';
import {sendPostReducer} from './sendpost';
import {footerReducer} from './footer';

const store = createStore(combineReducers({
    aboutMeReducer,
    dynamicReducer,
    headerReducer,
    homeReducer,
    postReducer,
    searchReducer,
    sendPostReducer,
    footerReducer
}),applyMiddleware(thunkMiddleware));

store.dispatch(requestTest('vike')).then(() => console.log(store.getState()));

export default store;