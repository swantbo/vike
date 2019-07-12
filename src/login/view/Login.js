import React, {Component} from 'react';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {Link, withRouter, Route} from "react-router-dom";
import fetch from 'cross-fetch';
import {md5} from 'md5';
import config from '../../config.js';
import './login.css';

class Login extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            type: 1,
            name: '',
            password: '',
            message:''
        };
        this.changeType = this.changeType.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeName = this.changeName.bind(this);
        this.login = this.login.bind(this);

    }

    changeType() {
        this.setState({type: this.state.type * -1})
    }

    changeName(e) {
        this.setState({name: e})
    }

    changePassword(e) {
        this.setState({password: e})
    }

    login(name,password) {
        fetch(`${config.url}login`, {
            method: 'POST',
            body: JSON.stringify({userId:name,password:md5(password)}),
        }).then(res=>res.json()).then(json=>this.setState({message:json.message})).catch(error=>console.log(error))
    }

    render() {
        return (
            <div className='login'>
                <div className='login-logo'>
                    <img src={require('../../image/vike@0,1x.png')}/>
                </div>
                <div className='login-input'>
                    <label className='input-name'>
                        <span>账号或邮箱</span>
                        <input onChange={(e) => this.changeName(e.target.value)} value={this.state.name} type='text'
                               size='16'/>
                    </label>
                    <label className='input-password'>
                        <span>密码</span>
                        <input onChange={(e) => this.changePassword(e.target.value)} value={this.state.password}
                               type={this.state.type === 1 ? 'password' : 'text'}
                               autoComplete='new-password,current-password' required/>
                        <div style={this.state.password === '' ? {display: 'none'} : {display: 'block'}}
                             onClick={this.changeType}>{this.state.type === 1 ? '显示' : '隐藏'}</div>
                    </label>
                    <div onClick={()=>this.login(this.state.name,this.state.password)} className='login-button'>登录</div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(Login));