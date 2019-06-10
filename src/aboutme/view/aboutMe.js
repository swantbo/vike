import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    changeEmail,
    changeGender,
    changeIntroduction,
    changeIsActive,
    changeIsPrivate,
    changeIsRecommend,
    changeUserId,
    changeUserName,
    changeWebsite,
    requestTest
} from "../Actions";
import {Link, withRouter} from "react-router-dom";
import './aboutMe.css';

const categoryList = (num, text) => {
    return <div className='categoryList'>
        <p className='num'>{num}</p>
        <p>{text}</p>
    </div>
};
const listIcon = (className) => {
    return <span className={className + ' ' + 'listIcon'}>
        <span></span>
    </span>
};
const setList = (url,text)=>{
    return<li><Link to={`/${url}`}/>{text}<span></span></li>
};
class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: ['帖子', '粉丝', '正在关注'],
            icon: ['grid', 'detailed', 'Collection'],
            };
        this.onTest = this.onTest.bind(this);
    }
    onTest(name){
        requestTest(name);
        console.log('dd')
    }
    render() {
        const {avatar, userId, website, Introduction, userName, myPost, myFens, myFriends,option,setListUrl} = this.props;
        let webUrl = 'http://' + website;
        let categoryListArr = this.state.categoryName.map((item) => {
            return categoryList(item === '帖子' ? myPost.length : item === '粉丝' ? myFens.length : myFriends.length, item)
        });
        let listIconArr = this.state.icon.map((item) => {
            return listIcon(item)
        });
        let setPage = setListUrl.map((item)=>{
           return setList(item.url,item.text)
        });
        let aboutMe = option?<div className='aboutMe_box'>
            <div className='userInfo'>
                <div className='avatar' onClick={this.onTest('vike')}>
                    <img src={require('../../image/userAvatar/' + avatar)}/>
                </div>
                <div className='userId'>
                    <h2>{userId}jyR</h2>
                    <span></span>
                </div>
                <Link to='/edit'>
                    <div className='button'>
                        编辑主页
                    </div>
                </Link>
                <div className='introduction'>
                    <p className='username'>{userName}</p>
                    <p>{Introduction}</p>
                    <a target='_blank' href={webUrl}>{website}</a>
                </div>
            </div>
            <div className='userPostAndFriends'>
                {categoryListArr}
            </div>
            <div className='userPost'>
                <div className='userPost_List'>
                    {listIconArr}
                </div>
                <div></div>
            </div>
        </div>:<div className='setPage'>
            <div>账户</div>
            <ul>
                {setPage}
            </ul>
        </div>;
        return (
            aboutMe
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.aboutMeReducer.userName,
        userId: state.aboutMeReducer.userId,
        email: state.aboutMeReducer.email,
        avatar: state.aboutMeReducer.avatar,
        Introduction: state.aboutMeReducer.Introduction,
        website: state.aboutMeReducer.website,
        gender: state.aboutMeReducer.gender,
        addTime: state.aboutMeReducer.addTime,
        myPost: state.aboutMeReducer.myPost,
        myFens: state.aboutMeReducer.myFens,
        myFriends: state.aboutMeReducer.myFriends,
        isActive: state.aboutMeReducer.isActive,
        isRecommend: state.aboutMeReducer.isRecommend,
        isPrivate: state.aboutMeReducer.isPrivate,
        option:state.headerReducer.isShowOptions,
        setListUrl:state.aboutMeReducer.setListUrl
    }
};

export default withRouter(connect(mapStateToProps, {
    changeEmail,
    changeGender,
    changeIntroduction,
    changeIsActive,
    changeIsPrivate,
    changeIsRecommend,
    changeUserId,
    changeUserName,
    changeWebsite,
    requestTest
})(AboutMe));