import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Link, withRouter} from "react-router-dom";
import {view as Footer} from './footer'
import {view as Header} from './header'
import {view as AboutMe} from './aboutme';
import {edit} from './aboutme';
import {view as Login} from './login';
import {Comment} from './post'
import {view as Home} from './home'
import SearchTest from './test/testsearch.js';
import {view as SendPost} from './sendpost';
import ResultTest from './test/result.js';
import {view as FloatInterface} from './floatInterface';
import {changeAvatar} from './aboutme';
import {requestLoginUserInfo} from './aboutme/Actions.js';
import Cookies from 'js-cookie';
import './App.css';

class App extends Component {
    constructor(){
        super(...arguments)
    }
    render() {
        if (window.location.pathname === '/aboutme') {
            this.props.requestLoginUserInfo(Cookies.get('u_id'))
        }
        let {avatarFloat,aboutMeFloat} = this.props;
        const temp = () => <h2>temp</h2>;
        return (
            <div className="App">
                <Header/>
                <switch className='switch'>
                    <Route exact path='/' component={Home}/>
                    <Route path='/comment/:paramName' component={Comment}/>
                    <Route path='/search' component={SearchTest}/>
                    <Route path='/result' component={ResultTest}/>
                    <Route path='/dynamic' component={temp}/>
                    <Route path='/aboutme' component={AboutMe}/>
                    <Route path='/edit' component={edit}/>
                    <Route path='/us' component={temp}/>
                    <Route path='/sendPost' component={SendPost}/>
                    <Route path='changePassword' component={temp}/>
                    <Route path='/privacy_and_security' component={temp}/>
                    <Route path='/help' component={temp}/>
                    <Route path='/changeAvatar' component={changeAvatar}/>
                    <Route path='/login' component={Login}/>
                </switch>
                <Footer/>
                {avatarFloat||aboutMeFloat?<FloatInterface/>:''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        avatarFloat:state.aboutMeReducer.avatarFloat,
        aboutMeFloat:state.aboutMeReducer.aboutMeFloat,
    }
};
const mapDispatchToProps =(dispatch)=>{
    return{
        requestLoginUserInfo:(name)=>{
            dispatch(requestLoginUserInfo(name))
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))