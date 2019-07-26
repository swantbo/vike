import React, {Component} from 'react';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {Link, withRouter, Route} from "react-router-dom";
import fetch from 'cross-fetch';
import md5 from 'md5';
import config from '../../config.js';
import {login, signUp} from "../Actions";
import './login.css';

class Login extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            temp: 1,
            type: 1,
            openButton: -1,
            userName: '',
            password: '',
            passwordTwo: '',
            messageText: '',
        };
        this.changeType = this.changeType.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePasswordTwo = this.changePasswordTwo.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeTemp = this.changeTemp.bind(this);
        this.clickLogin = this.clickLogin.bind(this);
        this.testPassword = this.testPassword.bind(this);
    }

    changeType() {
        this.setState({type: this.state.type * -1})
    }

    changeName(e) {
        this.setState({userName: e.replace(/\s+/g, "")});
        if (e.replace(/\s+/g, "") === '') {
            this.setState({openButton: -1})
        }
    }

    changePassword(e) {
        this.setState({password: e.replace(/\s+/g, "")});
        if (e.replace(/\s+/g, "") === '') {
            this.setState({openButton: -1})
        } else if (e.replace(/\s+/g, "") !== '' && this.state.temp === 1) {
            this.setState({openButton: 1})
        }
    }

    changePasswordTwo(e) {
        this.setState({passwordTwo: e.replace(/\s+/g, "")});
        this.testPassword(e)
    }

    testPassword(e) {
        if (this.state.password !== e.replace(/\s+/g, "")) {
            this.setState({messageText: '密码不相同'});
            this.setState({openButton: -1})
        } else if (this.state.password === e.replace(/\s+/g, "")) {
            this.setState({messageText: ''});
            this.setState({openButton: 1})
        }
    }

    changeTemp() {
        this.setState({temp: this.state.temp * -1})
    }

    clickLogin() {
        this.setState({userName: ''});
        this.setState({password: ''});
        this.setState({passwordTwo: ''});
        this.setState({openButton: -1})
    }

    render() {
        if (Cookies.get('u_id')!==undefined){
            window.location.pathname='/';
        }
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
                    <input onChange={(e) => {
                        this.changePasswordTwo(e.target.value)
                    }} value={this.state.passwordTwo}
                           type={this.state.type === 1 ? 'password' : 'text'}
                           autoComplete='new-password,current-password' required/>
                    {this.state.temp === 1 ?
                        <div style={this.state.password === '' ? {display: 'none'} : {display: 'block'}}
                             onClick={this.changeType}>{this.state.type === 1 ? '显示' : '隐藏'}</div> : ''}
                </label>
                <button onClick={() => {
                    if (this.state.openButton === 1 && this.state.temp === 1) {
                        this.props.login(this.state.userName, this.state.password);
                        //测试cookie在项目中的应用
                        // Cookies.set('u_id', this.state.userName);
                        //后端完善后会删除
                        this.clickLogin();
                    } else if (this.state.openButton === 1 && this.state.temp === -1) {
                        this.props.signUp(this.state.userName, this.state.passwordTwo);
                        this.clickLogin();
                    }
                }}
                        className={this.state.openButton === 1 ? 'login-button' : 'login-button-close'}>{this.state.temp === 1 ? '登录' : '注册'}
                </button>
            </div>
            <span className='login-point'>{this.state.messageText===''?this.props.data.message:this.state.messageText}</span>
        </div>;
        return (
            <div className='login-signUp'>
                {login}
                <div className='switchLogin'>
                    {this.state.temp === 1 ? '还没有账号？' : '已经有账号了!'}
                    <span onClick={() => {
                        this.changeTemp();
                        this.clickLogin()
                    }}>{this.state.temp === 1 ? '注册' : '登录'}</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
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