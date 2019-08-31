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
import {view as Search} from './search';
import {view as SendPost} from './sendpost';
import ResultTest from './test/result.js';
import {view as FloatInterface} from './floatInterface';
import {changeAvatar} from './aboutme';
import {requestLoginUserInfo} from './aboutme/Actions.js';
import Cookies from 'js-cookie';
import './App.css';
import {myPost} from "./aboutme/Actions";
//
// function reqUserData(that,userId){
//     return new Promise(resolve => {
//         that.props.requestLoginUserInfo(userId);
//         let temp = setInterval(()=>{
//             if (that.props.posts!==undefined){
//                 resolve(that.props.posts);
//                 clearInterval(temp)
//             }
//         },200)
//     })
// }
// async function requestData(that,userId, arr, id) {
//     let temp = await reqUserData(that,userId);
//     that.props.myPost(temp,null,id)
// }


class App extends Component {
    constructor(){
        super(...arguments)
    }
    render() {
        if (Cookies.get('temp_id')===undefined){
            Cookies.set('temp_id',(Math.random()*100000000).toString(32).substr(0,4)+new Date().getTime())
        }
        if (window.location.pathname === '/aboutme') {
            this.props.requestLoginUserInfo(Cookies.get('u_id'))
            // requestData(this,Cookies.get('u_id'),this.props.posts,true)
        }
        let {avatarFloat,aboutMeFloat} = this.props;
        const temp = () => <h2>temp</h2>;
        return (
            <div className="App">
                <Header/>
                <switch className='switch'>
                    <Route exact path='/' component={Home}/>
                    <Route path='/comment/:paramName' component={Comment}/>
                    <Route path='/search' component={Search}/>
                    <Route path='/result' component={Search}/>
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
        // posts:  state.aboutMeReducer.loginUserInfo.posts
    }
};
const mapDispatchToProps =(dispatch)=>{
    return{
        requestLoginUserInfo:(name)=>{
            dispatch(requestLoginUserInfo(name))
        },
        // myPost:(arr,userId,id)=>{
        //     dispatch(myPost(arr,userId,id))
        // }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))