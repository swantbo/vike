import {createStore, combineReducers, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import {aboutMeReducer} from './aboutme';
import {loginReducer} from './login'
import {dynamicReducer} from './dynamic';
// import {imageCropReducer} from './imageCrop'
import {headerReducer} from './header';
import {homeReducer} from './home';
// import {postReducer} from './post';
// import {searchReducer} from './post';
import {sendPostReducer} from './sendpost';
import {footerReducer} from './footer';

const store = createStore(combineReducers({
    aboutMeReducer,
    dynamicReducer,
    headerReducer,
    homeReducer,
    loginReducer,
    sendPostReducer,
    footerReducer,
    // imageCropReducer
}),applyMiddleware(thunkMiddleware));

export default store;