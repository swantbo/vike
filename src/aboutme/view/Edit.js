import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    changeFloatInterFaceShow
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
            // isGesture: false,
            // width: 300,
            // x1: 0,
            // y1: 0,
            // x2: 0,
            // y2: 0,
            // nowX1: 0,
            // nowY1: 0,
            // nowX2: 0,
            // nowY2: 0,
            // startDis: 0,
            // nowDis: 0,
            // scale: 1,
            // Dis: 0
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
    sub(){
       this.props.updateUserInfo(this.state.userId, this.state.userName, this.state.email, this.state.Introduction, this.state.gender, this.state.isRecommend, this.state.website)

    }
    // onTouchStart(e) {
    //     if (e.touches.length >= 2) {
    //         this.setState({isGesture: true});
    //         this.setState({x1: e.touches[0].pageX});
    //         this.setState({y1: e.touches[0].pageY});
    //         this.setState({x2: e.touches[1].pageX});
    //         this.setState({y2: e.touches[1].pageY});
    //     }
    // }
    //
    // onTouchMove(e) {
    //     if (this.state.isGesture && e.touches.length >= 2) {
    //         let a = this.state;
    //         this.setState({nowX1: e.touches[0].pageX});
    //         this.setState({nowY1: e.touches[0].pageY});
    //         this.setState({nowX2: e.touches[1].pageX});
    //         this.setState({nowY2: e.touches[1].pageY});
    //         this.setState({startDis: Math.sqrt((a.x2 - a.x1) * (a.x2 - a.x1), (a.y2 - a.y1) * (a.y2 - a.y1))});
    //         this.setState({nowDis: Math.sqrt((a.nowX2 - a.nowX1) * (a.nowX2 - a.nowX1), (a.nowY2 - a.nowY1) * (a.nowY2 - a.nowY1))});
    //         // this.setState({Dis:((this.state.nowDis-this.state.startDis)<=0?0:(this.state.nowDis-this.state.startDis))});
    //         this.setState({scale: a.nowDis / a.startDis});
    //     }
    // }
    //
    // onTouchEnd(e) {
    //     if (this.state.isGesture) {
    //         if (e.touches.length < 2) {
    //             let width = this.state.width;
    //             this.setState({isGesture: false});
    //             this.setState({width: width * this.state.scale})
    //         }
    //     }
    // }

    // componentDidMount() {
    //     let width = this.state.width;
    //     this.setState({width: width * this.state.scale})
    // }

    render() {
        let that = this;
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
                <div className='changeAvatar'>
                    <div className='avatarBox'>
                        <img src={`${config.url}image/${that.state.avatar}`} alt='avatar'/>
                    </div>
                    <div className='avatarChangeButton'>
                        <p>{that.state.userId}</p>
                        {/*<Link to='/changeAvatar'>更换头像</Link>*/}
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
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));
