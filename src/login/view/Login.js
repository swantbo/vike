import React, {Component} from 'react';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {Link, withRouter, Route} from "react-router-dom";
import fetch from 'cross-fetch';
import {md5} from 'md5';
import config from '../../config.js';
import {login, signUp} from "../Actions";
import './login.css';

class Login extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            temp: 1,
            type: 1,
            userName: '',
            password: '',
            passwordTwo: '',
            message: ''
        };
        this.changeType = this.changeType.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePasswordTwo = this.changePasswordTwo.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeTemp = this.changeTemp.bind(this);
    }

    changeType() {
        this.setState({type: this.state.type * -1})
    }

    changeName(e) {
        this.setState({userName: e})
    }

    changePassword(e) {
        this.setState({password: e})
    }

    changePasswordTwo(e) {
        this.setState({passwordTwo: e})
    }

    changeTemp() {
        this.setState({temp: this.state.temp * -1})
    }

    render() {
        let login = <div className='login'>
            <div className='login-logo'>
                <img alt='logo' src={require('../../image/vike@0,1x.png')}/>
            </div>
            <div className='login-input'>
                <label className='input-name'>
                    <span>账号或邮箱</span>
                    <input onChange={(e) => this.changeName(e.target.value)} value={this.state.userName} type='text'
                           size='16'/>
                </label>
                <label className='input-password'>
                    <span>密码</span>
                    <input onChange={(e) => this.changePassword(e.target.value)} value={this.state.password}
                           type={this.state.type === 1 ? 'password' : 'text'}
                           autoComplete='new-password,current-password' required/>
                    {this.state.temp === 1 ?
                        <div style={this.state.password === '' ? {display: 'none'} : {display: 'block'}}
                             onClick={this.changeType}>{this.state.type === 1 ? '显示' : '隐藏'}</div> : ''}
                </label>
                <label style={this.state.temp === 1 ? {display: 'none'} : {display: 'block'}}
                       className='input-password-again'>
                    <span>再次输入密码</span>
                    <input onChange={(e) => this.changePasswordTwo(e.target.value)} value={this.state.passwordTwo}
                           type={this.state.type === 1 ? 'password' : 'text'}
                           autoComplete='new-password,current-password' required/>
                    {this.state.temp === 1 ?
                        <div style={this.state.password === '' ? {display: 'none'} : {display: 'block'}}
                             onClick={this.changeType}>{this.state.type === 1 ? '显示' : '隐藏'}</div> : ''}
                </label>
                <div onClick={() => {
                    this.props.login(this.state.userName, this.state.password);
                    Cookies.set('u_id', this.state.userName)
                }}
                     className='login-button'>{this.state.temp === 1 ? '登录' : '注册'}
                </div>
            </div>
        </div>;
        return (
            <div className='login-signUp'>
                {login}
                <div className='switchLogin'>
                    {this.state.temp === 1 ? '还没有账号？' : '已经有账号了!'}
                    <span onClick={this.changeTemp}>{this.state.temp === 1 ? '注册' : '登录'}</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        data: state.loginReducer,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: (userId, password) => {
            dispatch(login(userId, password))
        },
        signUp: (userId, password) => {
            dispatch(signUp(userId, password))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));