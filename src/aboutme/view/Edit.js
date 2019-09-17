import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    changeFloatInterFaceShow,
    changeUpdateState
} from "../Actions";
import {Link, withRouter} from "react-router-dom";
import './Edit.css'
import config from '../../config.js';
import {updateUserInfo} from '../Actions.js';

class Edit extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            userName: this.props.userName,
            userId: this.props.userId,
            email: this.props.email,
            avatar: this.props.avatar,
            Introduction: this.props.Introduction,
            website: this.props.website,
            gender: this.props.gender,
            isRecommend: this.props.isRecommend,
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeIntroduction = this.onChangeIntroduction.bind(this);
        this.onChangeUserId = this.onChangeUserId.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeWebsite = this.onChangeWebsite.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeRecommend = this.onChangeRecommend.bind(this);
        this.sub = this.sub.bind(this);
    }

    onChangeUserName(e) {
        this.setState({userName: e.target.value})
    }

    onChangeUserId(e) {
        this.setState({userId: e.target.value})
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value})
    }

    onChangeIntroduction(e) {
        this.setState({Introduction: e.target.value})
    }

    onChangeWebsite(e) {
        this.setState({website: e.target.value})
    }

    onChangeGender(e) {
        this.setState({gender: e.target.value})
    }

    onChangeRecommend(e) {
        let temp = this.state.isRecommend;
        this.setState({isRecommend: !temp});
    }

    sub() {
        this.props.updateUserInfo(this.state.userId, this.state.userName, this.state.email, this.state.Introduction, this.state.gender, this.state.isRecommend, this.state.website)

    }

    render() {
        let that = this;
        if (this.props.updateState === 200) {
            setTimeout(function () {
                that.props.history.push('/aboutme');
                that.props.changeUpdateState()
            }, 500)
        }
        let {changeFloatInterFaceShow} = this.props;
        const EditBox = (text, variable, action, className) => {
            return <div className={'editBox' + " " + className}>
                <span>{text}</span>
                <textarea type='text' onChange={action} value={variable}/>
            </div>
        };
        let data = [{text: '姓名', data: that.state.userName, event: that.onChangeUserName},
            // {text: '账号', data: that.state.userId, event: that.onChangeUserId},
            {text: '网站', data: that.state.website, event: that.onChangeWebsite},
            {text: '个人简介', data: that.state.Introduction, event: that.onChangeIntroduction},
            {text: '邮箱', data: that.state.email, event: that.onChangeEmail}];

        let editBoxList = data.map((item) => {
            let className = " ";
            if (item.text === '个人简介') className = 'Introduction';
            return EditBox(item.text, item.data, item.event, className)
        });
        const genderList = (item, gender) => {
            return gender === item ?
                <option value={item} selected='selected'>{item === 1 ? '男' : item === 2 ? '女' : '不指定'}</option> :
                <option value={item}>{item === 1 ? '男' : item === 2 ? '女' : '不指定'}</option>
        };
        let genderArr = [1, 2, 3].map((item) => {
            return genderList(item, that.state.gender)
        });
        return (
            <div className='edit'>
                <div style={this.props.updateState === 200 ? {display: 'block'} : {display: 'none'}}
                     className='floatEdit'>
                    {this.props.updateState === 200 ? '修改成功准备跳转' : '发生未知错误'}
                </div>
                <div className='changeAvatar'>
                    <div className='avatarBox'>
                        <img src={`${config.url}image/${that.state.avatar}`} alt='avatar'/>
                    </div>
                    <div className='avatarChangeButton'>
                        <p>{that.state.userId}</p>
                        <div onClick={changeFloatInterFaceShow}>更换头像</div>
                    </div>
                </div>
                {editBoxList}
                <div className='gender'>
                    <div>性别</div>
                    <select onChange={this.onChangeGender}>
                        {genderArr}
                    </select>
                </div>
                <div className="Recommend">
                    <div className='title'>账户推荐</div>
                    <div className='exp'>
                        <input onChange={this.onChangeRecommend} checked={this.state.isRecommend ? true : false}
                               type='checkbox'/>
                        <div>在推荐可能关注的类似账户中加入你的账户。</div>
                    </div>
                </div>
                <div className='sub'>
                    <div
                        onClick={this.sub}>提交
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        updateState: state.aboutMeReducer.updateState,
        userName: state.aboutMeReducer.loginUserInfo.userName,
        userId: state.aboutMeReducer.loginUserInfo.userId,
        email: state.aboutMeReducer.loginUserInfo.email,
        avatar: state.aboutMeReducer.loginUserInfo.avatar,
        Introduction: state.aboutMeReducer.loginUserInfo.Introduction,
        website: state.aboutMeReducer.loginUserInfo.website,
        gender: state.aboutMeReducer.loginUserInfo.gender,
        isRecommend: state.aboutMeReducer.loginUserInfo.isRecommend,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateUserInfo: (userId, userName, email, introduction, gender, recommend, website) => {
            dispatch(updateUserInfo(userId, userName, email, introduction, gender, recommend, website))
        },
        changeFloatInterFaceShow: () => {
            dispatch(changeFloatInterFaceShow())
        },
        changeUpdateState:()=>{
            dispatch(changeUpdateState())
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));
