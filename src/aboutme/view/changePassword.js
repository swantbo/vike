import React, {Component} from "react";
import {withRouter, Link} from "react-router-dom";
import {connect} from 'react-redux';
import config from "../../config";
import './changePassword.css';
import Cookies from "js-cookie";
import {changePassword} from "../Actions";

class ChangePassword extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            0: '',
            1: '',
            2: '',
            status: false,
            list: [0, 1, 2],
            tip: '',
            butAction: false
        };
        this.onChangePass = this.onChangePass.bind(this);
        this.historyBack = this.historyBack.bind(this);
        this.onSub = this.onSub.bind(this);
        this.clearPass = this.clearPass.bind(this);
        this.actionClick = this.actionClick.bind(this);

    }

    onChangePass(v, id) {
        let that = this;
        this.setState({[id]: v.target.value.replace(/[^\w_]/g, '', '')}, function () {
            that.actionClick();
            that.setState({tip:''})
        })
    }

    actionClick() {
        if (this.state['0'].length > 0 && this.state['1'].length === this.state['2'].length && this.state['1'].length >= 8) {
            this.setState({butAction: true})
        }else {
            this.setState({butAction:false})
        }
    }

    clearPass() {
        this.setState({0: ''});
        this.setState({1: ''});
        this.setState({2: ''});
        this.setState({status: false});
        this.setState({tip: ''});
        this.setState({butAction: false});
    }

    historyBack() {
        window.history.back();
        this.clearPass();
    }

    onSub() {
        if (this.state['1'] !== this.state['2']) {
            this.setState({tip: '两次输入的密码不一样！'});
        } else {
            this.props.changePassword(Cookies.get('u_id'), this.state['0'], this.state['2'])
        }
    }
    render() {
        let that =this;
        let action = {
            background: '#9f9f9f',
        };
        let noAction = {
            background: '#1ea1ff',
        };
        let status = this.props.changePasswordStatus.status;
        if (status===200){
            setTimeout(function () {
                Cookies.remove('u_id');
                that.props.history.push('/login')
            },500)
        }
        return (
            <div style={{marginTop: '20vw'}} className='changePassword'>
                {this.state.list.map((i) => {
                    return <div className='changePassword-input'><input
                        className='password-text'
                        placeholder={i === 0 ? '原密码' : i === 1 ? '新密码' : '再输入一次'}
                        onPaste={(e) => e.preventDefault()}
                        onCopy={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        onChange={(e) => this.onChangePass(e, i)}
                        type={'password'}
                        style={i===0?{}:this.state.tip.length>0?{background:'#ff1400'}:{}}
                        maxLength={16}
                        value={this.state[i]}/>
                        <span
                            className='tips'>{i === 0 ? '' : this.state[i].length === 0 ? '仅支持英文字母a~Z、_、0~9' : this.state[i].length < 8 ? '密码最少8位' : this.state.tip.length>0?this.state.tip:''}</span>
                    </div>
                })}
                <div className='changePassword-but'>
                    <span className='changePassword-but-close' onClick={this.historyBack}>取消</span>
                    <span
                        style={!this.state.butAction ? action : noAction}
                        className='changePassword-but-sub' onClick={this.state.butAction ? this.onSub : ''}>确认修改</span>
                </div>
                {status===0?'':<div className='changePassword-float'>
                    {status===1?'数据修改中……':status===200?'修改成功！准备跳转！':status===202?'原密码错误!':'服务器错误'}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        changePasswordStatus: state.aboutMeReducer.changePasswordStatus
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (userId, oldPassword, newPassword) => {
            dispatch(changePassword(userId, oldPassword, newPassword))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword))