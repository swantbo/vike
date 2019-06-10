import {createStore,combineReducers} from "redux";
import {aboutMeReducer} from './aboutme';
import {dynamicReducer} from './dynamic';
import {headerReducer} from './header';
import {homeReducer} from './home';
import {postReducer} from './post';
import {searchReducer} from './post';
import {sendPostReducer} from './sendpost';
import {footerReducer} from './footer';

export default createStore(combineReducers({aboutMeReducer,dynamicReducer,headerReducer,homeReducer,postReducer,searchReducer,sendPostReducer,footerReducer}));